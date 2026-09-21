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

const visibleExportLinks = await page.locator('a[href="exports/market-service-manual.docx"], a[href="exports/market-service-manual.md"]').count();
assert(visibleExportLinks === 0, '页面仍显示 Word 或 MD 下载入口');

const activeWorkspaceStyle = await page.$eval('#workspaceTabs button.active', (button) => getComputedStyle(button).backgroundColor);
assert(activeWorkspaceStyle !== 'rgb(29, 29, 31)', '大流程/镜子库切换仍是黑色色块');

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
    hasBrokenZero: groups.some((group) => group.orders.includes('0.')),
    copyButtonCount: root.querySelectorAll('[data-copy-text]').length
  };
});

assert(campOriginal.groupTitles.includes('心态标准'), '7天原文缺少心态标准分组');
assert(campOriginal.groupTitles.includes('动作标准'), '7天原文缺少动作标准分组');
assert(campOriginal.groupTitles.includes('复制标准'), '7天原文缺少复制标准分组');
assert(!campOriginal.groupTitles.includes('学习要求'), '大流程7天原文仍显示学习要求分组');
assert(!campOriginal.groupTitles.includes('作业要求'), '大流程7天原文仍显示作业要求分组');
assert(campOriginal.totalOrders >= 13, `7天原文序号过少：${campOriginal.totalOrders}`);
assert(!campOriginal.hasBrokenZero, '7天原文出现错误的 0. 序号');
assert(campOriginal.copyButtonCount >= campOriginal.groupTitles.length + 1, '大流程标准原文区域缺少复制按钮');
const stageSourceCopyCount = await page.locator('.stage-source [data-copy-text]').count();
assert(stageSourceCopyCount === 0, '大流程内容库位置仍显示复制按钮');

await page.locator('[data-workspace-target="mirrorLibrary"]').click();
await page.waitForTimeout(100);

const tabLabels = await page.$$eval('#contentTabs button', (buttons) => buttons.map((button) => button.textContent.trim()));
assert(JSON.stringify(tabLabels) === JSON.stringify([
  '沙龙',
  '沙龙复盘',
  '7天训练营',
  '7天训练营复盘',
  '榜样采访',
  '幸福沙龙采访',
  '榜样选拔与教练招募',
  '沙龙话术',
  '人才培养营',
  '市场服务',
  '总监思维',
  '工具模型',
  '幸福驾校互动问句',
  '主课互动问句',
  '智疗互动问句',
  '学员成长四步'
]), `镜子库 tab 顺序不正确：${tabLabels.join(' / ')}`);
assert(tabLabels.includes('榜样选拔与教练招募'), '镜子库缺少“榜样选拔与教练招募”tab');
assert(tabLabels.includes('市场服务'), '镜子库缺少“市场服务”tab');
assert(!tabLabels.includes('其他原文'), '镜子库仍存在“其他原文”tab');
assert(!tabLabels.includes('123456'), '镜子库仍存在“123456”tab');
assert(!tabLabels.includes('沙龙模块'), '镜子库仍显示“沙龙模块”tab');
assert(!tabLabels.includes('7天训练营模块'), '镜子库仍显示“7天训练营模块”tab');
assert(!tabLabels.includes('幸福早课人才培养营模块'), '镜子库仍显示“幸福早课人才培养营模块”tab');

const activeContentStyle = await page.$eval('#contentTabs button.active', (button) => getComputedStyle(button).backgroundColor);
assert(activeContentStyle !== 'rgb(29, 29, 31)', '镜子库内容切换仍是黑色色块');
const contentTabsLayout = await page.$eval('#contentTabs', (root) => ({
  flexWrap: getComputedStyle(root).flexWrap,
  overflowX: getComputedStyle(root).overflowX,
  scrollWidth: root.scrollWidth,
  clientWidth: root.clientWidth
}));
assert(contentTabsLayout.flexWrap === 'wrap', '镜子库模块按钮没有换行展示');
assert(contentTabsLayout.scrollWidth <= contentTabsLayout.clientWidth + 1, '镜子库模块按钮仍存在横向滚动');

