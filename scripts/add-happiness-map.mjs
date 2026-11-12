import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const match = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!match) throw new Error('manualData is missing');

const manual = JSON.parse(match[1]);
const happinessMap = {
  number: '00',
  title: '幸福地图',
  tag: '从哪里来到哪里去',
  goal: '用 5 张原图看清幸福驿站从需求者、学员到驿站主的完整行动路径。',
  process: [],
  standards: [],
  script: [],
  review: [],
  source: '幸福地图原图：点击图片查看完整原图，标题右侧按钮可复制原图地址。',
  images: [
    { src: 'assets/happiness-map-01.png', alt: '幸福地图总览：来人先承接与免费幸福沙龙' },
    { src: 'assets/happiness-map-02.png', alt: '幸福地图：驿站主的行动从哪里到哪里' },
    { src: 'assets/happiness-map-03.png', alt: '幸福地图：驿站主的六步成长路径' },
    { src: 'assets/happiness-map-04.png', alt: '幸福地图：学员的行动从哪里到哪里' },
    { src: 'assets/happiness-map-05.png', alt: '幸福地图：并行路线' }
  ]
};

manual.masterFlow = [happinessMap, ...(manual.masterFlow || []).filter((stage) => stage.number !== '00' && stage.title !== '幸福地图')];
const replacement = `<script type="application/json" id="manualData">${JSON.stringify(manual).replace(/</g, '\\u003c')}</script>`;
fs.writeFileSync(indexPath, html.replace(match[0], replacement), 'utf8');
console.log('Added master-flow module: 幸福地图');
