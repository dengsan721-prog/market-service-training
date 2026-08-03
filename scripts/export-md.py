import html
import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = REPO_ROOT / "index.html"
DEFAULT_OUTPUT = REPO_ROOT / "exports" / "market-service-manual.md"


def read_manual_data():
    text = INDEX_HTML.read_text(encoding="utf-8")
    match = re.search(
        r'<script type="application/json" id="manualData">(.*?)</script>',
        text,
        flags=re.S,
    )
    if not match:
        raise RuntimeError("Cannot find manualData in index.html")
    return json.loads(html.unescape(match.group(1)))


def line(text=""):
    return str(text or "").strip()


def add_numbered(out, items):
    for index, item in enumerate(items or [], start=1):
        out.append(f"{index}. {line(item)}")
    out.append("")


def add_plain_lines(out, lines):
    for item in lines or []:
        text = line(item)
        if text:
            out.append(text)
    out.append("")


def split_display_lines(text):
    result = []
    for raw in str(text or "").replace("\u00a0", " ").splitlines():
        raw = raw.strip()
        if raw:
            result.append(raw)
    return result


def is_wrapper_line(text, title):
    text = line(text)
    bare = re.sub(r"^[0-9]{1,2}[.、）)]\s*", "", text).rstrip("：:").strip()
    wrapper_titles = {
        title,
        title.replace("模块", ""),
        "7天幸福训练营",
        "幸福早课人才培养营",
        "幸福学院市场培训手册",
        "幸福学院市场培训手册（1.0）",
        "我不相信人，我只相信流程。",
        "0）",
        "0)",
    }
    return any(text == item or bare == item or bare.startswith(item + "（") for item in wrapper_titles)


def add_stage(out, stage):
    out.append(f'## {stage.get("number", "")}. {stage.get("title", "")}')
    out.append("")
    if stage.get("tag"):
        out.append(f'**入口/定位：** {stage["tag"]}')
    if stage.get("goal"):
        out.append(f'**目标：** {stage["goal"]}')
    if stage.get("source"):
        out.append(f'**查找来源：** {stage["source"]}')
    out.append("")

    sections = [
        ("流程步骤", stage.get("process")),
        ("执行标准", stage.get("standards")),
        ("话术原文", stage.get("script")),
        ("复盘问题", stage.get("review")),
    ]
    for heading, items in sections:
        if not items:
            continue
        out.append(f"### {heading}")
        if heading in {"流程步骤", "执行标准", "复盘问题"}:
            add_numbered(out, items)
        else:
            add_plain_lines(out, items)

    if stage.get("original"):
        out.append("### 标准原文")
        add_plain_lines(out, stage["original"])


def export_markdown(data):
    out = [
        "# 幸福学院市场服务手册",
        "",
        "我不相信人，我只相信流程。",
        "",
        "> 修改说明：这个 Markdown 是软件文字源稿。请尽量保留标题层级和模块名称，直接修改标题下方的正文、标准、话术和原文内容。你修改好后，我可以按这个文档回填软件页面文字。",
        "",
        "---",
        "",
        "# 大流程｜从陌生人到合作伙伴",
        "",
    ]

    for stage in data.get("masterFlow", []):
        add_stage(out, stage)

    out.extend(["---", "", "# 镜子库｜用流程标准照镜子", ""])

    out.extend(["## 沙龙复盘", ""])
    add_numbered(out, data.get("salonReview", []))

    out.extend(["## 7天训练营复盘", ""])
    add_numbered(out, [
        "学员是不是从沙龙或者转介绍筛选来的？有没有跳过筛选？",
        "是不是一个教练带2个顾客？有没有混营？",
        "每天课程之前有没有通关？教练是否掌握正确标准？",
        "学员有没有全程开视频、提前进会议室、按要求参与？",
        "作业有没有按时提交？是否具体到对象、场景、原话、反馈和心情？",
        "不配合、不按要求实践的学员有没有按标准处理？",
        "沙龙和7天训练营搜集来的榜样，是否统一进入一个大群，等待被采访？",
    ])

    collection = data.get("modelCollection", {})
    out.extend(["## 榜样采访", ""])
    for index, step in enumerate(collection.get("steps", []), start=1):
        out.append(f'### {index}. {step.get("title", "")}')
        out.append("")
        add_plain_lines(out, [step.get("body", "")])
        if step.get("purpose"):
            out.append(f'**核心目的：** {step["purpose"]}')
            out.append("")
    out.extend(["### 榜样采访问句模板", ""])
    add_numbered(out, collection.get("questions", []))

    out.extend(["## 市场服务", ""])
    for item in data.get("serviceFramework", []):
        out.append(f'### {item.get("number", "")}. {item.get("title", "")}')
        out.append("")
        add_plain_lines(out, [item.get("body", "")])

    out.extend(["## 总监思维", ""])
    for index, item in enumerate(data.get("directorThinking", []), start=1):
        out.append(f'### {index}. {item.get("title", "")}')
        out.append("")
        add_plain_lines(out, [item.get("body", "")])

    out.extend(["---", "", "# 原文模块", ""])
    for source in data.get("rawMirrorSources", []):
        title = source.get("title", "")
        out.append(f"## {title}")
        out.append("")
        lines = [item for item in split_display_lines(source.get("content", "")) if not is_wrapper_line(item, title)]
        add_plain_lines(out, lines)

    return "\n".join(out).rstrip() + "\n"


def main():
    output = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUTPUT
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(export_markdown(read_manual_data()), encoding="utf-8")
    print(output)


if __name__ == "__main__":
    main()
