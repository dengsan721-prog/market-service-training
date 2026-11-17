import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


NAMESPACE = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
STYLE_KEY = '{%s}val' % NAMESPACE['w']


def paragraph_text(paragraph):
    text = ''.join(node.text or '' for node in paragraph.findall('.//w:t', NAMESPACE))
    return text.replace('\u00a0', ' ').replace('\u2028', '\n').strip()


def paragraph_style(paragraph):
    style = paragraph.find('./w:pPr/w:pStyle', NAMESPACE)
    return style.get(STYLE_KEY, '') if style is not None else ''


def parse_item_title(text):
    match = re.match(r'^第\s*([0-9]+)\s*条\s*[：:]?\s*(.*)$', text)
    if not match:
        return '', text
    return match.group(1), match.group(2).strip()


def parse_docx(source):
    with zipfile.ZipFile(source) as archive:
        root = ET.fromstring(archive.read('word/document.xml'))

    categories = []
    current_category = None
    current_item = None

    for paragraph in root.findall('.//w:body/w:p', NAMESPACE):
        text = paragraph_text(paragraph)
        if not text:
            continue
        style = paragraph_style(paragraph)

        if style == '2':
            match = re.search(r'【([^】]+)】', text)
            if not match:
                continue
            current_category = {
                'title': match.group(1),
                'items': []
            }
            categories.append(current_category)
            current_item = None
            continue

        if current_category is None or style == '3':
            continue

        if style == '4':
            order, title = parse_item_title(text)
            current_item = {
                'order': order,
                'title': title,
                'lines': []
            }
            current_category['items'].append(current_item)
            continue

        if current_item is not None:
            current_item['lines'].append(text)

    return {
        'title': '六类一分钟合集',
        'description': '按事业心态、夫妻相处、亲子关系、人际关系、身体健康、市场服务六类整理一分钟学习内容。支持目录筛选、关键词搜索，以及单条标题和正文复制。',
        'itemCount': sum(len(category['items']) for category in categories),
        'categories': categories
    }


def main():
    if len(sys.argv) != 3:
        raise SystemExit('用法：python import-six-one-minute-collection.py <docx> <json>')
    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    data = parse_docx(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"导入 {data['itemCount']} 条，{len(data['categories'])} 类：{', '.join(item['title'] for item in data['categories'])}")


if __name__ == '__main__':
    main()
