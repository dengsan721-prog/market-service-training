import path from 'node:path';
import { pathToFileURL } from 'node:url';

const playwrightPath = process.env.PLAYWRIGHT_PATH || 'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
const { chromium } = await import(pathToFileURL(path.join(playwrightPath, 'index.mjs')).href);

const file = process.argv[2] || path.join(process.cwd(), 'index.html');
const pageUrl = pathToFileURL(path.resolve(file)).href;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 900 },
  deviceScaleFactor: 1,
  isMobile: true
});

await page.goto(pageUrl, { waitUntil: 'networkidle' });
await page.waitForSelector('#workspaceTabs');

await page.locator('[data-master-flow-index="2"]').click();
await page.waitForTimeout(100);
const campOriginal = await page.$eval('.stage-original', (root) => {
  const groups = [...root.querySelectorAll('.stage-original-group')].map((group) => ({
    title: group.querySelector('h5 span')?.textContent?.trim() || '',
    orders: [...group.querySelectorAll('.raw-order')]
      .map((node) => node.textContent.trim())
      .filter(Boolean),
    lineCount: group.querySelectorAll('.raw-line').length
  }));
  return {
    groupTitles: groups.map((group) => group.title),
    groups,
    totalOrders: groups.reduce((sum, group) => sum + group.orders.length, 0),
    hasBrokenZero: groups.some((group) => group.orders.includes('0.'))
  };
});

assert(campOriginal.groupTitles.includes('心态标准'), '7天原文缺少心态标准分组');
assert(campOriginal.groupTitles.includes('动作标准'), '7天原文缺少动作标准分组');
assert(campOriginal.groupTitles.includes('复制标准'), '7天原文缺少复制标准分组');
assert(campOriginal.groupTitles.includes('学习要求'), '7天原文缺少学习要求分组');
assert(campOriginal.groupTitles.includes('作业要求'), '7天原文缺少作业要求分组');
assert(campOriginal.totalOrders >= 15, `7天原文序号过少：${campOriginal.totalOrders}`);
assert(!campOriginal.hasBrokenZero, '7天原文出现错误的 0. 序号');

await page.locator('[data-workspace-target="mirrorLibrary"]').click();
await page.waitForTimeout(100);

const tabLabels = await page.$$eval('#contentTabs button', (buttons) => buttons.map((button) => button.textContent.trim()));
assert(tabLabels.includes('榜样选拔与教练招募'), '镜子库缺少“榜样选拔与教练招募”tab');
assert(tabLabels.includes('市场服务'), '镜子库缺少“市场服务”tab');
assert(!tabLabels.includes('其他原文'), '镜子库仍存在“其他原文”tab');
assert(!tabLabels.includes('123456'), '镜子库仍存在“123456”tab');

await page.locator('[data-content-target="abilitySalonReview"]').click();
const salonReview = await page.$eval('#abilitySalonReview', (root) => {
  const first = root.querySelector('.review-list li');
  const style = first ? getComputedStyle(first) : null;
  return {
    count: root.querySelectorAll('.review-list li').length,
    hasStepChip: root.querySelectorAll('.step-chip').length > 0,
    firstBackground: style?.backgroundColor || '',
    firstBorderRadius: style?.borderRadius || ''
  };
});
assert(salonReview.count >= 10, '沙龙复盘清单数量不足');
assert(!salonReview.hasStepChip, '沙龙复盘清单仍使用胶囊元素');
assert(salonReview.firstBackground === 'rgba(0, 0, 0, 0)', `沙龙复盘清单仍是色块背景：${salonReview.firstBackground}`);
assert(salonReview.firstBorderRadius === '0px', `沙龙复盘清单仍有胶囊圆角：${salonReview.firstBorderRadius}`);

await page.locator('[data-content-target="abilityCamp7Review"]').click();
const campReview = await page.$eval('#abilityCamp7Review', (root) => ({
  count: root.querySelectorAll('ol.review-list li').length,
  ulCount: root.querySelectorAll('ul li').length
}));
assert(campReview.count >= 7, '7天训练营复盘没有使用有序清单');
assert(campReview.ulCount === 0, '7天训练营复盘仍使用圆点列表');

await page.locator('[data-content-target="rawSalon"]').click();
const rawSalonStyle = await page.$eval('#rawSalon .raw-module-card', (card) => {
  const title = card.querySelector('.raw-module-title');
  const titleStyle = title ? getComputedStyle(title) : null;
  const line = card.querySelector('.raw-line span:last-child');
  const lineStyle = line ? getComputedStyle(line) : null;
  return {
    titleBackground: titleStyle?.backgroundColor || '',
    titlePaddingTop: titleStyle?.paddingTop || '',
    titleFontSize: titleStyle?.fontSize || '',
    lineFontSize: lineStyle?.fontSize || ''
  };
});
assert(rawSalonStyle.titleBackground !== 'rgba(0, 0, 0, 0)', '沙龙模块标题没有单独色块');
assert(rawSalonStyle.titleFontSize !== rawSalonStyle.lineFontSize, '沙龙模块标题和正文字号没有区分');

await page.locator('[data-content-target="abilityThinking"]').click();
const thinking = await page.$eval('#abilityThinking', (root) => ({
  numbers: [...root.querySelectorAll('.framework-number')].map((node) => node.textContent.trim())
}));
assert(thinking.numbers[0] === '1', '总监思维第一项没有序号 1');
assert(thinking.numbers.includes('7'), '总监思维没有保留完整序号');

const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1 || document.body.scrollWidth > window.innerWidth + 1);
assert(!overflow, '390px 手机宽度出现横向溢出');

await page.setViewportSize({ width: 320, height: 900 });
await page.waitForTimeout(100);
const narrowOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1 || document.body.scrollWidth > window.innerWidth + 1);
assert(!narrowOverflow, '320px 手机宽度出现横向溢出');

await browser.close();
console.log('interaction structure check passed');
