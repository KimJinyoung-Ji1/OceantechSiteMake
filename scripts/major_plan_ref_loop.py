# -*- coding: utf-8 -*-
from __future__ import annotations

import csv
import subprocess
import sys
import time
from pathlib import Path

ROOT_DIR = Path(r"C:\Users\SJLEE\Downloads\GPT")
REF_DIR = Path(r"C:\Users\SJLEE\Desktop\006_영업자료\주요업무계획")
REVIEW_DIR = ROOT_DIR / "검증필요"
LOG_DIR = ROOT_DIR / "작업로그"
MASTER_TARGETS = LOG_DIR / "2026_주요업무계획_84대상.tsv"
ACTIVE_TARGETS = LOG_DIR / "2026_주요업무계획_참고제외_루프대상.tsv"
STATUS_REPORT = LOG_DIR / "2026_주요업무계획_루프상태.txt"
COLLECTOR = Path(r"C:\Dev\OceantechSiteMake\scripts\major_plan_84_collect.js")
VALIDATOR = Path(r"C:\Dev\OceantechSiteMake\scripts\major_plan_84_validate.py")


def ref_names() -> set[str]:
    names: set[str] = set()
    for path in REF_DIR.glob("*.pdf"):
        if len(path.name) < 4 or not path.name[:3].isdigit() or "_2026_" not in path.name:
            continue
        left = path.name.split("_2026_", 1)[0]
        if "_" in left:
            names.add(left.split("_", 1)[1].strip())
    return names


def verified_names() -> set[str]:
    names: set[str] = set()
    for path in ROOT_DIR.glob("*.pdf"):
        if len(path.name) < 4 or not path.name[:3].isdigit() or "_2026_" not in path.name:
            continue
        left = path.name.split("_2026_", 1)[0]
        if "_" in left:
            names.add(left.split("_", 1)[1].strip())
    return names


def present_ref_targets() -> set[str]:
    rows = load_master_targets()
    target_names = [row["name"] for row in rows]
    short_counts: dict[str, int] = {}
    for name in target_names:
        if " " in name:
            short = name.split(" ")[-1]
            short_counts[short] = short_counts.get(short, 0) + 1

    ref_file_names = [path.name for path in REF_DIR.iterdir() if path.is_file()]
    present: set[str] = set()
    for name in target_names:
        short = name.split(" ")[-1] if " " in name else None
        for ref_name in ref_file_names:
            if name in ref_name:
                present.add(name)
                break
            if short and short_counts.get(short) == 1 and short in ref_name:
                present.add(name)
                break
    return present


def cleanup_review_against_ref() -> int:
    ref = present_ref_targets()
    if not REVIEW_DIR.exists():
        return 0
    removed = 0
    for path in REVIEW_DIR.iterdir():
        if not path.is_file() or "_2026_" not in path.name:
            continue
        municipality = path.name.split("_2026_", 1)[0].strip()
        if municipality in ref:
            path.unlink(missing_ok=True)
            removed += 1
    return removed


def load_master_targets() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with MASTER_TARGETS.open("r", encoding="utf-8") as handle:
        reader = csv.reader(handle, delimiter="\t")
        for row in reader:
            if len(row) < 2:
                continue
            name = row[0].replace("\ufeff", "").strip()
            rows.append({"name": name, "url": row[1].strip()})
    return rows


def build_active_targets() -> list[dict[str, str]]:
    ref = present_ref_targets()
    verified = verified_names()
    rows = [
        row
        for row in load_master_targets()
        if row["name"] not in ref and row["name"] not in verified
    ]
    with ACTIVE_TARGETS.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, delimiter="\t")
        for row in rows:
            writer.writerow([row["name"], row["url"]])
    return rows


def run_collect_groups() -> list[subprocess.Popen[str]]:
    processes: list[subprocess.Popen[str]] = []
    for group_index in range(4):
        cmd = [
            "node",
            str(COLLECTOR),
            "--targets-file",
            str(ACTIVE_TARGETS),
            "--group-index",
            str(group_index),
            "--group-count",
            "4",
            "--pool-size",
            "3",
        ]
        processes.append(
            subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
            )
        )
    return processes


def wait_collect_groups(processes: list[subprocess.Popen[str]]) -> list[str]:
    outputs: list[str] = []
    for process in processes:
        stdout, _ = process.communicate()
        outputs.append(stdout or "")
    return outputs


def run_validator() -> str:
    completed = subprocess.run(
        ["python", "-X", "utf8", str(VALIDATOR)],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=False,
    )
    return (completed.stdout or "") + (completed.stderr or "")


def write_status(cycle: int, active_rows: list[dict[str, str]], collect_logs: list[str], validator_log: str, phase: str, removed_review: int) -> None:
    ref = present_ref_targets()
    verified = verified_names()
    lines: list[str] = []
    lines.append("2026 주요업무계획 루프 상태")
    lines.append(f"회차: {cycle}")
    lines.append(f"상태: {phase}")
    lines.append(f"참고폴더 제외 수: {len(ref)}")
    lines.append(f"GPT 검증통과 수: {len(verified)}")
    lines.append(f"현재 루프 대상 수: {len(active_rows)}")
    lines.append(f"검증필요 정리 수: {removed_review}")
    lines.append("")
    lines.append("[루프 대상]")
    for row in active_rows:
        lines.append(f"- {row['name']}\t{row['url']}")
    lines.append("")
    lines.append("[수집 로그]")
    lines.extend(collect_logs)
    lines.append("")
    lines.append("[검증 로그]")
    lines.append(validator_log.strip())
    STATUS_REPORT.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    cycle = 0
    while True:
        cycle += 1
        removed_review = cleanup_review_against_ref()
        active_rows = build_active_targets()
        if not active_rows:
            write_status(cycle, [], ["루프 대상이 없습니다."], "", "종료", removed_review)
            break

        write_status(cycle, active_rows, ["수집 시작"], "", "수집중", removed_review)
        collect_processes = run_collect_groups()
        collect_logs = wait_collect_groups(collect_processes)
        write_status(cycle, active_rows, collect_logs, "", "검증중", removed_review)
        validator_log = run_validator()
        write_status(cycle, active_rows, collect_logs, validator_log, "대기중", removed_review)
        time.sleep(300)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
