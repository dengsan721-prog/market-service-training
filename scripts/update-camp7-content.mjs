import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = process.argv[2] || path.join(root, 'data', 'camp7-course.txt');
const course = fs.readFileSync(source, 'utf8').replace(/\r\n?/g, '\n').trim();
const dayHeadings = course.match(/^🌲.+$/gm) || [];
if (dayHeadings.length !== 8) throw new Error('Expected opening ceremony and seven training days');

const pagePath = path.join(root, 'index.html');
const html = fs.readFileSync(pagePath, 'utf8');
const pattern = /(<script type="application\/json" id="manualData">)([\s\S]*?)(<\/script>)/;
const match = html.match(pattern);
if (!match) throw new Error('manualData not found');

const manual = JSON.parse(match[2]);
const camp = manual.rawMirrorSources.find((item) => item.id === 'rawCamp7');
const boundary = camp?.content.search(/(?:🌲)?《7幸福训练营》复制标准流程/);
if (boundary == null || boundary < 0) throw new Error('Existing camp curriculum boundary not found');

const standards = camp.content.slice(0, boundary).trimEnd();
camp.content = standards + '\n\n' + course;
camp.images = [
  { src: 'assets/camp7-essay.jpg', alt: '开营案例作文：孤独的我' },
  { src: 'assets/camp7-review-example.jpg', alt: '第3天点评案例：女儿的孝顺' }
];

const partner = manual.masterFlow.find((stage) => stage.number === '05' && stage.title === '合作伙伴');
if (!partner) throw new Error('合作伙伴 stage not found');
partner.image = { src: 'assets/station-master-interview.png', alt: '驿站主面试流程' };

for (const image of [...camp.images, partner.image]) {
  if (!fs.existsSync(path.join(root, image.src))) throw new Error(`Missing image: ${image.src}`);
}

const updatedJson = JSON.stringify(manual).replace(/</g, '\\u003c');
const updatedHtml = html.replace(pattern, () => match[1] + updatedJson + match[3]);
fs.writeFileSync(pagePath, updatedHtml);
console.log(`Updated rawCamp7: ${dayHeadings.length} course sections; partner interview image metadata added.`);
