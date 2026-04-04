const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = "C:\\Users\\SJLEE\\Downloads\\GPT";
const VERIFIED_DIR = path.join(ROOT_DIR, "검증통과_사용자확인완료");
const CANDIDATE_DIR = path.join(ROOT_DIR, "후보수집");
const LOG_DIR = path.join(ROOT_DIR, "작업로그");
const TARGETS_PATH = path.join(LOG_DIR, "주요업무계획_대상목록.json");
let currentSummaryPath = path.join(LOG_DIR, "주요업무계획_수집결과.txt");

const DEFAULT_TARGETS = [
  { name: "강원특별자치도 강릉시", url: "https://www.gangneung.go.kr" },
  { name: "강원특별자치도 홍천군", url: "https://www.hongcheon.go.kr" },
  { name: "강원특별자치도 횡성군", url: "https://www.hsg.go.kr" },
  { name: "경기도 시흥시", url: "https://www.siheung.go.kr" },
  { name: "경기도 하남시", url: "https://www.hanam.go.kr" },
  { name: "경기도 안성시", url: "https://www.anseong.go.kr" },
];

const SEARCH_KEYWORDS = [
  "주요업무계획",
  "주요업무 추진계획",
  "주요업무추진계획",
  "시정 주요업무계획",
  "군정 주요업무계획",
  "도정 주요업무계획",
];

const EXCLUDE_KEYWORDS = [
  "보도자료",
  "사진",
  "회의록",
  "인증서",
  "재정공시",
  "의회",
  "공고",
  "알림",
  "행사",
  "홍보",
  "계약",
  "예산서",
  "공문",
];

const FILE_EXTENSIONS = [".pdf", ".hwp", ".hwpx", ".zip"];
const FAST_CANDIDATE_MODE = process.argv.includes("--빠른후보");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

function sanitizeFileName(name) {
  return name.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").replace(/\s+/g, " ").trim();
}

function normalizeText(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

function resolveUrl(baseUrl, href) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}

function hasExcludeKeyword(text = "") {
  return EXCLUDE_KEYWORDS.some((keyword) => text.includes(keyword));
}

function scoreText(text = "", href = "") {
  let score = 0;
  if (text.includes("2026")) score += 60;
  if (text.includes("주요업무")) score += 40;
  if (text.includes("업무계획")) score += 30;
  if (text.includes("추진계획")) score += 20;
  if (text.includes("시정") || text.includes("군정") || text.includes("도정")) score += 10;
  if (text.includes("e-book") || text.includes("ebook")) score += 25;
  if (href.toLowerCase().includes(".pdf")) score += 20;
  if (href.toLowerCase().includes("ebook")) score += 15;
  if (href.toLowerCase().includes("bbs")) score += 8;
  if (hasExcludeKeyword(text)) score -= 100;
  if (text.includes("보고회")) score -= 30;
  return score;
}

function isOfficialHost(homeUrl, candidateUrl) {
  try {
    const left = new URL(homeUrl).hostname.replace(/^www\./, "");
    const right = new URL(candidateUrl).hostname.replace(/^www\./, "");
    return right.endsWith(left) || left.endsWith(right);
  } catch {
    return false;
  }
}

function isDirectFileUrl(url = "") {
  const lower = url.toLowerCase();
  return (
    FILE_EXTENSIONS.some((ext) => lower.includes(ext)) ||
    lower.includes("downloadbbsfile.do") ||
    lower.includes("filedown.do") ||
    lower.includes("filedownload.do") ||
    lower.includes("download.do")
  );
}

function isExcludedUrl(url = "") {
  const lower = url.toLowerCase();
  return (
    lower.includes("ehojocntrctsttus") ||
    lower.includes("council") ||
    lower.includes("minutes") ||
    lower.includes("appendix.do") ||
    lower.includes("eminwon") ||
    lower.includes("/ofr/")
  );
}

