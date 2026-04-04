const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = "C:\\Users\\SJLEE\\Downloads\\GPT";
const CANDIDATE_DIR = path.join(ROOT_DIR, "후보수집");
const LOG_DIR = path.join(ROOT_DIR, "작업로그");
const TARGETS_FILE = path.join(LOG_DIR, "주요업무계획_대상목록_최신.tsv");
const FORCE_RERUN = process.argv.includes("--다시시작");

const KEYWORDS = [
  "2026 주요업무계획",
  "2026 주요업무 추진계획",
  "2026 시정 주요업무계획",
  "2026 군정 주요업무계획",
  "2026 도정 주요업무계획",
];

const EXCLUDE_WORDS = [
  "보도자료",
  "사진",
  "회의록",
  "의회",
  "입찰",
  "공고",
  "재정공시",
  "인증서",
  "홍보",
  "계약",
  "민원",
  "공문",
  "예산서",
];

const FILE_EXTENSIONS = [".pdf", ".hwp", ".hwpx", ".zip"];

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

function loadTargets() {
  const content = fs.readFileSync(TARGETS_FILE, "utf8").replace(/^\uFEFF/, "");
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, url] = line.split("\t");
      return { name: name.trim(), url: url.trim() };
    });
}

function loadCompletedTargets() {
  const completed = new Set();
  if (!fs.existsSync(LOG_DIR)) return completed;

  const logFiles = fs.readdirSync(LOG_DIR).filter((name) => name.endsWith(".txt"));
  for (const fileName of logFiles) {
    const content = fs.readFileSync(path.join(LOG_DIR, fileName), "utf8").replace(/^\uFEFF/, "");
    let currentName = "";
    let hasSavedPath = false;
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      const headerMatch = line.match(/^\[(.+?)\]\s+(.+)$/);
      if (headerMatch) {
        if (currentName && hasSavedPath) completed.add(currentName);
        currentName = headerMatch[2].trim();
        hasSavedPath = false;
        continue;
      }
      if (line.startsWith("- ")) hasSavedPath = true;
    }
    if (currentName && hasSavedPath) completed.add(currentName);
  }
  return completed;
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

function hasExcludeWord(text = "") {
  return EXCLUDE_WORDS.some((word) => text.includes(word));
}

function looksLike2026(text = "", href = "") {
  const joined = `${text} ${href}`;
  return joined.includes("2026") || joined.includes("2026년도") || joined.includes("26년");
}

function scoreCandidate(text = "", href = "") {
  let score = 0;
  if (looksLike2026(text, href)) score += 80;
  if (text.includes("주요업무")) score += 40;
  if (text.includes("업무계획")) score += 30;
  if (text.includes("추진계획")) score += 20;
  if (text.includes("시정") || text.includes("군정") || text.includes("도정")) score += 10;
  if (href.toLowerCase().includes("bbs")) score += 6;
  if (href.toLowerCase().includes(".pdf")) score += 15;
  if (hasExcludeWord(text)) score -= 100;
  if (text.includes("2025")) score -= 120;
  return score;
}

function buildOutputStem(targetName, suffix = "") {
  return path.join(CANDIDATE_DIR, sanitizeFileName(`${targetName}_2026_주요업무계획${suffix}`));
}

async function saveShortcut(targetName, url, label) {
  const filePath = `${buildOutputStem(targetName, `_${label}`)}.url`;
  const body = `[InternetShortcut]\r\nURL=${url}\r\n`;
  await fs.promises.writeFile(filePath, body, "utf8");
  return filePath;
}

