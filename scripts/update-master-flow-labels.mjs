import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const match = html.match(/(<script type="application\/json" id="manualData">)([\s\S]*?)(<\/script>)/);
if (!match) throw new Error('manualData not found');
const manual = JSON.parse(match[2]);
const labels = { '04': '《幸福驾校》', '05': '成为驿站主' };
for (const stage of manual.masterFlow || []) {
  if (labels[stage.number]) stage.title = labels[stage.number];
}
const serialized = JSON.stringify(manual).replace(/</g, '\\u003c');
fs.writeFileSync(htmlPath, html.replace(match[0], match[1] + serialized + match[3]));
console.log('Updated master flow labels: 04 《幸福驾校》, 05 成为驿站主');