function loadTargets() {
  if (fs.existsSync(TARGETS_PATH)) {
    const content = fs.readFileSync(TARGETS_PATH, "utf8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }
  return DEFAULT_TARGETS;
}

function loadVerifiedNames() {
  if (!fs.existsSync(VERIFIED_DIR)) {
    return [];
  }

  return fs
    .readdirSync(VERIFIED_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
}

function isAlreadyVerified(target, verifiedNames) {
  return verifiedNames.some((name) => name.includes(target.name) && name.includes("2026"));
}

function loadCompletedTargetNamesFromLogs() {
  if (!fs.existsSync(LOG_DIR)) {
    return new Set();
  }

  const completed = new Set();
  const files = fs
    .readdirSync(LOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".txt"))
    .map((entry) => path.join(LOG_DIR, entry.name));

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
    const lines = content.split(/\r?\n/);
    let currentTarget = "";
    let currentHasSavedPath = false;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      const headerMatch = line.match(/^\[.*\]\s+(.+)$/);
      if (headerMatch) {
        if (currentTarget && currentHasSavedPath) {
          completed.add(currentTarget);
        }
        currentTarget = headerMatch[1].trim();
        currentHasSavedPath = false;
        continue;
      }

      if (currentTarget && line.startsWith("- ")) {
        currentHasSavedPath = true;
      }
    }

    if (currentTarget && currentHasSavedPath) {
      completed.add(currentTarget);
    }
  }

  return completed;
}

async function collectAnchors(page) {
  return page.locator("a").evaluateAll((nodes) =>
    nodes.map((node) => ({
      text: (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim(),
      href: node.href || node.getAttribute("href") || "",
      onclick: node.getAttribute("onclick") || "",
    }))
  );
}

async function openSearchUiIfNeeded(page) {
  const selectors = [
    'button[title*="검색"]',
    'a[title*="검색"]',
    'button[aria-label*="검색"]',
    'a[aria-label*="검색"]',
    ".search_open",
    ".btn_search",
    ".search-btn",
    ".searchBtn",
  ];

  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    try {
      if (await locator.isVisible({ timeout: 800 })) {
        await locator.click({ timeout: 2000 }).catch(() => {});
        await sleep(500);
      }
    } catch {}
  }
}

async function findSearchInput(page) {
  await openSearchUiIfNeeded(page);

  const selectors = [
    "#search_query",
    'input[type="search"]',
    'input[name*="search"]',
    'input[id*="search"]',
    'input[placeholder*="검색"]',
    'input[title*="검색"]',
  ];

  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    try {
      if (await locator.isVisible({ timeout: 1000 })) {
        return locator;
      }
    } catch {}
  }
  return null;
}

async function submitSearch(page, context, keyword) {
  const input = await findSearchInput(page);
  if (!input) {
    throw new Error("검색창을 찾지 못했습니다.");
  }

  await input.fill("");
  await input.fill(keyword);
  await sleep(200);

  const popupPromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null);
  const submit = page.locator('button[type="submit"], input[type="submit"], button:has-text("검색"), a:has-text("검색")').first();

  if (await submit.count()) {
    await submit.click({ timeout: 5000 }).catch(async () => {
      await input.press("Enter");
    });
  } else {
    await input.press("Enter");
  }

  const popup = await popupPromise;
  if (popup) {
    await popup.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});
    await sleep(1000);
    return popup;
  }

  await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});
  await sleep(1200);
  return page;
}

async function pickBestResult(page, target) {
  const anchors = await collectAnchors(page);
  const candidates = anchors
    .map((anchor) => {
      const text = normalizeText(anchor.text);
      const href = resolveUrl(target.url, anchor.href);
      return { text, href, score: scoreText(text, href) };
    })
    .filter((item) => item.text && item.href)
    .filter((item) => isOfficialHost(target.url, item.href))
    .filter((item) => FAST_CANDIDATE_MODE || !isExcludedUrl(item.href))
    .filter((item) => item.score >= (FAST_CANDIDATE_MODE ? 30 : 50))
    .sort((a, b) => b.score - a.score);

  return candidates[0] || null;
}

