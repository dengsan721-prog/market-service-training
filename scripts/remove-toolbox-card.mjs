import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const match = html.match(/<script type="application\/json" id="manualData">([\s\S]*?)<\/script>/);
if (!match) throw new Error('manualData is missing');

const manual = JSON.parse(match[1]);
const original = manual.toolbox || [];
const next = original.filter((tool) => tool.title !== '幸福驿站市场服务模型');
if (next.length === original.length) throw new Error('幸福驿站市场服务模型卡片不存在');
manual.toolbox = next;

const replacement = `<script type="application/json" id="manualData">${JSON.stringify(manual).replace(/</g, '\\u003c')}</script>`;
fs.writeFileSync(indexPath, html.replace(match[0], replacement), 'utf8');
console.log('Removed toolbox card: 幸福驿站市场服务模型');