await page.locator('[data-content-target="salonScripts"]').click();
await page.waitForTimeout(100);
const salonScriptStats = await page.$eval('#salonScripts', (root) => ({
  buttons: [...root.querySelectorAll('#salonScriptTabs button')].map((button) => button.textContent.trim()),
  fixedHeadCount: root.querySelectorAll('.salon-script-head').length,
  stepCount: root.querySelectorAll('.salon-step-card').length,
  copyCount: root.querySelectorAll('.salon-step-copy').length,
  firstCopyText: root.querySelector('.salon-step-copy')?.dataset.copyText || '',
  hasBody: (root.querySelector('.salon-script-body')?.textContent || '').includes('第一：邀约'),
  firstStepOverflowY: getComputedStyle(root.querySelector('.salon-step-content')).overflowY,
  firstStepMaxHeight: getComputedStyle(root.querySelector('.salon-step-content')).maxHeight,
  firstStepCardOverflow: getComputedStyle(root.querySelector('.salon-step-card')).overflowY,
  titleFontSize: getComputedStyle(root.querySelector('.salon-step-title')).fontSize,
  lineFontSize: getComputedStyle(root.querySelector('.salon-line')).fontSize,
  lineHeight: getComputedStyle(root.querySelector('.salon-line')).lineHeight,
  headPaddingTop: getComputedStyle(root.querySelector('.salon-step-head')).paddingTop,
  contentPaddingTop: getComputedStyle(root.querySelector('.salon-step-content')).paddingTop,
  markedPaddingTop: getComputedStyle(root.querySelector('.salon-line.formula, .salon-line.bracket, .salon-line.step')).paddingTop,
  markedLineTypes: [...new Set([...root.querySelectorAll('.salon-step-card:first-child .salon-line')]
    .map((node) => [...node.classList].find((name) => name !== 'salon-line'))
    .filter(Boolean))],
  accentSamples: [...root.querySelectorAll('.salon-step-card')]
    .slice(0, 3)
    .map((card) => getComputedStyle(card).borderLeftColor)
}));
assert(JSON.stringify(salonScriptStats.buttons) === JSON.stringify(['虽然但是', '角度', '语气']), `沙龙话术三款切换不正确：${salonScriptStats.buttons.join(' / ')}`);
assert(salonScriptStats.fixedHeadCount === 0, '沙龙话术仍显示上方固定标题栏');
assert(salonScriptStats.stepCount === 8, `虽然但是沙龙没有拆成8步：${salonScriptStats.stepCount}`);
assert(salonScriptStats.copyCount === 8, `虽然但是沙龙步骤复制按钮数量不正确：${salonScriptStats.copyCount}`);
assert(salonScriptStats.firstCopyText.includes('第一：邀约') && salonScriptStats.firstCopyText.includes('邀约公式'), '沙龙话术第一步复制内容不完整');
assert(!salonScriptStats.firstCopyText.includes('副标题'), '沙龙话术第一步复制内容仍夹带整篇标题说明');
assert(!salonScriptStats.firstCopyText.includes('顾\n客'), '沙龙话术复制内容仍保留PDF硬断行');
assert(salonScriptStats.markedLineTypes.includes('formula'), '沙龙话术缺少公式重点标注');
assert(salonScriptStats.markedLineTypes.includes('bracket'), '沙龙话术缺少顾客顾虑等括号标注');
assert(!['auto', 'scroll'].includes(salonScriptStats.firstStepOverflowY), `沙龙步骤正文仍存在内部滚动：${salonScriptStats.firstStepOverflowY}`);
assert(salonScriptStats.firstStepMaxHeight === 'none', `沙龙步骤正文仍限制高度：${salonScriptStats.firstStepMaxHeight}`);
assert(salonScriptStats.firstStepCardOverflow === 'visible', `沙龙步骤卡片仍限制溢出：${salonScriptStats.firstStepCardOverflow}`);
assert(Math.abs(parseFloat(salonScriptStats.titleFontSize) - parseFloat(salonScriptStats.lineFontSize)) <= 1.5, `沙龙话术标题和正文不协调：${salonScriptStats.titleFontSize} / ${salonScriptStats.lineFontSize}`);
assert(parseFloat(salonScriptStats.lineHeight) <= 23, `沙龙话术正文行高占位过大：${salonScriptStats.lineHeight}`);
assert(parseFloat(salonScriptStats.headPaddingTop) <= 10, `沙龙话术标题区内边距过大：${salonScriptStats.headPaddingTop}`);
assert(parseFloat(salonScriptStats.contentPaddingTop) <= 10, `沙龙话术正文区内边距过大：${salonScriptStats.contentPaddingTop}`);
assert(parseFloat(salonScriptStats.markedPaddingTop) <= 8, `沙龙话术重点色块内边距过大：${salonScriptStats.markedPaddingTop}`);
assert(new Set(salonScriptStats.accentSamples).size >= 2, '沙龙话术步骤没有做颜色区分');
assert(salonScriptStats.hasBody, '沙龙话术正文没有显示');
await page.locator('#salonScriptTabs button', { hasText: '语气' }).click();
const activeSalonScript = await page.$eval('#salonScripts', (root) => ({
  activeButton: root.querySelector('#salonScriptTabs button.active')?.textContent.trim() || '',
  stepCount: root.querySelectorAll('.salon-step-card').length,
  copyText: root.querySelector('.salon-step-copy')?.dataset.copyText || ''
}));
assert(activeSalonScript.activeButton === '语气', '沙龙话术不能切换到“语气”');
assert(activeSalonScript.stepCount === 8, `语气沙龙没有拆成8步：${activeSalonScript.stepCount}`);
assert(activeSalonScript.copyText.includes('语气沙龙') || activeSalonScript.copyText.includes('第一：邀约'), '语气沙龙复制内容不正确');

