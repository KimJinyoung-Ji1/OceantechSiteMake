/**
 * Design QA Script — OceanTech Site
 *
 * Usage:
 *   node scripts/design-qa.mjs baseline          — Save current screenshots as baseline
 *   node scripts/design-qa.mjs check              — Compare against baseline + accessibility + color audit
 *   node scripts/design-qa.mjs check --no-diff    — Skip pixel diff (no baseline needed)
 *   node scripts/design-qa.mjs screenshot         — Just take screenshots (no analysis)
 *
 * Output: /tmp/design-qa/
 */

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import chroma from 'chroma-js';
import fs from 'fs';
import path from 'path';

const QA_DIR = '/tmp/design-qa';
const BASELINE_DIR = path.join(QA_DIR, 'baseline');
const CURRENT_DIR = path.join(QA_DIR, 'current');
const DIFF_DIR = path.join(QA_DIR, 'diff');

const SITE_URL = process.env.QA_URL || 'http://localhost:3000';

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const PAGES = [
  { name: 'home', path: '/ko' },
  { name: 'about', path: '/ko/about' },
  { name: 'contact', path: '/ko/contact' },
];

// WCAG AA contrast ratio thresholds
const CONTRAST_AA_NORMAL = 4.5;
const CONTRAST_AA_LARGE = 3.0;

function ensureDirs() {
  for (const d of [QA_DIR, BASELINE_DIR, CURRENT_DIR, DIFF_DIR]) {
    fs.mkdirSync(d, { recursive: true });
  }
}

async function takeScreenshots(outDir) {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const pg of PAGES) {
      const filename = `${pg.name}_${vp.name}.png`;
      const filepath = path.join(outDir, filename);

      await page.goto(`${SITE_URL}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.screenshot({ path: filepath, fullPage: true });
      results.push({ viewport: vp.name, page: pg.name, file: filepath });
    }
    await ctx.close();
  }

  await browser.close();
  return results;
}

function pixelDiff(baselinePath, currentPath, diffPath) {
  if (!fs.existsSync(baselinePath)) return null;

  const baseImg = PNG.sync.read(fs.readFileSync(baselinePath));
  const currImg = PNG.sync.read(fs.readFileSync(currentPath));

  // Handle size differences
  const width = Math.max(baseImg.width, currImg.width);
  const height = Math.max(baseImg.height, currImg.height);

  // Pad images to same size
  function padImage(img, w, h) {
    if (img.width === w && img.height === h) return img.data;
    const padded = new Uint8Array(w * h * 4);
    for (let y = 0; y < img.height && y < h; y++) {
      for (let x = 0; x < img.width && x < w; x++) {
        const srcIdx = (y * img.width + x) * 4;
        const dstIdx = (y * w + x) * 4;
        padded[dstIdx] = img.data[srcIdx];
        padded[dstIdx + 1] = img.data[srcIdx + 1];
        padded[dstIdx + 2] = img.data[srcIdx + 2];
        padded[dstIdx + 3] = img.data[srcIdx + 3];
      }
    }
    return padded;
  }

  const baseData = padImage(baseImg, width, height);
  const currData = padImage(currImg, width, height);
  const diff = new PNG({ width, height });

  const mismatchCount = pixelmatch(baseData, currData, diff.data, width, height, {
    threshold: 0.1,
    alpha: 0.3,
    diffColor: [255, 0, 0],
  });

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercent = ((mismatchCount / totalPixels) * 100).toFixed(2);

  return { mismatchCount, totalPixels, diffPercent, diffPath };
}

async function runAccessibility() {
  const browser = await chromium.launch();
  const results = [];

  for (const pg of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    await page.goto(`${SITE_URL}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });

    const axeResults = await new AxeBuilder({ page }).analyze();
    const violations = axeResults.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      count: v.nodes.length,
      elements: v.nodes.slice(0, 3).map(n => n.html.substring(0, 100)),
    }));

    results.push({ page: pg.name, violations });
    await ctx.close();
  }

  await browser.close();
  return results;
}

async function extractColors() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto(`${SITE_URL}/ko`, { waitUntil: 'networkidle', timeout: 30000 });

  // Extract computed colors from key elements
  const colorData = await page.evaluate(() => {
    const pairs = [];
    const elements = document.querySelectorAll('h1,h2,h3,h4,p,a,span,button,li,dt,dd,label');

    elements.forEach(el => {
      const style = getComputedStyle(el);
      const text = el.textContent?.trim();
      if (!text || text.length === 0) return;

      const fg = style.color;
      const bg = style.backgroundColor;
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = parseInt(style.fontWeight) || 400;
      const tag = el.tagName.toLowerCase();

      if (bg && bg !== 'rgba(0, 0, 0, 0)') {
        pairs.push({ fg, bg, fontSize, fontWeight, tag, text: text.substring(0, 40) });
      }
    });

    return pairs.slice(0, 100); // Limit
  });

  await browser.close();

  // Analyze contrast ratios
  const contrastIssues = [];
  for (const item of colorData) {
    try {
      const fgColor = chroma(item.fg);
      const bgColor = chroma(item.bg);
      const ratio = chroma.contrast(fgColor, bgColor);
      const isLarge = item.fontSize >= 18 || (item.fontSize >= 14 && item.fontWeight >= 700);
      const threshold = isLarge ? CONTRAST_AA_LARGE : CONTRAST_AA_NORMAL;

      if (ratio < threshold) {
        contrastIssues.push({
          text: item.text,
          tag: item.tag,
          fg: item.fg,
          bg: item.bg,
          ratio: ratio.toFixed(2),
          required: threshold,
          fontSize: item.fontSize,
        });
      }
    } catch {
      // Skip unparseable colors
    }
  }

  return { totalChecked: colorData.length, issues: contrastIssues };
}

