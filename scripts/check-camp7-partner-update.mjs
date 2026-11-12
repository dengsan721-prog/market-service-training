import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const match = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!match) throw new Error('manualData not found');

const manual = JSON.parse(match[1]);
const camp = manual.rawMirrorSources?.find((item) => item.id === 'rawCamp7');
if (!camp) throw new Error('rawCamp7 not found');

const expectedHeadingPrefixes = [
  '🌲《7幸福训练营》复制标准流程第1天',
  '🌲正式学习训练第1天',
  '🌲正式训练第2天',
  '🌲正式学习训练第3天',
  '🌲正式学习第4天',
  '🌲正式训练第5天',
  '🌲正式学习第6天',
  '🌲正式学习第7天'
];
const missingHeadings = expectedHeadingPrefixes.filter((heading) => !camp.content.includes(heading));
if (missingHeadings.length) throw new Error(`Missing camp headings: ${missingHeadings.join(', ')}`);

const expectedCampImages = ['assets/camp7-essay.jpg', 'assets/camp7-review-example.jpg'];
const campImages = (camp.images || []).map((image) => image.src);
const missingCampImages = expectedCampImages.filter((src) => !campImages.includes(src));
if (missingCampImages.length) throw new Error(`Missing camp images: ${missingCampImages.join(', ')}`);

const partner = manual.masterFlow?.find((stage) => stage.number === '05' && stage.title === '合作伙伴');
if (!partner?.image || partner.image.src !== 'assets/station-master-interview.png') {
  throw new Error('Partner interview image metadata is missing');
}

for (const asset of [...expectedCampImages, partner.image.src]) {
  if (!fs.existsSync(path.join(root, asset))) throw new Error(`Missing asset: ${asset}`);
}

if (!html.includes('function renderStageImage') || !html.includes('stage-block stage-image')) {
  throw new Error('Partner interview image renderer is missing');
}

console.log('PASS: 7-day camp content and partner interview image are present.');