async function saveUrlToFile(url, outputBase) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`다운로드 실패: ${response.status}`);
  }

  const disposition = response.headers.get("content-disposition") || "";
  const contentType = response.headers.get("content-type") || "";
  let extension = "";

  for (const candidate of FILE_EXTENSIONS) {
    if (url.toLowerCase().includes(candidate) || disposition.toLowerCase().includes(candidate)) {
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

  const finalPath = `${outputBase}${extension}`;
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(finalPath, buffer);
  return finalPath;
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

async function searchOnSite(page, context, target) {
  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await sleep(1200);
  } catch {
    return null;
  }

  const searchInput = await findSearchInput(page);
  if (!searchInput) return null;

  for (const keyword of KEYWORDS) {
    try {
      await searchInput.fill("");
      await searchInput.fill(keyword);
      await sleep(300);
      const popupPromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null);
      await searchInput.press("Enter");
      const popup = await popupPromise;
      const resultPage = popup || page;
      await resultPage.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});
      await sleep(1000);
      const best = await pickBestResult(resultPage, target);
      if (best) return best;
    } catch {}
  }

  return null;
}

async function pickBestResult(page, target) {
  const anchors = await collectAnchors(page);
  const candidates = anchors
    .map((anchor) => {
      const text = normalizeText(anchor.text);
      const href = resolveUrl(target.url, anchor.href);
      return { text, href, score: scoreCandidate(text, href) };
    })
    .filter((item) => item.text && item.href)
    .filter((item) => isOfficialHost(target.url, item.href))
    .filter((item) => looksLike2026(item.text, item.href))
    .filter((item) => item.score >= 40)
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
      const best = await pickBestResult(page, target);
      if (best) return best;
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

async function extractAttachmentCandidates(page, target) {
  const currentUrl = page.url();
  const anchors = await collectAnchors(page);
  const candidates = [];

  for (const anchor of anchors) {
    const text = normalizeText(anchor.text);
    const href = resolveUrl(currentUrl, anchor.href);
    const onclickUrl = parseEgovOnclick(anchor.onclick || "", currentUrl);
    const candidateHref = onclickUrl || href;
    if (!candidateHref) continue;
    if (hasExcludeWord(text)) continue;

    if (isDirectFileUrl(candidateHref)) {
      candidates.push({ href: candidateHref, label: text || "첨부파일" });
      continue;
    }

    if (looksLike2026(text, candidateHref) && scoreCandidate(text, candidateHref) >= 45) {
      candidates.push({ href: candidateHref, label: text || "검토페이지", pageShortcut: true });
    }
  }

  return candidates;
}

async function processTarget(browser, target) {
  const context = await browser.newContext({
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
  });
  const page = await context.newPage();

  try {
    let candidate = await searchOnSite(page, context, target);
    if (!candidate) {
      candidate = await searchViaNaver(browser, target);
    }

    if (!candidate) {
      return {
        status: "미확인",
        name: target.name,
        homeUrl: target.url,
        resultUrl: "",
        savedPaths: [],
        note: "2026 문서 미확인",
      };
    }

    if (isDirectFileUrl(candidate.href)) {
      const savedPath = await saveUrlToFile(candidate.href, buildOutputStem(target.name, "_직접첨부"));
      return {
        status: "성공",
        name: target.name,
        homeUrl: target.url,
        resultUrl: candidate.href,
        savedPaths: [savedPath],
        note: "직접 첨부 1건",
      };
    }

    const detailPage = await context.newPage();
    try {
      await detailPage.goto(candidate.href, { waitUntil: "domcontentloaded", timeout: 60000 });
      await sleep(1000);
      const attachments = await extractAttachmentCandidates(detailPage, target);
      const directAttachments = attachments.filter((item) => isDirectFileUrl(item.href));

      if (directAttachments.length) {
        const savedPaths = [];
        for (let index = 0; index < directAttachments.length; index += 1) {
          const item = directAttachments[index];
          const safeLabel = sanitizeFileName(item.label || `첨부${index + 1}`);
          const savedPath = await saveUrlToFile(item.href, buildOutputStem(target.name, `_${safeLabel}`));
          savedPaths.push(savedPath);
        }
        return {
          status: "성공",
          name: target.name,
          homeUrl: target.url,
          resultUrl: candidate.href,
          savedPaths,
          note: `첨부 ${savedPaths.length}건`,
        };
      }

      const shortcutPath = await saveShortcut(target.name, candidate.href, "검토페이지");
      return {
        status: "확인필요",
        name: target.name,
        homeUrl: target.url,
        resultUrl: candidate.href,
        savedPaths: [shortcutPath],
        note: "다운로드 페이지 확인 필요",
      };
    } catch {
      const shortcutPath = await saveShortcut(target.name, candidate.href, "검토페이지");
      return {
        status: "확인필요",
        name: target.name,
        homeUrl: target.url,
        resultUrl: candidate.href,
        savedPaths: [shortcutPath],
        note: "페이지 바로가기 저장",
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

async function writeReports(results, label) {
  const summaryPath = path.join(LOG_DIR, `주요업무계획_수집결과_${label}.txt`);
  const specialPath = path.join(LOG_DIR, `주요업무계획_특이사항_${label}.txt`);

  const summaryLines = [];
  summaryLines.push("주요업무계획 수집 결과");
  summaryLines.push(`실행 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);
  summaryLines.push("");

  for (const item of results) {
    summaryLines.push(`[${item.status}] ${item.name}`);
    summaryLines.push(`홈페이지: ${item.homeUrl}`);
    if (item.resultUrl) summaryLines.push(`선택페이지: ${item.resultUrl}`);
    for (const savedPath of item.savedPaths) {
      summaryLines.push(`- ${savedPath}`);
    }
    summaryLines.push(`비고: ${item.note}`);
    summaryLines.push("");
  }

  const specialLines = [];
  specialLines.push("주요업무계획 특이사항");
  specialLines.push("- 2026 문서가 확인되지 않으면 2025 문서로 대체하지 않음");
  specialLines.push("- 확실하지 않으면 다운로드 페이지 바로가기만 후보수집에 저장");
  specialLines.push("");

  for (const item of results) {
    if (item.status === "성공") continue;
    specialLines.push(`[${item.status}] ${item.name}`);
    specialLines.push(`- 홈페이지: ${item.homeUrl}`);
    if (item.resultUrl) specialLines.push(`- 확인페이지: ${item.resultUrl}`);
    specialLines.push(`- 사유: ${item.note}`);
    specialLines.push("- 처리원칙: 2025 대체 저장 금지");
    specialLines.push("");
  }

  await fs.promises.writeFile(summaryPath, summaryLines.join("\r\n"), "utf8");
  await fs.promises.writeFile(specialPath, specialLines.join("\r\n"), "utf8");
  return { summaryPath, specialPath };
}

async function main() {
  await ensureDir(CANDIDATE_DIR);
  await ensureDir(LOG_DIR);

  const allTargets = loadTargets();
  const completed = FORCE_RERUN ? new Set() : loadCompletedTargets();
  const filters = process.argv.slice(2).map((arg) => arg.trim()).filter((arg) => arg && !arg.startsWith("--"));
  const filtered = filters.length
    ? allTargets.filter((target) => filters.some((filter) => target.name.includes(filter)))
    : allTargets;
  const targets = filtered.filter((target) => !completed.has(target.name));

  if (!targets.length) {
    throw new Error("실행할 대상이 없습니다.");
  }

  const label = sanitizeFileName(filters.length ? `${filters[0]}_외${filters.length - 1}` : "전체");
  const browser = await chromium.launch({ headless: true });
  try {
    const results = await runPool(targets, 4, async (target) => processTarget(browser, target));
    const report = await writeReports(results, label);
    console.log(
      JSON.stringify(
        {
          ok: true,
          summaryPath: report.summaryPath,
          specialPath: report.specialPath,
          successCount: results.filter((item) => item.status === "성공").length,
          reviewCount: results.filter((item) => item.status === "확인필요").length,
          failureCount: results.filter((item) => item.status === "실패" || item.status === "미확인").length,
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