for (const target of ['modelCollection', 'abilityFramework', 'abilityThinking', 'abilityTools']) {
  const panelCopyCount = await page.locator(`#${target} > .band-inner > .copy-title-row [data-copy-panel="${target}"]`).count();
  assert(panelCopyCount === 0, `${target} 仍保留整页复制按钮，没有统一成模块级复制`);
}
for (const target of ['abilitySalonReview', 'abilityCamp7Review']) {
  const panelCopyCount = await page.locator(`#${target} > .band-inner > .copy-title-row [data-copy-panel="${target}"]`).count();
  assert(panelCopyCount === 1, `${target} 缺少整块复制按钮`);
}

const questionChecks = [
  { target: 'drivingQuestions', keyword: '叛逆', minCourses: 70 },
  { target: 'mainCourseQuestions', keyword: '疾病', minCourses: 190 },
  { target: 'therapyQuestions', keyword: '减肥', minCourses: 140 }
];

for (const check of questionChecks) {
  await page.locator(`[data-content-target="${check.target}"]`).click();
  await page.waitForTimeout(100);
  const stats = await page.$eval(`#${check.target}`, (root) => ({
    moduleCount: root.querySelectorAll('[data-question-module]').length,
    courseCount: root.querySelectorAll('[data-question-course]').length,
    searchCount: root.querySelectorAll('[data-question-search]').length,
    lineCopyCount: root.querySelectorAll('.question-block [data-copy-text]').length,
    courseCopyCount: root.querySelectorAll('.question-course summary [data-copy-text]').length,
    firstCopyText: root.querySelector('.question-course summary [data-copy-text]')?.dataset.copyText || ''
  }));
  assert(stats.moduleCount >= 1, `${check.target} 没有模块`);
  assert(stats.courseCount >= check.minCourses, `${check.target} 课程数量不足：${stats.courseCount}`);
  assert(stats.searchCount === 1, `${check.target} 搜索框数量不正确`);
  assert(stats.lineCopyCount === 0, `${check.target} 出现行级复制按钮`);
  assert(stats.courseCopyCount === stats.courseCount, `${check.target} 课程级复制按钮数量不正确`);
  assert(stats.firstCopyText.includes('互动问题') && stats.firstCopyText.includes('作业'), `${check.target} 复制内容没有同时包含问句和作业`);

  await page.locator(`#${check.target} [data-question-search]`).fill(check.keyword);
  await page.waitForTimeout(100);
  const searchStats = await page.$eval(`#${check.target}`, (root) => ({
    visibleCourses: [...root.querySelectorAll('[data-question-course]')].filter((course) => !course.hidden).length,
    hiddenCourses: [...root.querySelectorAll('[data-question-course]')].filter((course) => course.hidden).length,
    meta: root.querySelector('[data-question-meta]')?.textContent || ''
  }));
  assert(searchStats.visibleCourses > 0, `${check.target} 搜索关键词没有结果`);
  assert(searchStats.hiddenCourses > 0, `${check.target} 搜索没有过滤课程`);
  assert(searchStats.meta.includes('找到'), `${check.target} 搜索结果提示没有更新`);
  await page.locator(`#${check.target} [data-question-course]:not([hidden]) summary`).first().click();
  const firstOpen = await page.$eval(`#${check.target} [data-question-course]:not([hidden])`, (course) => course.open);
  assert(firstOpen, `${check.target} 点击课程标题没有展开`);
}

