import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'happiness-family-answer-bank.json'), 'utf8'));
const manualMatch = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!manualMatch) throw new Error('manualData not found');
const manual = JSON.parse(manualMatch[1]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(data.itemCount === 316, `source item count is ${data.itemCount}`);
assert(data.modules.length === 10, `source module count is ${data.modules.length}`);
assert(manual.happinessFamilyAnswerBank?.itemCount === 316, 'embedded item count is incorrect');
assert(manual.happinessFamilyAnswerBank?.modules?.length === 10, 'embedded module count is incorrect');
assert(html.includes('data-content-target="happinessFamilyAnswers"'), 'answer-bank content tab is missing');
assert(html.includes('id="happinessFamilyAnswers"'), 'answer-bank panel is missing');
assert(html.includes('data-happiness-answer-search'), 'answer-bank search hook is missing');
assert(html.includes('data-happiness-answer-toc'), 'answer-bank directory hook is missing');
assert(html.includes('function renderHappinessFamilyAnswers'), 'answer-bank renderer is missing');

const sourceItems = data.modules.flatMap((module) => module.items || []);
const embeddedItems = manual.happinessFamilyAnswerBank.modules.flatMap((module) => module.items || []);
assert(sourceItems.length === 316, `source parsed item count is ${sourceItems.length}`);
assert(embeddedItems.length === 316, `embedded parsed item count is ${embeddedItems.length}`);
assert(sourceItems[0]?.title === '爸爸不是家里的客人', 'first imported answer is missing');
assert(sourceItems.at(-1)?.title === '教育孩子之前，父母先问自己是不是太急了', 'last imported answer is missing');

const playwrightPath = process.env.PLAYWRIGHT_PATH || 'C:/Users/shadow/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
const { chromium } = await import(pathToFileURL(path.join(playwrightPath, 'index.mjs')).href);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {})
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(pathToFileURL(path.join(root, 'index.html')).href, { waitUntil: 'networkidle' });
await page.locator('[data-workspace-target="mirrorLibrary"]').click();
await page.locator('[data-content-target="happinessFamilyAnswers"]').click();

const initial = await page.$eval('#happinessFamilyAnswers', (panel) => ({
  visible: !panel.hidden,
  tocCount: panel.querySelectorAll('[data-happiness-answer-module]').length,
  moduleCount: panel.querySelectorAll('[data-happiness-answer-module-section]').length,
  itemCount: panel.querySelectorAll('[data-happiness-answer-item]').length,
  copyCount: panel.querySelectorAll('[data-copy-text]').length,
  meta: panel.querySelector('[data-happiness-answer-meta]')?.textContent || ''
}));
assert(initial.visible, 'answer-bank panel is not visible after tab click');
assert(initial.tocCount === 11, `directory button count is ${initial.tocCount}`);
assert(initial.moduleCount === 10, `rendered module count is ${initial.moduleCount}`);
assert(initial.itemCount === 316, `rendered item count is ${initial.itemCount}`);
assert(initial.copyCount === 316, `item copy button count is ${initial.copyCount}`);
assert(initial.meta.includes('316'), 'initial result meta is missing total count');

await page.locator('[data-happiness-answer-search]').fill('冷战');
const searchResult = await page.$eval('#happinessFamilyAnswers', (panel) => ({
  visible: [...panel.querySelectorAll('[data-happiness-answer-item]')].filter((item) => !item.hidden).length,
  hidden: [...panel.querySelectorAll('[data-happiness-answer-item]')].filter((item) => item.hidden).length,
  meta: panel.querySelector('[data-happiness-answer-meta]')?.textContent || '',
  text: panel.textContent || ''
}));
assert(searchResult.visible > 0, 'keyword search returned no answers');
assert(searchResult.hidden > 0, 'keyword search did not filter answers');
assert(searchResult.meta.includes('找到'), 'keyword search meta did not update');
assert(searchResult.text.includes('冷战'), 'keyword search result text does not include keyword');

await page.locator('[data-happiness-answer-search]').fill('');
await page.locator('[data-happiness-answer-module="1"]').click();
const moduleResult = await page.$eval('#happinessFamilyAnswers', (panel) => ({
  visible: [...panel.querySelectorAll('[data-happiness-answer-item]')].filter((item) => !item.hidden).length,
  visibleModules: [...panel.querySelectorAll('[data-happiness-answer-module-section]')].filter((module) => !module.hidden).length,
  heading: [...panel.querySelectorAll('[data-happiness-answer-module-section]')].find((module) => !module.hidden)?.querySelector('h3')?.textContent || '',
  meta: panel.querySelector('[data-happiness-answer-meta]')?.textContent || ''
}));
assert(moduleResult.visible === 20, `module filter returned ${moduleResult.visible} answers`);
assert(moduleResult.visibleModules === 1, `module filter left ${moduleResult.visibleModules} modules visible`);
assert(moduleResult.heading === '亲子沟通', `module filter heading is ${moduleResult.heading}`);
assert(moduleResult.meta.includes('20 / 316'), `module filter meta is ${moduleResult.meta}`);

await browser.close();
console.log('PASS: happiness family answer bank has 316 searchable, directory-browsable items.');
