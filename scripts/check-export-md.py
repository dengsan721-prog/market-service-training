import sys
from pathlib import Path


def main():
    path = Path(sys.argv[1])
    if not path.exists():
        raise SystemExit(f"Missing Markdown: {path}")
    text = path.read_text(encoding="utf-8")
    required = [
        "# 幸福学院市场服务手册",
        "# 大流程｜从陌生人到合作伙伴",
        "## 01. 来人先承接",
        "## 02. 免费幸福沙龙",
        "## 03. 7天幸福训练营",
        "# 镜子库｜用流程标准照镜子",
        "## 沙龙复盘",
        "## 7天训练营复盘",
        "## 榜样采访",
        "## 市场服务",
        "## 总监思维",
        "# 原文模块",
        "## 沙龙模块",
        "## 7天训练营模块",
        "## 幸福早课人才培养营模块",
        "## 榜样选拔与教练招募",
    ]
    forbidden_lines = {
        "0）",
        "7天幸福训练营",
        "幸福早课人才培养营",
        "幸福学院市场培训手册（1.0）",
    }
    missing = [item for item in required if item not in text]
    forbidden = [
        line.strip()
        for line in text.splitlines()
        if line.strip() in forbidden_lines
    ]
    if missing or forbidden:
        if missing:
            print("Missing:")
            print("\n".join(missing))
        if forbidden:
            print("Forbidden wrapper lines:")
            print("\n".join(forbidden))
        raise SystemExit(1)
    print(f"export markdown check passed: {path}")


if __name__ == "__main__":
    main()