await page.locator('[data-content-target="studentGrowthSteps"]').click();
await page.waitForTimeout(100);
const studentGrowth = await page.$eval('#studentGrowthSteps', (root) => ({
  title: root.querySelector('h2')?.textContent.trim() || '',
  stepCount: root.querySelectorAll('.student-growth-card').length,
  copyCount: root.querySelectorAll('.student-growth-copy').length,
  firstCopyText: root.querySelector('.student-growth-copy')?.dataset.copyText || '',
  hasCoreTone: root.textContent.includes('去能力化、百姓化'),
  markedLineTypes: [...new Set([...root.querySelectorAll('.student-growth-card:first-child .salon-line')]
    .map((node) => [...node.classList].find((name) => name !== 'salon-line'))
    .filter(Boolean))],
  firstContentOverflowY: getComputedStyle(root.querySelector('.salon-step-content')).overflowY,
  titleFontSize: getComputedStyle(root.querySelector('.salon-step-title')).fontSize,
  lineFontSize: getComputedStyle(root.querySelector('.salon-line')).fontSize,
  lineHeight: getComputedStyle(root.querySelector('.salon-line')).lineHeight,
  accentSamples: [...root.querySelectorAll('.student-growth-card')]
    .slice(0, 4)
    .map((card) => getComputedStyle(card).borderLeftColor)
}));
assert(studentGrowth.title === '学员成长四步', '学员成长四步标题不正确');
assert(studentGrowth.stepCount === 5, `学员成长四步模块数量不正确：${studentGrowth.stepCount}`);
assert(studentGrowth.copyCount === 5, `学员成长四步复制按钮数量不正确：${studentGrowth.copyCount}`);
assert(studentGrowth.firstCopyText.includes('第一步，激活主动性') && studentGrowth.firstCopyText.includes('核心逻辑是学员参与度决定改变效率'), '学员成长四步第一步复制内容不完整');
assert(studentGrowth.hasCoreTone, '学员成长四步缺少核心底色模块');
assert(studentGrowth.markedLineTypes.includes('formula'), '学员成长四步缺少重点色块标注');
assert(!['auto', 'scroll'].includes(studentGrowth.firstContentOverflowY), `学员成长四步正文仍存在内部滚动：${studentGrowth.firstContentOverflowY}`);
assert(Math.abs(parseFloat(studentGrowth.titleFontSize) - parseFloat(studentGrowth.lineFontSize)) <= 1.5, `学员成长四步标题和正文不协调：${studentGrowth.titleFontSize} / ${studentGrowth.lineFontSize}`);
assert(parseFloat(studentGrowth.lineHeight) <= 23, `学员成长四步正文行高占位过大：${studentGrowth.lineHeight}`);
assert(new Set(studentGrowth.accentSamples).size >= 2, '学员成长四步模块没有颜色区分');

