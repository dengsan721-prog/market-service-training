import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const match = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!match) throw new Error('manualData is missing');

const manual = JSON.parse(match[1]);
const first = manual.masterFlow?.[0];
if (!first || first.number !== '00' || first.title !== '幸福地图') throw new Error('幸福地图没有位于大流程第一模块');
if (!Array.isArray(first.images) || first.images.length !== 4) throw new Error('幸福地图图片数量不是 4 张');
for (const image of first.images) {
  if (!image.src || !image.alt) throw new Error('幸福地图图片缺少原图路径或说明');
  if (!fs.existsSync(path.join(root, image.src))) throw new Error(`缺少幸福地图原图：${image.src}`);
}
if (!html.includes('function renderStageImages') || !html.includes('stage-image-gallery')) {
  throw new Error('幸福地图原图渲染器缺失');
}
if (!html.includes('compactCopyButton(copyText)')) throw new Error('幸福地图缺少原图地址复制按钮');

console.log('PASS: happiness map is the first master-flow module with four original images.');
