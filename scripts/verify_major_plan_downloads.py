# -*- coding: utf-8 -*-
import sys
import shutil
from pathlib import Path

import fitz

sys.path.insert(0, r"C:\Dev\gov-sales-intel\parsers")
from budget_parser import parse_budget_page  # type: ignore

BASE_DIR = Path(r"C:\Users\SJLEE\Downloads\GPT")
VERIFIED_DIR = BASE_DIR / "검증통과_사용자확인완료"
REVIEW_DIR = BASE_DIR / "재검토필요"
REPORT_PATH = BASE_DIR / "현재산출물_파서검토_및_사용자확정기준.txt"

INCLUDE_KEYWORDS = [
    "주요업무",
    "업무계획",
    "추진계획",
    "시행계획",
]

EXCLUDE_KEYWORDS = [
    "보도자료",
    "사진",
    "회의록",
    "검색결과",
    "인증서",
    "재정공시",
    "조례",
    "알림",
    "시정뉴스",
    "공고",
    "원문 다운로드",
    "다운로드 화면",
]


def extract_pdf_info(pdf_path: Path) -> dict:
    info = {
        "page_count": 0,
        "sample_text": "",
        "budget_items": 0,
        "has_include": False,
        "has_exclude": False,
    }
    try:
        doc = fitz.open(pdf_path)
        info["page_count"] = doc.page_count
        samples = []
        budget_items = 0
        for i in range(min(doc.page_count, 8)):
            text = doc[i].get_text("text") or ""
            if text:
                cleaned = " ".join(text.split())
                if cleaned:
                    samples.append(cleaned[:600])
                budget_items += len(parse_budget_page(text, i + 1, pdf_path.stem, pdf_path.name))
        doc.close()
        sample_text = " ".join(samples)[:2000]
        info["sample_text"] = sample_text
        info["budget_items"] = budget_items
        info["has_include"] = any(k in sample_text for k in INCLUDE_KEYWORDS)
        info["has_exclude"] = any(k in sample_text for k in EXCLUDE_KEYWORDS)
    except Exception as e:
        info["sample_text"] = f"[PDF 분석 오류] {type(e).__name__}: {e}"
    return info


def classify_file(path: Path) -> dict:
    result = {
        "name": path.name,
        "status": "재검토",
        "reason": "",
        "page_count": "-",
        "budget_items": "-",
        "sample_text": "",
    }

    if path.name.startswith("1") and path.suffix.lower() == ".pdf":
        info = extract_pdf_info(path)
        result.update(
            {
                "status": "합격",
                "reason": "사용자 확인 완료 파일",
                "page_count": info["page_count"],
                "budget_items": info["budget_items"],
                "sample_text": info["sample_text"][:300],
            }
        )
        return result

    if path.suffix.lower() != ".pdf":
        result["reason"] = "PDF 아님"
        return result

    info = extract_pdf_info(path)
    result["page_count"] = info["page_count"]
    result["budget_items"] = info["budget_items"]
    result["sample_text"] = info["sample_text"][:300]

    if info["page_count"] < 10:
        result["reason"] = "10페이지 미만"
    elif info["has_exclude"]:
        result["reason"] = "제외 키워드 포함"
    elif not info["has_include"] and info["budget_items"] < 20:
        result["reason"] = "업무계획/예산서 근거 부족"
    else:
        result["reason"] = "자동 판정상 후보이나 사용자 미확정"
    return result


def ensure_dirs():
    VERIFIED_DIR.mkdir(exist_ok=True)
    REVIEW_DIR.mkdir(exist_ok=True)


def copy_grouped_files(results: list[dict]):
    for item in results:
        src = BASE_DIR / item["name"]
        if not src.exists():
            continue
        if item["status"] == "합격":
            dst = VERIFIED_DIR / src.name
        else:
            dst = REVIEW_DIR / src.name
        if src.resolve() == dst.resolve():
            continue
        shutil.copy2(src, dst)


def write_report(results: list[dict]):
    lines = []
    lines.append("현재산출물 파서 검토 및 사용자 확정 기준")
    lines.append("")
    lines.append("판정 원칙")
    lines.append("- 파일명 앞에 1이 붙은 PDF는 사용자 확인 완료 합격본으로 간주")
    lines.append("- 그 외 파일은 파서/페이지수/텍스트 기준으로 전부 재검토 대상으로 분류")
    lines.append("- 자동 판정은 참고용이며 최종 기준은 사용자 확인")
    lines.append("")

    accepted = [r for r in results if r["status"] == "합격"]
    review = [r for r in results if r["status"] != "합격"]
    lines.append(f"합격: {len(accepted)}건")
    lines.append(f"재검토: {len(review)}건")
    lines.append("")

    lines.append("[합격본]")
    for item in accepted:
        lines.append(f"- {item['name']}")
        lines.append(f"  페이지수: {item['page_count']}")
        lines.append(f"  예산항목 감지: {item['budget_items']}")
    lines.append("")

    lines.append("[재검토 목록]")
    for item in review:
        lines.append(f"- {item['name']}")
        lines.append(f"  사유: {item['reason']}")
        lines.append(f"  페이지수: {item['page_count']}")
        lines.append(f"  예산항목 감지: {item['budget_items']}")
        if item["sample_text"]:
            lines.append(f"  샘플: {item['sample_text']}")
    lines.append("")

    lines.append("생성 폴더")
    lines.append(f"- 합격본: {VERIFIED_DIR}")
    lines.append(f"- 재검토: {REVIEW_DIR}")

    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")


def main():
    ensure_dirs()
    candidates = [
        p
        for p in BASE_DIR.iterdir()
        if p.is_file() and p.name not in {"현재산출물_검토결과.txt", REPORT_PATH.name}
    ]
    results = [classify_file(p) for p in sorted(candidates)]
    copy_grouped_files(results)
    write_report(results)
    print(f"완료: {REPORT_PATH}")
    print(f"합격본 폴더: {VERIFIED_DIR}")
    print(f"재검토 폴더: {REVIEW_DIR}")


if __name__ == "__main__":
    main()