await page.locator('[data-content-target="salonInterviewStandards"]').click();
await page.waitForTimeout(100);
const salonInterview = await page.$eval('#salonInterviewStandards', (root) => ({
  title: root.querySelector('h2')?.textContent.trim() || '',
  moduleCount: root.querySelectorAll('.salon-interview-card').length,
  copyCount: root.querySelectorAll('.salon-interview-copy').length,
  firstCopyText: root.querySelector('.salon-interview-copy')?.dataset.copyText || '',
  hasFormula: root.textContent.includes('抓细节 → 点不容易 → 点价值'),
  hasForbidden: root.textContent.includes('不把采访变成考核、批评或成交'),
  markedLineTypes: [...new Set([...root.querySelectorAll('.salon-interview-card:first-child .salon-line')]
    .map((node) => [...node.classList].find((name) => name !== 'salon-line'))
    .filter(Boolean))],
  firstContentOverflowY: getComputedStyle(root.querySelector('.salon-step-content')).overflowY,
  titleFontSize: getComputedStyle(root.querySelector('.salon-step-title')).fontSize,
  lineFontSize: getComputedStyle(root.querySelector('.salon-line')).fontSize,
  lineHeight: getComputedStyle(root.querySelector('.salon-line')).lineHeight,
  accentSamples: [...root.querySelectorAll('.salon-interview-card')]
    .slice(0, 4)
    .map((card) => getComputedStyle(card).borderLeftColor)
}));
assert(salonInterview.title === '幸福沙龙采访', '幸福沙龙采访标题不正确');
assert(salonInterview.moduleCount === 15, `幸福沙龙采访模块数量不正确：${salonInterview.moduleCount}`);
assert(salonInterview.copyCount === 15, `幸福沙龙采访复制按钮数量不正确：${salonInterview.copyCount}`);
assert(salonInterview.firstCopyText.includes('一、一句话定位') && salonInterview.firstCopyText.includes('被看见、被托举、被赋能'), '幸福沙龙采访第一模块复制内容不完整');
assert(salonInterview.hasFormula, '幸福沙龙采访缺少现场点评公式');
assert(salonInterview.hasForbidden, '幸福沙龙采访缺少采访禁忌内容');
assert(salonInterview.markedLineTypes.includes('formula'), '幸福沙龙采访缺少重点色块标注');
assert(!['auto', 'scroll'].includes(salonInterview.firstContentOverflowY), `幸福沙龙采访正文仍存在内部滚动：${salonInterview.firstContentOverflowY}`);
assert(Math.abs(parseFloat(salonInterview.titleFontSize) - parseFloat(salonInterview.lineFontSize)) <= 1.5, `幸福沙龙采访标题和正文不协调：${salonInterview.titleFontSize} / ${salonInterview.lineFontSize}`);
assert(parseFloat(salonInterview.lineHeight) <= 23, `幸福沙龙采访正文行高占位过大：${salonInterview.lineHeight}`);
assert(new Set(salonInterview.accentSamples).size >= 2, '幸福沙龙采访模块没有颜色区分');

await page.locator('[data-content-target="abilitySalonReview"]').click();
const salonReview = await page.$eval('#abilitySalonReview', (root) => {
  const first = root.querySelector('.mirror-standard-card');
  const style = first ? getComputedStyle(first) : null;
  return {
    count: root.querySelectorAll('.mirror-standard-card').length,
    copyCount: root.querySelectorAll('.review-copy').length,
    panelCopyCount: root.querySelectorAll('[data-copy-panel="abilitySalonReview"]').length,
    hasStepChip: root.querySelectorAll('.step-chip').length > 0,
    firstBackground: style?.backgroundColor || '',
    firstBorderRadius: style?.borderRadius || '',
    panelText: root.textContent || '',
    firstOverflowY: getComputedStyle(root.querySelector('.salon-step-content')).overflowY
  };
});
assert(salonReview.count >= 10, '沙龙复盘清单数量不足');
assert(salonReview.copyCount === 0, '沙龙复盘仍有单条复制按钮');
assert(salonReview.panelCopyCount === 1, '沙龙复盘没有整块复制按钮');
assert(salonReview.panelText.includes('复盘问题 1'), '沙龙复盘内容不完整');
assert(!salonReview.hasStepChip, '沙龙复盘清单仍使用胶囊元素');
assert(salonReview.firstBackground !== 'rgba(0, 0, 0, 0)', `沙龙复盘卡片没有背景：${salonReview.firstBackground}`);
assert(salonReview.firstBorderRadius !== '0px', `沙龙复盘卡片没有圆角：${salonReview.firstBorderRadius}`);
assert(!['auto', 'scroll'].includes(salonReview.firstOverflowY), `沙龙复盘卡片仍存在内部滚动：${salonReview.firstOverflowY}`);

