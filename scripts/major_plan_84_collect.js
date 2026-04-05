const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = "C:\\Users\\SJLEE\\Downloads\\GPT";
const TEMP_DIR = path.join(ROOT_DIR, "_임시수집");
const REVIEW_DIR = path.join(ROOT_DIR, "검증필요");
const LOG_DIR = path.join(ROOT_DIR, "작업로그");
const DEFAULT_TARGETS_FILE = path.join(LOG_DIR, "2026_주요업무계획_84대상.tsv");

const SEARCH_KEYWORDS = [
  "2026 주요업무계획",
  "2026 주요업무 추진계획",
  "2026 주요업무추진계획",
  "2026 시정 주요업무계획",
  "2026 군정 주요업무계획",
  "2026 도정 주요업무계획",
];

const PRIMARY_TERMS = ["주요업무", "업무계획", "추진계획"];
const EXCLUDE_TERMS = [
  "보도자료",
  "사진",
  "회의록",
  "의회",
  "공고",
  "입찰",
  "계약",
  "민원",
  "인증서",
  "예산서",
  "공문",
  "홍보",
  "행사",
  "언론",
  "자살예방",
  "포스터",
  "공모",
  "채용",
  "생활임금",
  "인사위원회",
];

const DOWNLOAD_HINTS = [".pdf", ".hwp", ".hwpx", ".zip", "download", "filedown", "downloadbbsfile.do"];
const KNOWN_FILE_EXTENSIONS = [".pdf", ".hwp", ".hwpx", ".zip"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

function normalizeText(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

function sanitizeFileName(text = "") {
  const normalized = text.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").replace(/\s+/g, " ").trim();
  return normalized.length > 120 ? normalized.slice(0, 120).trim() : normalized;
}

function resolveUrl(baseUrl, href) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}

function loadTargets(targetsFile) {
  const content = fs.readFileSync(targetsFile, "utf8").replace(/^\uFEFF/, "");
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, url] = line.split("\t");
      return { name: name.trim(), url: url.trim() };
    });
}

function pickTargetsByGroup(targets, groupIndex, groupCount) {
  return targets.filter((_, index) => index % groupCount === groupIndex);
}

function looksLike2026(text = "", href = "") {
  const merged = `${text} ${href}`;
  return merged.includes("2026") || merged.includes("2026년도") || merged.includes("26년");
}

function hasExcludeTerm(text = "") {
  return EXCLUDE_TERMS.some((term) => text.includes(term));
}

function isDirectFileUrl(url = "") {
  const lower = url.toLowerCase();
  return DOWNLOAD_HINTS.some((hint) => lower.includes(hint));
}

function isOfficialHost(homeUrl, candidateUrl) {
  try {
    const homeHost = new URL(homeUrl).hostname.replace(/^www\./, "");
    const candidateHost = new URL(candidateUrl).hostname.replace(/^www\./, "");
    return candidateHost.endsWith(homeHost) || homeHost.endsWith(candidateHost);
  } catch {
    return false;
  }
}

function scoreCandidate(text = "", href = "") {
  let score = 0;
  if (looksLike2026(text, href)) score += 100;
  if (text.includes("주요업무")) score += 40;
  if (text.includes("업무계획")) score += 30;
  if (text.includes("추진계획")) score += 20;
  if (text.includes("시정") || text.includes("군정") || text.includes("도정")) score += 10;
  if (href.toLowerCase().includes("bbs")) score += 8;
  if (href.toLowerCase().includes(".pdf")) score += 20;
  if (href.toLowerCase().includes("ebook")) score += 8;
  if (hasExcludeTerm(text)) score -= 150;
  if (text.includes("2025")) score -= 120;
  return score;
}

