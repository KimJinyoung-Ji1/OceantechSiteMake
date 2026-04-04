# -*- coding: utf-8 -*-
from __future__ import annotations

from pathlib import Path
import re

ROOT_DIR = Path(r"C:\Users\SJLEE\Downloads\GPT")
LOG_DIR = ROOT_DIR / "작업로그"
OUTPUT_PATH = LOG_DIR / "주요업무계획_특이사항_종합.txt"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig", errors="replace")


def parse_log(path: Path) -> list[dict]:
    text = read_text(path)
    lines = text.splitlines()
    items: list[dict] = []
    current: dict | None = None

    header_re = re.compile(r"^\[(.+?)\]\s+(.+)$")

    for raw_line in lines:
        line = raw_line.strip()
        match = header_re.match(line)
        if match:
            if current:
                items.append(current)
            current = {
                "status": match.group(1),
                "name": match.group(2),
                "home": "",
                "note": "",
                "paths": [],
            }
            continue

        if not current:
            continue

        if line.startswith("- "):
            current["paths"].append(line[2:].strip())
            continue

        if "홈페이지" in line or "?덊럹?댁?" in line:
            current["home"] = line.split(":", 1)[-1].strip()
            continue

        if "비고" in line or "鍮꾧퀬" in line:
            current["note"] = line.split(":", 1)[-1].strip()

    if current:
        items.append(current)

    return items


def is_success(item: dict) -> bool:
    status = item.get("status", "")
    return ("성공" in status) or ("?깃났" in status) or bool(item.get("paths"))


def main() -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    items: list[dict] = []

    for path in sorted(LOG_DIR.glob("*.txt")):
        if path.name == OUTPUT_PATH.name:
            continue
        items.extend(parse_log(path))

    lines: list[str] = []
    lines.append("주요업무계획 특이사항 종합")
    lines.append("")
    lines.append("원칙")
    lines.append("- 2026 주요업무계획이 확인되지 않으면 2025 자료로 대체 저장하지 않음")
    lines.append("- 미확인 지자체는 추후 게시 가능성이 있으므로 재확인 대상으로 관리")
    lines.append("")

    seen = set()
    for item in items:
        name = item.get("name", "").strip()
        if not name or name in seen or is_success(item):
            continue
        seen.add(name)
        lines.append(f"[미확인] {name}")
        if item.get("home"):
            lines.append(f"- 홈페이지: {item['home']}")
        if item.get("note"):
            lines.append(f"- 현재상태: {item['note']}")
        lines.append("- 특이사항: 현재 2026 주요업무계획 문서 미확인. 4월 이후 게시 가능성 포함하여 재확인 필요")
        lines.append("- 처리원칙: 2025 자료로 대체 저장하지 않음")
        lines.append("")

    if len(lines) == 6:
        lines.append("현재 추가 특이사항 없음")

    OUTPUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(str(OUTPUT_PATH))


if __name__ == "__main__":
    main()