await page.locator('[data-content-target="abilityCamp7Review"]').click();
const campReview = await page.$eval('#abilityCamp7Review', (root) => ({
  count: root.querySelectorAll('.mirror-standard-card').length,
  copyCount: root.querySelectorAll('.camp-review-copy').length,
  panelCopyCount: root.querySelectorAll('[data-copy-panel="abilityCamp7Review"]').length,
  ulCount: root.querySelectorAll('ul li').length,
  panelText: root.textContent || ''
}));
assert(campReview.count >= 7, '7天训练营复盘卡片数量不足');
assert(campReview.copyCount === 0, '7天训练营复盘仍有单条复制按钮');
assert(campReview.panelCopyCount === 1, '7天训练营复盘没有整块复制按钮');
assert(campReview.panelText.includes('复盘问题 1'), '7天训练营复盘内容不完整');
assert(campReview.ulCount === 0, '7天训练营复盘仍使用圆点列表');

await page.locator('[data-content-target="modelCollection"]').click();
const modelCards = await page.$eval('#modelCollection', (root) => ({
  stepCount: root.querySelectorAll('.collection-card').length,
  stepCopyCount: root.querySelectorAll('.model-step-copy').length,
  questionCardCount: root.querySelectorAll('#collectionQuestions .mirror-standard-card').length,
  questionCopyCount: root.querySelectorAll('.model-question-copy').length,
  questionTemplateCopyCount: root.querySelectorAll('#collectionQuestionsCopy[data-copy-text]').length,
  firstStepCopyText: root.querySelector('.model-step-copy')?.dataset.copyText || '',
  questionsCopyText: root.querySelector('#collectionQuestionsCopy')?.dataset.copyText || '',
  gridColumns: getComputedStyle(root.querySelector('#collectionGrid')).gridTemplateColumns
}));
assert(modelCards.stepCount >= 4, '榜样采访步骤卡片数量不足');
assert(modelCards.stepCopyCount === modelCards.stepCount, '榜样采访步骤没有每个模块复制');
assert(modelCards.questionCardCount >= 16, '榜样采访问句卡片数量不足');
assert(modelCards.questionCopyCount === 0, '榜样采访问句模板仍有单问复制按钮');
assert(modelCards.questionTemplateCopyCount === 1, '榜样采访问句模板缺少整块复制按钮');
assert(modelCards.firstStepCopyText.includes('共情') && modelCards.firstStepCopyText.includes('核心目的'), '榜样采访步骤复制内容不完整');
assert(modelCards.questionsCopyText.includes('榜样采访问句模版') && modelCards.questionsCopyText.includes('1. 你当时是带着什么问题来的'), '榜样采访问句模板复制内容不完整');
assert(!modelCards.gridColumns.includes(' '), '榜样采访步骤仍是多列网格，未统一成模块卡片单列');

const mirrorCardChecks = [
  { target: 'abilityFramework', card: '.framework-card', copy: '.mirror-card-copy', min: 7, marker: '一个服务理念' },
  { target: 'abilityThinking', card: '.thinking-card', copy: '.mirror-card-copy', min: 7, marker: '角色共识' },
  { target: 'abilityTools', card: '.tool-card', copy: '.tool-copy', min: 4, marker: '驿站主市场服务123456参考图' }
];

