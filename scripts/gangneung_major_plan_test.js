const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function waitForVisible(locator, timeout = 15000) {
  await locator.first().waitFor({ state: "visible", timeout });
  return locator.first();
}

async function buildEbookPdf(ebookUrl, outputPath, context) {
  const baseUrl = new URL(ebookUrl);
  const dataUrl = new URL("./assets/data.js", ebookUrl).toString();
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`data.js 요청 실패: ${response.status}`);
  }

  const jsText = await response.text();
  const matchTotal = jsText.match(/totalPageNum\s*:\s*(\d+)/);
  const matchExt = jsText.match(/pageExt\s*:\s*"([^"]+)"/);
  if (!matchTotal || !matchExt) {
    throw new Error("e-book 페이지 정보를 읽지 못했습니다.");
  }

  const totalPageNum = Number(matchTotal[1]);
  const pageExt = matchExt[1];
  const pageUrls = Array.from({ length: totalPageNum }, (_, index) => {
    const pageNo = index + 1;
    return new URL(`./assets/pages/${pageNo}.${pageExt}`, baseUrl).toString();
  });

  const printPage = await context.newPage();
  const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>강릉시 2026 주요업무계획</title>
  <style>
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: white; }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      page-break-after: always;
      break-after: page;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sheet:last-child { page-break-after: auto; break-after: auto; }
    img {
      width: 210mm;
      height: 297mm;
      object-fit: contain;
      display: block;
    }
  </style>
</head>
<body>
  ${pageUrls.map((url, index) => `<div class="sheet"><img src="${url}" alt="page-${index + 1}"></div>`).join("\n")}
</body>
</html>`;

  await printPage.setContent(html, { waitUntil: "domcontentloaded" });
  await printPage.waitForLoadState("networkidle").catch(() => {});
  await printPage.waitForFunction(() => {
    const imgs = Array.from(document.images);
    return imgs.length > 0 && imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, null, { timeout: 120000 });

  await printPage.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
  });

  await printPage.close();

  return {
    totalPageNum,
    pageExt,
  };
}

async function run() {
  const downloadDir = "C:\\Users\\SJLEE\\Downloads";
  await ensureDir(downloadDir);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
  });

  const page = await context.newPage();

  try {
    await page.goto("https://www.gangneung.go.kr", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const searchInput = page.locator("#search_query");
    await waitForVisible(searchInput);
    await searchInput.fill("주요업무계획");

    const popupPromise = context.waitForEvent("page").catch(() => null);
    await Promise.all([
      page.locator("button.search_submit").click(),
      page.waitForLoadState("networkidle").catch(() => {}),
    ]);

    let resultPage = await popupPromise;
    if (!resultPage) {
      resultPage = page;
    } else {
      await resultPage.waitForLoadState("domcontentloaded");
    }

    const targetResult = resultPage
      .locator("a.result_anchor")
      .filter({ hasText: "2026년 주요업무계획(e-book)" });
    await waitForVisible(targetResult, 20000);

    const detailPromise = context.waitForEvent("page").catch(() => null);
    await Promise.all([
      targetResult.click(),
      resultPage.waitForLoadState("networkidle").catch(() => {}),
    ]);

    let detailPage = await detailPromise;
    if (!detailPage) {
      detailPage = resultPage;
    } else {
      await detailPage.waitForLoadState("domcontentloaded");
    }

    const bodyText = await detailPage.locator("body").innerText();
    if (!bodyText.includes("2026년 주요업무계획(e-book)")) {
      throw new Error("상세 페이지 진입 확인 실패");
    }

    const ebookUrlCell = detailPage.locator("th", { hasText: "URL" }).locator("xpath=following-sibling::td[1]");
    await waitForVisible(ebookUrlCell, 10000);
    const ebookUrl = (await ebookUrlCell.textContent()).trim();
    if (!ebookUrl) {
      throw new Error("e-book URL을 찾지 못했습니다.");
    }

    const attachDownload = detailPage.locator("a.file_down").first();
    let savedAttachment = null;
    if (await attachDownload.count()) {
      const download = await Promise.race([
        detailPage.waitForEvent("download", { timeout: 10000 }).catch(() => null),
        (async () => {
          await attachDownload.click();
          return null;
        })(),
      ]);

      if (download) {
        const suggested = download.suggestedFilename();
        const ext = path.extname(suggested) || ".dat";
        const attachmentPath = path.join(downloadDir, `강릉시_2026_주요업무계획_첨부원본${ext}`);
        await download.saveAs(attachmentPath);
        savedAttachment = attachmentPath;
      }
    }

    const pdfPath = path.join(downloadDir, "강릉시_2026_주요업무계획.pdf");
    const ebookMeta = await buildEbookPdf(ebookUrl, pdfPath, context);

    console.log(JSON.stringify({
      ok: true,
      ebookUrl,
      pdfPath,
      savedAttachment,
      totalPageNum: ebookMeta.totalPageNum,
      pageExt: ebookMeta.pageExt,
    }, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
