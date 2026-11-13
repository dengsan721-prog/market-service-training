import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

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

const partner = manual.masterFlow?.find((stage) => stage.number === '05' && stage.title === '成为驿站主');
if (!partner?.image || partner.image.src !== 'assets/station-master-interview.png') {
  throw new Error('Partner interview image metadata is missing');
}
const imageStages = (manual.masterFlow || []).filter((stage) => stage.image);
if (imageStages.length !== 1 || imageStages[0].number !== '05') {
  throw new Error('Partner interview image must exist only on stage 05');
}

for (const asset of [...expectedCampImages, partner.image.src]) {
  if (!fs.existsSync(path.join(root, asset))) throw new Error(`Missing asset: ${asset}`);
}

if (!html.includes('function renderStageImage') || !html.includes('stage-block stage-image')) {
  throw new Error('Partner interview image renderer is missing');
}
if (!html.includes('aria-label="查看原图：') || !html.includes('stage-image-help')) {
  throw new Error('Partner interview image needs an accessible original-image label');
}
if (!html.includes('function renderRawBlockLines(lines, nextImage') || !html.includes('class="training-image"')) {
  throw new Error('Camp image placeholders are not rendered as training images');
}
if (!html.includes('renderRawBlockLines(displayLines, nextImage)')) {
  throw new Error('Camp image renderer is not connected to raw mirror panels');
}
if (!html.includes('.stage-image-link img') || !html.includes('max-width: 100%')) {
  throw new Error('Partner image responsive CSS is missing');
}

const baseline = (() => {
  try {
    return execFileSync('git', ['show', 'HEAD:index.html'], { cwd: root, encoding: 'utf8' });
  } catch {
    return '';
  }
})();
if (baseline) {
  const baselineMatch = baseline.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
  if (baselineMatch) {
    const baselineManual = JSON.parse(baselineMatch[1]);
    for (const id of ['rawSalon', 'rawTalent', 'rawOther']) {
      const currentContent = manual.rawMirrorSources.find((item) => item.id === id)?.content;
      const baselineContent = baselineManual.rawMirrorSources.find((item) => item.id === id)?.content;
      if (currentContent !== baselineContent) throw new Error(`${id} changed outside the camp update`);
    }
  }
}

console.log('PASS: 7-day camp content and partner interview image are present.');