for (const check of mirrorCardChecks) {
  await page.locator(`[data-content-target="${check.target}"]`).click();
  await page.waitForTimeout(100);
  const stats = await page.$eval(`#${check.target}`, (root, check) => ({
    cardCount: root.querySelectorAll(check.card).length,
    copyCount: root.querySelectorAll(check.copy).length,
    lineCopyCount: root.querySelectorAll('.salon-line [data-copy-text]').length,
    firstCopyText: root.querySelector(check.copy)?.dataset.copyText || '',
    firstContentOverflowY: getComputedStyle(root.querySelector('.salon-step-content')).overflowY,
    titleFontSize: getComputedStyle(root.querySelector('.salon-step-title')).fontSize,
    lineFontSize: getComputedStyle(root.querySelector('.salon-line')).fontSize,
    lineHeight: getComputedStyle(root.querySelector('.salon-line')).lineHeight,
    headPaddingTop: getComputedStyle(root.querySelector('.salon-step-head')).paddingTop,
    contentPaddingTop: getComputedStyle(root.querySelector('.salon-step-content')).paddingTop,
    accentSamples: [...root.querySelectorAll(check.card)]
      .slice(0, 4)
      .map((card) => getComputedStyle(card).borderLeftColor)
  }), check);
  assert(stats.cardCount >= check.min, `${check.target} 卡片数量不足：${stats.cardCount}`);
  assert(stats.copyCount === stats.cardCount, `${check.target} 没有做到每个模块一个复制按钮`);
  assert(stats.lineCopyCount === 0, `${check.target} 出现行级复制按钮`);
  assert(stats.firstCopyText.includes(check.marker), `${check.target} 复制内容不完整`);
  assert(!['auto', 'scroll'].includes(stats.firstContentOverflowY), `${check.target} 正文仍存在内部滚动：${stats.firstContentOverflowY}`);
  assert(Math.abs(parseFloat(stats.titleFontSize) - parseFloat(stats.lineFontSize)) <= 1.5, `${check.target} 标题和正文不协调：${stats.titleFontSize} / ${stats.lineFontSize}`);
  assert(parseFloat(stats.lineHeight) <= 23, `${check.target} 正文行高占位过大：${stats.lineHeight}`);
  assert(parseFloat(stats.headPaddingTop) <= 10, `${check.target} 标题区内边距过大：${stats.headPaddingTop}`);
  assert(parseFloat(stats.contentPaddingTop) <= 10, `${check.target} 正文区内边距过大：${stats.contentPaddingTop}`);
  assert(new Set(stats.accentSamples).size >= 2, `${check.target} 模块没有颜色区分`);
}

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
assert(Math.abs(parseFloat(rawSalonStyle.titleFontSize) - parseFloat(rawSalonStyle.lineFontSize)) <= 1, `沙龙模块标题和正文字号差距过大：${rawSalonStyle.titleFontSize} / ${rawSalonStyle.lineFontSize}`);
await page.locator('[data-content-target="rawCamp7"]').click();
const rawCamp7Style = await page.$eval('#rawCamp7 .raw-module-card', (card) => {
  const title = card.querySelector('.raw-module-title');
  const titleStyle = title ? getComputedStyle(title) : null;
  const line = card.querySelector('.raw-line span:last-child');
  const lineStyle = line ? getComputedStyle(line) : null;
  return {
    titleFontSize: titleStyle?.fontSize || '',
    lineFontSize: lineStyle?.fontSize || ''
  };
});
assert(rawCamp7Style.titleFontSize !== rawCamp7Style.lineFontSize, '7天训练营模块标题和正文字号没有区分');
assert(Math.abs(parseFloat(rawCamp7Style.titleFontSize) - parseFloat(rawCamp7Style.lineFontSize)) <= 1, `7天训练营模块标题和正文字号差距过大：${rawCamp7Style.titleFontSize} / ${rawCamp7Style.lineFontSize}`);
await page.locator('[data-content-target="rawSalon"]').click();
const rawSalonCopyStats = await page.$eval('#rawSalon', (root) => {
  const buttons = [...root.querySelectorAll('.raw-module-card [data-copy-text]')];
  const titles = [...root.querySelectorAll('.raw-module-title')].map((node) => node.textContent.trim());
  return {
    total: buttons.length,
    titles,
    noCopyTitles: [...root.querySelectorAll('.raw-module-card')]
      .filter((card) => !card.querySelector('[data-copy-text]'))
      .map((card) => card.querySelector('.raw-module-title')?.textContent.trim() || '')
  };
});
assert(rawSalonCopyStats.total >= 3, '镜子库沙龙可复制原文卡片过少');
assert(!rawSalonCopyStats.titles.includes('⚠️'), '镜子库沙龙仍显示空警告卡片');
assert(rawSalonCopyStats.titles.some((title) => title.includes('注意事项')), '镜子库沙龙误删注意事项卡片');
assert(rawSalonCopyStats.noCopyTitles.some((title) => title.includes('说明')), '截图中的说明卡片复制按钮没有去掉');
assert(rawSalonCopyStats.noCopyTitles.some((title) => title.includes('文字激活邀约公式与案例')), '截图中的文字激活卡片复制按钮没有去掉');
const rawSalonLineCopies = await page.locator('#rawSalon .raw-line [data-copy-text]').count();
assert(rawSalonLineCopies === 0, '镜子库沙龙仍有行级复制按钮');
const salonNotice = await page.$eval('#rawSalon', (root) => {
  const noticeCard = [...root.querySelectorAll('.raw-module-card')]
    .find((card) => card.querySelector('.raw-module-title')?.textContent.includes('注意事项'));
  return {
    lines: noticeCard ? [...noticeCard.querySelectorAll('.raw-line span:last-child')].map((node) => node.textContent.trim()) : [],
    hasTalkPurposeCard: [...root.querySelectorAll('.raw-module-title')]
      .some((node) => node.textContent.includes('讲发心'))
  };
});
assert(JSON.stringify(salonNotice.lines) === JSON.stringify([
  '如果对方没有回应，还是重新回到第一步',
  '激活，连续两次、三次没有激活，今天的沟通暂停。',
  '如时机场合不对，直接暂停。'
]), `沙龙注意事项内容不正确：${salonNotice.lines.join(' / ')}`);
assert(salonNotice.hasTalkPurposeCard, '沙龙讲发心内容没有独立成模块');

