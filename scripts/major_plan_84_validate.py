# -*- coding: utf-8 -*-
from __future__ import annotations

from pathlib import Path
import shutil

import fitz

ROOT_DIR = Path(r"C:\Users\SJLEE\Downloads\GPT")
REF_DIR = Path(r"C:\Users\SJLEE\Desktop\006_영업자료\주요업무계획")
TEMP_DIR = ROOT_DIR / "_임시수집"
REVIEW_DIR = ROOT_DIR / "검증필요"
LOG_DIR = ROOT_DIR / "작업로그"
SUMMARY_PATH = LOG_DIR / "2026_주요업무계획_84검증_요약.txt"

EXCLUDE_TERMS = [
    "보도자료",
    "회의록",
    "계약",
    "공문",
    "예산서",
    "인증서",
    "홍보",
    "행사",
    "자살예방",
    "인사위원회",
    "생활임금",
    "포스터",
    "공모",
    "채용",
]


def ensure_dirs() -> None:
    ROOT_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    LOG_DIR.mkdir(parents=True, exist_ok=True)


def extract_municipality(name: str) -> str | None:
    if "_2026_" not in name:
        return None
    left = name.split("_2026_", 1)[0]
    if len(left) >= 4 and left[:3].isdigit() and "_" in left:
        return left.split("_", 1)[1].strip()
    return left.strip()


def assigned_numbers() -> dict[str, int]:
    mapping: dict[str, int] = {}
    for base_dir in [REF_DIR, ROOT_DIR]:
        if not base_dir.exists():
            continue
        for path in base_dir.glob("*.pdf"):
            if len(path.name) < 4 or not path.name[:3].isdigit() or "_2026_" not in path.name:
                continue
            municipality = extract_municipality(path.name)
            if municipality:
                mapping[municipality] = int(path.name[:3])
    return mapping


def next_verified_index(mapping: dict[str, int]) -> int:
    return (max(mapping.values()) + 1) if mapping else 1


def pdf_info(pdf_path: Path) -> dict:
    doc = fitz.open(pdf_path)
    page_count = doc.page_count
    sample_parts = []
    for idx in range(min(page_count, 5)):
        text = " ".join(doc.load_page(idx).get_text("text").split())
        if text:
            sample_parts.append(text[:800])
    doc.close()
    return {"page_count": page_count, "sample": " ".join(sample_parts)}


def is_verified_pdf(pdf_path: Path) -> tuple[bool, str]:
    try:
        info = pdf_info(pdf_path)
    except Exception as exc:
        return False, f"PDF 분석 실패: {exc}"

    sample = info["sample"]
    page_count = info["page_count"]

    if page_count < 10:
        return False, f"페이지 수 부족 ({page_count})"
    if any(term in sample for term in EXCLUDE_TERMS):
        return False, "제외 키워드 포함"
    if not all(term in sample for term in ["2026", "주요업무"]):
        return False, "핵심 키워드 부족"
    if not any(term in sample for term in ["업무계획", "추진계획"]):
        return False, "계획 키워드 부족"
    return True, f"검증 통과 ({page_count}페이지)"


def canonical_verified_name(number: int, municipality: str, variant_index: int | None) -> str:
    suffix = f"-{variant_index}" if variant_index is not None else ""
    return f"{number:03d}_{municipality}_2026_주요업무계획{suffix}.pdf"


def move_to_review(path: Path, reason: str, lines: list[str]) -> None:
    destination = REVIEW_DIR / path.name
    if destination.exists():
        destination.unlink()
    shutil.move(str(path), str(destination))
    lines.append(f"[검증필요] {path.name}")
    lines.append(f"- 사유: {reason}")
    lines.append(f"- 이동: {destination}")
    lines.append("")


def move_to_verified(path: Path, destination_name: str, reason: str, lines: list[str]) -> None:
    destination = ROOT_DIR / destination_name
    if destination.exists():
        destination.unlink()
    shutil.move(str(path), str(destination))
    lines.append(f"[검증통과] {path.name}")
    lines.append(f"- 사유: {reason}")
    lines.append(f"- 이동: {destination}")
    lines.append("")


def main() -> None:
    ensure_dirs()
    lines: list[str] = []
    lines.append("2026 주요업무계획 84개 대상 검증 결과")
    lines.append("")

    mapping = assigned_numbers()
    next_index = next_verified_index(mapping)
    temp_files = sorted(TEMP_DIR.iterdir()) if TEMP_DIR.exists() else []
    verified_items: list[tuple[Path, str, str]] = []
    review_items: list[tuple[Path, str]] = []

    for path in temp_files:
        if not path.is_file():
            continue
        if path.suffix.lower() == ".pdf":
            verified, reason = is_verified_pdf(path)
            if verified:
                municipality = extract_municipality(path.name)
                if municipality:
                    verified_items.append((path, municipality, reason))
                else:
                    review_items.append((path, "지자체명 추출 실패"))
            else:
                review_items.append((path, reason))
            continue
        review_items.append((path, "PDF가 아니므로 수동 확인 필요"))

    grouped: dict[str, list[tuple[Path, str]]] = {}
    for path, municipality, reason in verified_items:
        grouped.setdefault(municipality, []).append((path, reason))

    for municipality in sorted(grouped.keys()):
        if municipality not in mapping:
            mapping[municipality] = next_index
            next_index += 1
        number = mapping[municipality]
        items = grouped[municipality]
        use_variant = len(items) > 1
        for idx, (path, reason) in enumerate(items, start=1):
            destination_name = canonical_verified_name(number, municipality, idx if use_variant else None)
            move_to_verified(path, destination_name, reason, lines)

    for path, reason in review_items:
        move_to_review(path, reason, lines)

    SUMMARY_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(str(SUMMARY_PATH))


if __name__ == "__main__":
    main()
