import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const htmlPath = path.join(root, 'index.html');
const dataPath = path.join(root, 'data', 'happiness-family-answer-bank.json');
const html = fs.readFileSync(htmlPath, 'utf8');
const match = html.match(/(<script type="application\/json" id="manualData">)([\s\S]*?)(<\/script>)/);
if (!match) throw new Error('manualData not found');
const manual = JSON.parse(match[2]);
manual.happinessFamilyAnswerBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const serialized = JSON.stringify(manual).replace(/</g, '\\u003c');
fs.writeFileSync(htmlPath, html.replace(match[0], match[1] + serialized + match[3]));
console.log(`Embedded ${manual.happinessFamilyAnswerBank.itemCount} happiness family answers.`);
