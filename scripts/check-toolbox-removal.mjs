import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const match = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!match) throw new Error('manualData is missing');

const manual = JSON.parse(match[1]);
const titles = (manual.toolbox || []).map((tool) => tool.title);
if (titles.includes('幸福驿站市场服务模型')) {
  throw new Error('幸福驿站市场服务模型卡片仍在镜子库工具箱中');
}
if ((manual.toolbox || []).some((tool) => tool.image === 'assets/market-service-model.png')) {
  throw new Error('市场服务模型图片仍被工具箱卡片引用');
}

const buildSource = fs.readFileSync(path.join(root, 'scripts', 'build-page.mjs'), 'utf8');
const toolboxSource = buildSource.slice(buildSource.indexOf('const toolbox = ['), buildSource.indexOf('const camp7Review = ['));
if (toolboxSource.includes('幸福驿站市场服务模型') || toolboxSource.includes('assets/market-service-model.png')) {
  throw new Error('build-page.mjs 仍会生成已删除的工具箱卡片');
}

console.log('PASS: market service model toolbox card is removed.');