async function searchViaNaver(browser, target) {
  const host = new URL(target.url).hostname.replace(/^www\./, "");
  const queries = [
    `site:${host} 2026 주요업무계획`,
    `site:${host} 2026 주요업무 추진계획`,
    `${target.name} 2026 주요업무계획`,
  ];

  for (const query of queries) {
    const context = await browser.newContext({ ignoreHTTPSErrors: true, locale: "ko-KR" });
    const page = await context.newPage();
    try {
      await page.goto(`https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await sleep(1200);
      const result = await pickBestResult(page, target);
      if (result) return result;
    } finally {
      await context.close().catch(() => {});
    }
  }

  return null;
}

async function findNestedDetailLink(page, target) {
  const currentUrl = page.url();
  const anchors = await collectAnchors(page);
  const candidates = anchors
    .map((anchor) => {
      const text = normalizeText(anchor.text);
      const href = resolveUrl(currentUrl, anchor.href);
      return { text, href, score: scoreText(text, href) };
    })
    .filter((item) => item.text && item.href && item.href !== currentUrl)
    .filter((item) => isOfficialHost(target.url, item.href))
    .filter((item) => FAST_CANDIDATE_MODE || !isExcludedUrl(item.href))
    .filter((item) => !isDirectFileUrl(item.href))
    .filter((item) => item.score >= (FAST_CANDIDATE_MODE ? 35 : 55))
    .sort((a, b) => b.score - a.score);

  return candidates[0] || null;
}

function parseEgovOnclick(onclick, currentUrl) {
  const match = onclick.match(/fn_egov_downFile\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/i);
  if (!match) {
    return null;
  }
  return new URL(
    `/cmm/fms/FileDown.do?atchFileId=${encodeURIComponent(match[1])}&fileSn=${encodeURIComponent(match[2])}`,
    currentUrl
  ).toString();
}

async function extractAttachmentCandidates(page) {
  const currentUrl = page.url();
  const anchors = await collectAnchors(page);
  const candidates = [];

  for (const anchor of anchors) {
    const text = normalizeText(anchor.text);
    const href = resolveUrl(currentUrl, anchor.href);
    const lowerHref = href.toLowerCase();

    if (hasExcludeKeyword(text)) {
      continue;
    }

    if (!FAST_CANDIDATE_MODE && isExcludedUrl(href)) {
      continue;
    }

    if (FILE_EXTENSIONS.some((ext) => lowerHref.includes(ext)) || lowerHref.includes("downloadbbsfile.do") || lowerHref.includes("filedown.do")) {
      candidates.push({ href, label: text || path.basename(href) });
      continue;
    }

    const egovUrl = parseEgovOnclick(anchor.onclick || "", currentUrl);
    if (egovUrl) {
      candidates.push({ href: egovUrl, label: text || "첨부파일" });
    }
  }

  return candidates;
}

async function detectEbookUrl(page) {
  const currentUrl = page.url();
  const html = await page.content();
  const bodyText = await page.locator("body").innerText().catch(() => "");

  const regexes = [
    /https?:\/\/[^\s"'<>]+ebook[^\s"'<>]+/i,
    /https?:\/\/[^\s"'<>]+viewer[^\s"'<>]+/i,
    /https?:\/\/[^\s"'<>]+\/DATA\/ebook[^\s"'<>]+index\.html/i,
  ];

  for (const regex of regexes) {
    const matchFromHtml = html.match(regex);
    if (matchFromHtml) return matchFromHtml[0].replace(/&amp;/g, "&");
    const matchFromText = bodyText.match(regex);
    if (matchFromText) return matchFromText[0].replace(/&amp;/g, "&");
  }

  const frame = page.locator("iframe").first();
  if (await frame.count()) {
    const src = await frame.getAttribute("src").catch(() => null);
    if (src && /ebook|viewer/i.test(src)) {
      return resolveUrl(currentUrl, src);
    }
  }

  if (/ebook|viewer/i.test(currentUrl)) {
    return currentUrl;
  }
  return null;
}

async function saveUrlToFile(url, outputPathBase) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`첨부 다운로드 실패: ${response.status}`);
  }

  const disposition = response.headers.get("content-disposition") || "";
  const contentType = response.headers.get("content-type") || "";
  let extension = "";

  for (const candidate of FILE_EXTENSIONS) {
    if (url.toLowerCase().includes(candidate)) {
      extension = candidate;
      break;
    }
    if (disposition.toLowerCase().includes(candidate)) {
      extension = candidate;
      break;
    }
  }

  if (!extension) {
    if (contentType.includes("pdf")) extension = ".pdf";
    else if (contentType.includes("hwpx")) extension = ".hwpx";
    else if (contentType.includes("hwp")) extension = ".hwp";
    else if (contentType.includes("zip")) extension = ".zip";
    else extension = ".bin";
  }

  const finalPath = `${outputPathBase}${extension}`;
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(finalPath, buffer);
  return finalPath;
}

async function buildEbookPdf(ebookUrl, outputPath, context) {
  const dataUrl = new URL("./assets/data.js", ebookUrl).toString();
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`전자책 data.js 요청 실패: ${response.status}`);
  }

  const jsText = await response.text();
  const totalMatch = jsText.match(/totalPageNum\s*:\s*(\d+)/);
  const extMatch = jsText.match(/pageExt\s*:\s*["']([^"']+)["']/);
  if (!totalMatch || !extMatch) {
    throw new Error("전자책 페이지 정보를 읽지 못했습니다.");
  }

  const totalPageNum = Number(totalMatch[1]);
  const pageExt = extMatch[1];
  const pageUrls = Array.from({ length: totalPageNum }, (_, index) => {
    const pageNo = index + 1;
    return new URL(`./assets/pages/${pageNo}.${pageExt}`, ebookUrl).toString();
  });

  const printPage = await context.newPage();
  const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>주요업무계획 전자책</title>
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
    img { width: 210mm; height: 297mm; object-fit: contain; display: block; }
  </style>
</head>
<body>
  ${pageUrls.map((url, index) => `<div class="sheet"><img src="${url}" alt="page-${index + 1}"></div>`).join("\n")}
</body>
</html>`;

  await printPage.setContent(html, { waitUntil: "domcontentloaded" });
  await printPage.waitForLoadState("networkidle").catch(() => {});
  await printPage.waitForFunction(
    () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
    null,
    { timeout: 180000 }
  );

  await printPage.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await printPage.close();
  return totalPageNum;
}

function buildOutputStem(target, suffix = "") {
  const base = sanitizeFileName(`${target.name}_2026_주요업무계획${suffix}`);
  return path.join(CANDIDATE_DIR, base);
}

async function extractAssets(detailPage, target, context) {
  const ebookUrl = await detectEbookUrl(detailPage);
  if (ebookUrl) {
    const pdfPath = `${buildOutputStem(target)}.pdf`;
    const totalPages = await buildEbookPdf(ebookUrl, pdfPath, context);
    return { outputPaths: [pdfPath], note: `전자책 ${totalPages}페이지` };
  }

  const attachments = await extractAttachmentCandidates(detailPage);
  if (!attachments.length) {
    const nested = await findNestedDetailLink(detailPage, target);
    if (nested) {
      const nestedPage = await context.newPage();
      try {
        await nestedPage.goto(nested.href, { waitUntil: "domcontentloaded", timeout: 60000 });
        await sleep(1000);
        return await extractAssets(nestedPage, target, context);
      } finally {
        await nestedPage.close().catch(() => {});
      }
    }
    throw new Error("원문 첨부를 찾지 못했습니다.");
  }

  const savedPaths = [];
  for (let index = 0; index < attachments.length; index += 1) {
    const attachment = attachments[index];
    const safeLabel = sanitizeFileName(attachment.label || `첨부${index + 1}`);
    const outputBase = buildOutputStem(target, `_${safeLabel}`);
    try {
      savedPaths.push(await saveUrlToFile(attachment.href, outputBase));
    } catch {}
  }

  if (!savedPaths.length) {
    throw new Error("첨부 다운로드에 실패했습니다.");
  }

  return { outputPaths: savedPaths, note: `첨부 ${savedPaths.length}건` };
}

async function processTarget(browser, target) {
  const context = await browser.newContext({
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
  });
  const page = await context.newPage();

  try {
    let picked = null;
    let firstError = null;

    try {
      await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await sleep(1200);

      for (const keyword of SEARCH_KEYWORDS) {
        try {
          const resultPage = await submitSearch(page, context, keyword);
          picked = await pickBestResult(resultPage, target);
          if (picked) break;
        } catch {}
      }
    } catch (error) {
      firstError = error;
    }

    if (!picked) {
      picked = await searchViaNaver(browser, target);
    }

    if (!picked) {
      throw firstError || new Error("2026 주요업무계획 검색 결과를 찾지 못했습니다.");
    }

    const detailPage = await context.newPage();
    try {
      if (isDirectFileUrl(picked.href)) {
        const directPath = await saveUrlToFile(picked.href, buildOutputStem(target, "_직접첨부"));
        return {
          status: "성공",
          name: target.name,
          homeUrl: target.url,
          resultUrl: picked.href,
          savedPaths: [directPath],
          note: "직접 파일 링크 1건",
        };
      }

      await detailPage.goto(picked.href, { waitUntil: "domcontentloaded", timeout: 60000 });
      await sleep(1000);
      const asset = await extractAssets(detailPage, target, context);
      return {
        status: "성공",
        name: target.name,
        homeUrl: target.url,
        resultUrl: picked.href,
        savedPaths: asset.outputPaths,
        note: asset.note,
      };
    } finally {
      await detailPage.close().catch(() => {});
    }
  } finally {
    await context.close().catch(() => {});
  }
}

async function runPool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runner() {
    while (cursor < items.length) {
      const current = cursor;
      cursor += 1;
      try {
        results[current] = await worker(items[current]);
      } catch (error) {
        results[current] = {
          status: "실패",
          name: items[current].name,
          homeUrl: items[current].url,
          resultUrl: "",
          savedPaths: [],
          note: error.message || String(error),
        };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runner()));
  return results;
}

async function writeSummary(results) {
  await ensureDir(LOG_DIR);
  const lines = [];
  lines.push("주요업무계획 수집 결과");
  lines.push(`실행 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);
  lines.push(`검증통과 폴더: ${VERIFIED_DIR}`);
  lines.push(`후보수집 폴더: ${CANDIDATE_DIR}`);
  lines.push("");

  for (const item of results) {
    lines.push(`[${item.status}] ${item.name}`);
    lines.push(`홈페이지: ${item.homeUrl}`);
    if (item.resultUrl) lines.push(`선택된 페이지: ${item.resultUrl}`);
    if (item.savedPaths.length) {
      lines.push("저장 경로:");
      for (const savedPath of item.savedPaths) {
        lines.push(`- ${savedPath}`);
      }
    }
    lines.push(`비고: ${item.note}`);
    lines.push("");
  }

  await fs.promises.writeFile(currentSummaryPath, lines.join("\r\n"), "utf8");
}

async function main() {
  await ensureDir(VERIFIED_DIR);
  await ensureDir(CANDIDATE_DIR);
  await ensureDir(LOG_DIR);

  const allTargets = loadTargets();
  const verifiedNames = loadVerifiedNames();
  const completedTargets = loadCompletedTargetNamesFromLogs();
  const filters = process.argv
    .slice(2)
    .map((arg) => arg.trim())
    .filter((arg) => arg && !arg.startsWith("--"));
  const candidateTargets = filters.length
    ? allTargets.filter((target) => filters.some((filter) => target.name.includes(filter)))
    : allTargets;
  const targets = candidateTargets.filter(
    (target) => !isAlreadyVerified(target, verifiedNames) && !completedTargets.has(target.name)
  );

  const summarySuffix = filters.length
    ? sanitizeFileName(`${filters[0]}${filters.length > 1 ? `_외${filters.length - 1}` : ""}`)
    : "전체";
  currentSummaryPath = path.join(LOG_DIR, `주요업무계획_수집결과_${summarySuffix}.txt`);

  if (!targets.length) {
    throw new Error("실행할 대상이 없습니다.");
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const results = await runPool(targets, FAST_CANDIDATE_MODE ? 6 : 4, async (target) => processTarget(browser, target));
    await writeSummary(results);
    console.log(
      JSON.stringify(
        {
          ok: true,
          summaryPath: currentSummaryPath,
          candidateDir: CANDIDATE_DIR,
          verifiedDir: VERIFIED_DIR,
          successCount: results.filter((item) => item.status === "성공").length,
          failureCount: results.filter((item) => item.status === "실패").length,
        },
        null,
        2
      )
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