for (const target of ['rawCamp7', 'rawTalent', 'rawOther']) {
  await page.locator(`[data-content-target="${target}"]`).click();
  await page.waitForTimeout(100);
  const wrapperTitles = await page.$eval(`#${target}`, (root) => {
    const forbidden = ['7天幸福训练营', '幸福早课人才培养营', '幸福学院市场培训手册'];
    return [...root.querySelectorAll('.raw-module-card')]
      .flatMap((card) => {
        const title = card.querySelector('.raw-module-title')?.textContent.trim() || '';
        const firstLine = card.querySelector('.raw-line span:last-child')?.textContent.trim() || '';
        return [title, firstLine];
      })
      .filter((text) => (
        forbidden.some((item) => text === item || text.startsWith(`${item}（`)) ||
        /^0[）)]$/.test(text) ||
        text === '我不相信人，我只相信流程。'
      ));
  });
  assert(wrapperTitles.length === 0, `${target} 仍显示原文外壳标题：${wrapperTitles.join(' / ')}`);
  const moduleCount = await page.locator(`#${target} .raw-module-card`).count();
  const copyStats = await page.$eval(`#${target}`, (root) => {
    const buttons = [...root.querySelectorAll('.raw-module-card > .raw-module-head [data-copy-text]')];
    return {
      total: buttons.length,
      noCopyTitles: [...root.querySelectorAll('.raw-module-card')]
        .filter((card) => !card.querySelector('[data-copy-text]'))
        .map((card) => card.querySelector('.raw-module-title')?.textContent.trim() || ''),
      hasCloseModule: [...root.querySelectorAll('.raw-module-card')]
        .some((card) => card.textContent.includes('发心心愿拔高') && card.textContent.includes('流程复制要求'))
    };
  });
  const lineCopyCount = await page.locator(`#${target} .raw-line [data-copy-text]`).count();
  assert(copyStats.total >= 1, `${target} 缺少可见原文卡片复制按钮`);
  assert(lineCopyCount === 0, `${target} 仍有行级复制按钮`);
  if (target === 'rawCamp7') {
    assert(moduleCount <= 25, `7天训练营模块拆分过细：${moduleCount}`);
    assert(copyStats.noCopyTitles.some((title) => title.includes('说明')), '7天训练营说明卡片复制按钮没有去掉');
    assert(copyStats.noCopyTitles.some((title) => title.includes('请附上实战截图')), '7天训练营截图提示卡片复制按钮没有去掉');
    assert(copyStats.hasCloseModule, '7天训练营闭营分享要求没有单独成模块');
  }
}

await page.locator('[data-content-target="abilityThinking"]').click();
const thinking = await page.$eval('#abilityThinking', (root) => ({
  numbers: [...root.querySelectorAll('.thinking-card .salon-step-index')].map((node) => node.textContent.trim())
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
