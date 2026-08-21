/**
 * weid — render tests for weid.css
 *
 * example.html is the demo and the visual test; this file is the same test,
 * automated. It renders both demos in a real browser and asserts the things
 * the stylesheet promises: margin notes above 1100px, notes back in the flow
 * below it, three distinguishable line styles, a toggle that works without
 * JavaScript, a dark theme by preference and by class, and — the point of the
 * whole convention — notes that survive with the stylesheet gone.
 *
 * There is no package.json on purpose. Playwright is the only dependency and
 * it is not required to use weid, only to test it:
 *
 *   npm install playwright && npx playwright install chromium
 *   node test.mjs
 *
 * If your Chromium lives somewhere Playwright does not look:
 *
 *   WEID_CHROME=/path/to/chrome node test.mjs
 */

import { chromium } from 'playwright';

const FILES = ['example.html', 'example.es.html'];
const BASE = new URL('.', import.meta.url).href;

let passed = 0;
const failures = [];

function check(name, ok, detail = '') {
  if (ok) {
    passed++;
    console.log(`  ok    ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

const browser = await chromium.launch(
  process.env.WEID_CHROME ? { executablePath: process.env.WEID_CHROME } : {}
);

for (const file of FILES) {
  const url = BASE + file;
  console.log(`\n${file}`);

  // ── Wide: notes go to the margin, the legend's sample does not ──────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(url);

    const article = await page.locator('article').boundingBox();
    const note = await page.locator('article > p .weid-note').first().boundingBox();
    check(
      'wide: notes sit outside the text column',
      note.x >= article.x + article.width - 5,
      `article ends at ${Math.round(article.x + article.width)}, note starts at ${Math.round(note.x)}`
    );

    // The legend's note is a sample of itself, not a note: it must stay in its
    // bullet rather than float away.
    const sample = await page.locator('.weid-legend .weid-note').first().boundingBox();
    check(
      'wide: the legend sample stays in its bullet',
      sample.x < article.x + article.width - 100
    );

    // Three marks, three line styles, all sharing the accent colour.
    const styles = {};
    for (const cls of ['weid-verbatim', 'weid-idea', 'weid-experience']) {
      styles[cls] = await page
        .locator(`article > p .${cls}`)
        .first()
        .evaluate((el) => {
          const cs = getComputedStyle(el);
          return { style: cs.textDecorationStyle, line: cs.textDecorationLine, color: cs.textDecorationColor };
        });
    }
    check('verbatim is a solid underline', styles['weid-verbatim'].style === 'solid' && styles['weid-verbatim'].line === 'underline');
    check('idea is a dashed underline', styles['weid-idea'].style === 'dashed');
    check('experience is a dotted underline', styles['weid-experience'].style === 'dotted');
    check(
      'the three marks differ by line style, not colour',
      new Set(Object.values(styles).map((s) => s.style)).size === 3 &&
        new Set(Object.values(styles).map((s) => s.color)).size === 1
    );

    // ── The toggle: a checkbox and :has(), no script ─────────────────────
    const bullet = page.locator('.weid-legend li').nth(3);
    const bulletBefore = await bullet.innerText();

    await page.locator('.weid-toggle-label').click();

    check(
      'toggle: underlines come off',
      (await page.locator('article > p .weid-verbatim').first().evaluate((el) => getComputedStyle(el).textDecorationLine)) === 'none'
    );
    check('toggle: notes in the text hide', !(await page.locator('article > p .weid-note').first().isVisible()));
    check('toggle: the label swaps', await page.locator('.weid-lbl-off').first().isVisible());

    // Regression: the toggle used to hide the legend's sample too, leaving the
    // bullet with no label and a leading colon.
    check(
      'toggle: the legend keeps its fourth bullet label',
      (await bullet.innerText()) === bulletBefore,
      `was ${JSON.stringify(bulletBefore)}, now ${JSON.stringify(await bullet.innerText())}`
    );

    await ctx.close();
  }

  // ── Narrow: notes return to the flow, nothing overflows ─────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(url);

    const article = await page.locator('article').boundingBox();
    const note = await page.locator('article > p .weid-note').first().boundingBox();
    check('narrow: notes return to the text flow', note.x < article.x + article.width - 50);
    check(
      'narrow: the page does not scroll sideways',
      !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1))
    );
    await ctx.close();
  }

  // ── Dark, by preference and by class ────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(url);
    const accentDark = await page
      .locator('article > p .weid-verbatim')
      .first()
      .evaluate((el) => getComputedStyle(el).textDecorationColor);

    // `.light` on the root opts a site out of the preference-based dark theme.
    const accentOptOut = await page.evaluate(() => {
      document.documentElement.classList.add('light');
      const el = document.querySelector('article > p .weid-verbatim');
      const c = getComputedStyle(el).textDecorationColor;
      document.documentElement.classList.remove('light');
      return c;
    });
    check('dark by preference changes the accent', accentDark !== accentOptOut, `${accentDark} vs ${accentOptOut}`);
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 }, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(url);
    const read = () =>
      page.locator('article > p .weid-verbatim').first().evaluate((el) => getComputedStyle(el).textDecorationColor);
    const light = await read();
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    const byClass = await read();
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    const byAttr = await read();
    check('dark by .dark class changes the accent', byClass !== light);
    check('dark by [data-theme="dark"] changes the accent', byAttr !== light);
    await ctx.close();
  }

  // ── Print: notes come back into the flow ────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(url);
    await page.emulateMedia({ media: 'print' });
    const article = await page.locator('article').boundingBox();
    const note = await page.locator('article > p .weid-note').first().boundingBox();
    check('print: notes return to the text flow', note.x < article.x + article.width - 50);
    await ctx.close();
  }

  // ── No stylesheet: the disclosure still stands ──────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
    const page = await ctx.newPage();
    await page.route('**/weid.css', (route) => route.abort());
    await page.goto(url);
    const text = (await page.locator('article > p .weid-note').first().innerText()).trim();
    check('without the stylesheet, note text is still there', text.length > 10, JSON.stringify(text.slice(0, 40)));
    check(
      'without the stylesheet, marked passages are still in the text',
      (await page.locator('article > p .weid-verbatim').first().innerText()).trim().length > 0
    );
    await ctx.close();
  }

  // ── The convention's own rules, read off the markup ─────────────────────
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(url);

    check('the document carries a disclosure attribute', await page.locator('[data-ai-disclosure], [ai-disclosure]').first().isVisible());
    check('the legend is present', (await page.locator('.weid-legend').count()) === 1);
    check('the voice pill names its source', (await page.locator('.weid-voice .weid-voice-src').count()) === 1);

    // SPEC §5: a mark may carry human-only on weid-verbatim, and must not carry
    // a disclosure value on weid-idea or weid-experience.
    const overclaimed = await page.locator(
      '.weid-idea[data-ai-disclosure], .weid-idea[ai-disclosure], .weid-experience[data-ai-disclosure], .weid-experience[ai-disclosure]'
    ).count();
    check('no mark overstates its claim (SPEC §5)', overclaimed === 0);

    await ctx.close();
  }
}

await browser.close();

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