function extractArgs() {
  let groupIndex = 0;
  let groupCount = 1;
  let targetsFile = DEFAULT_TARGETS_FILE;
  let poolSize = 4;
  const filters = [];

  for (let i = 2; i < process.argv.length; i += 1) {
    const arg = process.argv[i];
    if (arg === "--group-index") {
      groupIndex = Number(process.argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === "--group-count") {
      groupCount = Number(process.argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === "--targets-file") {
      targetsFile = process.argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--pool-size") {
      poolSize = Number(process.argv[i + 1]);
      i += 1;
      continue;
    }
    filters.push(arg);
  }

  return { groupIndex, groupCount, targetsFile, poolSize, filters };
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

async function findSearchInput(page) {
  const selectors = [
    "#search_query",
    'input[type="search"]',
    'input[name*="search"]',
    'input[id*="search"]',
    'input[placeholder*="검색"]',
    'input[title*="검색"]',
    'input[aria-label*="검색"]',
  ];

  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    try {
      if (await locator.isVisible({ timeout: 800 })) return locator;
    } catch {}
  }
  return null;
}

async function pickBestCandidateFromPage(page, target, baseUrl) {
  const anchors = await collectAnchors(page);
  const candidates = anchors
    .map((anchor) => {
      const text = normalizeText(anchor.text);
      const href = resolveUrl(baseUrl, anchor.href);
      return { text, href, score: scoreCandidate(text, href) };
    })
    .filter((item) => item.text && item.href)
    .filter((item) => isOfficialHost(target.url, item.href))
    .filter((item) => looksLike2026(item.text, item.href))
    .filter((item) => item.score >= 35)
    .sort((a, b) => b.score - a.score);

  return candidates[0] || null;
}

async function searchOnCurrentPage(page, context, target) {
  const input = await findSearchInput(page);
  if (!input) return null;

  for (const keyword of SEARCH_KEYWORDS) {
    try {
      await input.fill("");
      await input.fill(keyword);
      await sleep(200);
      const popupPromise = context.waitForEvent("page", { timeout: 4000 }).catch(() => null);
      await input.press("Enter");
      const popup = await popupPromise;
      const resultPage = popup || page;
      await resultPage.waitForLoadState("domcontentloaded", { timeout: 12000 }).catch(() => {});
      await sleep(700);
      const candidate = await pickBestCandidateFromPage(resultPage, target, resultPage.url());
      if (candidate) return candidate;
    } catch {}
  }
  return null;
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
        timeout: 25000,
      });
      await sleep(900);
      const candidate = await pickBestCandidateFromPage(page, target, page.url());
      if (candidate) return candidate;
    } catch {} finally {
      await context.close().catch(() => {});
    }
  }
  return null;
}

function parseEgovOnclick(onclick, currentUrl) {
  const match = onclick.match(/fn_egov_downFile\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/i);
  if (!match) return null;
  return new URL(
    `/cmm/fms/FileDown.do?atchFileId=${encodeURIComponent(match[1])}&fileSn=${encodeURIComponent(match[2])}`,
    currentUrl
  ).toString();
}

async function extractAttachmentCandidates(detailPage, target) {
  const currentUrl = detailPage.url();
  const anchors = await collectAnchors(detailPage);
  const candidates = [];

  for (const anchor of anchors) {
    const text = normalizeText(anchor.text);
    const href = resolveUrl(currentUrl, anchor.href);
    const onclickUrl = parseEgovOnclick(anchor.onclick || "", currentUrl);
    const candidateUrl = onclickUrl || href;
    if (!candidateUrl || !isOfficialHost(target.url, candidateUrl)) continue;
    if (!looksLike2026(text, candidateUrl)) continue;
    if (hasExcludeTerm(text)) continue;
    if (isDirectFileUrl(candidateUrl)) candidates.push({ href: candidateUrl, label: text || "첨부파일" });
  }

  return candidates;
}

async function saveShortcut(target) {
  const safe = sanitizeFileName(`${target.name}_2026_주요업무계획_검토홈페이지`);
  const filePath = path.join(REVIEW_DIR, `${safe}.url`);
  const body = `[InternetShortcut]\r\nURL=${target.url}\r\n`;
  await fs.promises.writeFile(filePath, body, "utf8");
  return filePath;
}