function printReport(screenshots, diffs, accessibility, colors) {
  console.log('\n' + '='.repeat(60));
  console.log('  DESIGN QA REPORT — OceanTech');
  console.log('  ' + new Date().toLocaleString('ko-KR'));
  console.log('='.repeat(60));

  // Screenshots
  console.log('\n--- Screenshots ---');
  for (const s of screenshots) {
    console.log(`  [${s.viewport}] ${s.page}: ${s.file}`);
  }

  // Pixel Diff
  if (diffs && diffs.length > 0) {
    console.log('\n--- Pixel Diff (vs baseline) ---');
    let hasChanges = false;
    for (const d of diffs) {
      if (d.result) {
        const icon = parseFloat(d.result.diffPercent) > 1 ? '!!' : parseFloat(d.result.diffPercent) > 0 ? '~' : 'OK';
        console.log(`  [${icon}] ${d.name}: ${d.result.diffPercent}% changed (${d.result.mismatchCount} px)`);
        if (parseFloat(d.result.diffPercent) > 0) hasChanges = true;
      } else {
        console.log(`  [--] ${d.name}: no baseline`);
      }
    }
    if (!hasChanges) console.log('  No visual changes detected.');
  }

  // Accessibility
  if (accessibility) {
    console.log('\n--- Accessibility (axe-core) ---');
    for (const a of accessibility) {
      if (a.violations.length === 0) {
        console.log(`  [${a.page}] No violations`);
      } else {
        console.log(`  [${a.page}] ${a.violations.length} issue(s):`);
        for (const v of a.violations) {
          console.log(`    [${v.impact}] ${v.id}: ${v.description} (${v.count}x)`);
        }
      }
    }
  }

  // Color Contrast
  if (colors) {
    console.log('\n--- Color Contrast (WCAG AA) ---');
    console.log(`  Checked: ${colors.totalChecked} elements`);
    if (colors.issues.length === 0) {
      console.log('  All pass!');
    } else {
      console.log(`  Failures: ${colors.issues.length}`);
      for (const c of colors.issues.slice(0, 10)) {
        console.log(`    "${c.text}" [${c.tag}] — ratio ${c.ratio} (need ${c.required}) | fg:${c.fg} bg:${c.bg}`);
      }
      if (colors.issues.length > 10) {
        console.log(`    ... and ${colors.issues.length - 10} more`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('  Screenshots: /tmp/design-qa/current/');
  if (diffs) console.log('  Diff images: /tmp/design-qa/diff/');
  console.log('='.repeat(60) + '\n');
}

// --- Main ---
const command = process.argv[2] || 'check';
const noDiff = process.argv.includes('--no-diff');

ensureDirs();

if (command === 'baseline') {
  console.log('Taking baseline screenshots...');
  const shots = await takeScreenshots(BASELINE_DIR);
  console.log(`Saved ${shots.length} baseline screenshots to ${BASELINE_DIR}`);
  process.exit(0);
}

if (command === 'screenshot') {
  console.log('Taking screenshots...');
  const shots = await takeScreenshots(CURRENT_DIR);
  shots.forEach(s => console.log(`  ${s.viewport}/${s.page}: ${s.file}`));
  process.exit(0);
}

if (command === 'check') {
  console.log('Running Design QA...');

  // 1. Screenshots
  const screenshots = await takeScreenshots(CURRENT_DIR);

  // 2. Pixel diff
  let diffs = null;
  if (!noDiff) {
    diffs = [];
    for (const s of screenshots) {
      const name = `${s.page}_${s.viewport}`;
      const baselinePath = path.join(BASELINE_DIR, `${name}.png`);
      const currentPath = s.file;
      const diffPath = path.join(DIFF_DIR, `${name}_diff.png`);
      const result = pixelDiff(baselinePath, currentPath, diffPath);
      diffs.push({ name, result });
    }
  }

  // 3. Accessibility
  const accessibility = await runAccessibility();

  // 4. Color contrast
  const colors = await extractColors();

  // 5. Report
  printReport(screenshots, diffs, accessibility, colors);
}