async function saveFile(target, sourceUrl, label) {
  const response = await fetch(sourceUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) throw new Error(`다운로드 실패: ${response.status}`);

  const disposition = response.headers.get("content-disposition") || "";
  const contentType = response.headers.get("content-type") || "";
  let extension = "";

  for (const candidate of KNOWN_FILE_EXTENSIONS) {
    if (sourceUrl.toLowerCase().includes(candidate) || disposition.toLowerCase().includes(candidate)) {
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

  const safeBase = sanitizeFileName(`${target.name}_2026_주요업무계획_${label}`);
  const finalPath = path.join(TEMP_DIR, `${safeBase}${extension}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(finalPath, buffer);
  return finalPath;
}

async function processTarget(browser, target) {
  const context = await browser.newContext({
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
  });
  const page = await context.newPage();

  try {
    let candidate = null;
    try {
      await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await sleep(1000);
      candidate = await pickBestCandidateFromPage(page, target, target.url);
      if (!candidate) candidate = await searchOnCurrentPage(page, context, target);
    } catch {}

    if (!candidate) candidate = await searchViaNaver(browser, target);

    if (!candidate) {
      const shortcut = await saveShortcut(target);
      return { status: "검토필요", name: target.name, homepage: target.url, chosenUrl: target.url, outputs: [shortcut], note: "후보 미발견" };
    }

    if (isDirectFileUrl(candidate.href)) {
      try {
        const filePath = await saveFile(target, candidate.href, sanitizeFileName(candidate.text || "직접첨부"));
        return { status: "수집", name: target.name, homepage: target.url, chosenUrl: candidate.href, outputs: [filePath], note: "직접 첨부 수집" };
      } catch {
        const shortcut = await saveShortcut(target);
        return { status: "검토필요", name: target.name, homepage: target.url, chosenUrl: target.url, outputs: [shortcut], note: "직접 첨부 실패" };
      }
    }

    const detailPage = await context.newPage();
    try {
      await detailPage.goto(candidate.href, { waitUntil: "domcontentloaded", timeout: 50000 });
      await sleep(800);
      const attachments = await extractAttachmentCandidates(detailPage, target);
      if (!attachments.length) {
        const shortcut = await saveShortcut(target);
        return { status: "검토필요", name: target.name, homepage: target.url, chosenUrl: target.url, outputs: [shortcut], note: "첨부 미발견" };
      }

      const outputs = [];
      for (const attachment of attachments) {
        try {
          outputs.push(await saveFile(target, attachment.href, sanitizeFileName(attachment.label || "첨부파일")));
        } catch {}
      }

      if (!outputs.length) {
        const shortcut = await saveShortcut(target);
        return { status: "검토필요", name: target.name, homepage: target.url, chosenUrl: target.url, outputs: [shortcut], note: "첨부 다운로드 실패" };
      }

      return { status: "수집", name: target.name, homepage: target.url, chosenUrl: candidate.href, outputs, note: `첨부 ${outputs.length}건 수집` };
    } catch {
      const shortcut = await saveShortcut(target);
      return { status: "검토필요", name: target.name, homepage: target.url, chosenUrl: target.url, outputs: [shortcut], note: "상세 페이지 실패" };
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
          homepage: items[current].url,
          chosenUrl: "",
          outputs: [],
          note: error.message || String(error),
        };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runner()));
  return results;
}

async function writeLog(results, label) {
  const logPath = path.join(LOG_DIR, `2026_주요업무계획_84수집_${label}.txt`);
  const lines = [];
  lines.push("2026 주요업무계획 84개 대상 수집 로그");
  lines.push(`실행시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);
  lines.push("");

  for (const item of results) {
    lines.push(`[${item.status}] ${item.name}`);
    lines.push(`- 홈페이지: ${item.homepage}`);
    if (item.chosenUrl) lines.push(`- 선택URL: ${item.chosenUrl}`);
    for (const output of item.outputs) lines.push(`- ${output}`);
    lines.push(`- 비고: ${item.note}`);
    lines.push("");
  }

  await fs.promises.writeFile(logPath, lines.join("\r\n"), "utf8");
  return logPath;
}

async function main() {
  await ensureDir(ROOT_DIR);
  await ensureDir(TEMP_DIR);
  await ensureDir(REVIEW_DIR);
  await ensureDir(LOG_DIR);

  const { groupIndex, groupCount, targetsFile, poolSize, filters } = extractArgs();
  let targets = loadTargets(targetsFile);
  if (filters.length) targets = targets.filter((target) => filters.some((filter) => target.name.includes(filter)));
  const selectedTargets = pickTargetsByGroup(targets, groupIndex, groupCount);
  if (!selectedTargets.length) throw new Error("실행 대상이 없습니다.");

  const browser = await chromium.launch({ headless: true });
  try {
    const results = await runPool(selectedTargets, poolSize, async (target) => processTarget(browser, target));
    const label = sanitizeFileName(`그룹${groupIndex + 1}_총${groupCount}`);
    const logPath = await writeLog(results, label);
    console.log(
      JSON.stringify(
        {
          ok: true,
          logPath,
          collectedCount: results.filter((item) => item.status === "수집").length,
          reviewCount: results.filter((item) => item.status === "검토필요").length,
          missingCount: results.filter((item) => item.status === "미확인" || item.status === "실패").length,
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
