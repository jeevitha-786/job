"""
database.py – SQLite persistence layer for JOBCIPHER AI
Uses the standard library sqlite3 (no extra dependencies needed).
"""
import sqlite3
import math
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "jobcipher.db")


def _conn() -> sqlite3.Connection:
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con


def init_db() -> None:
    """Create tables if they do not exist."""
    con = _conn()
    con.execute("""
        CREATE TABLE IF NOT EXISTS analysis_history (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            job_title   TEXT    DEFAULT '',
            company     TEXT    DEFAULT '',
            prediction  TEXT    NOT NULL,
            is_fake     INTEGER NOT NULL DEFAULT 0,
            fake_prob   REAL    DEFAULT 0.0,
            real_prob   REAL    DEFAULT 0.0,
            description TEXT    DEFAULT '',
            created_at  TEXT    DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
        )
    """)
    con.commit()
    con.close()


def save_analysis(
    job_title: str,
    company: str,
    prediction: str,
    is_fake: bool,
    fake_prob: float,
    real_prob: float,
    description: str,
) -> int:
    """Insert a new analysis record and return its id."""
    con = _conn()
    cur = con.execute(
        """
        INSERT INTO analysis_history
            (job_title, company, prediction, is_fake, fake_prob, real_prob, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job_title or "",
            company or "",
            prediction,
            int(is_fake),
            round(fake_prob or 0.0, 4),
            round(real_prob or 0.0, 4),
            (description or "")[:1000],
        ),
    )
    con.commit()
    new_id = cur.lastrowid
    con.close()
    return new_id


def get_history(page: int = 1, per_page: int = 10) -> tuple:
    """Return (list_of_dicts, total_count) for the requested page."""
    offset = (page - 1) * per_page
    con = _conn()
    rows = con.execute(
        "SELECT * FROM analysis_history ORDER BY created_at DESC LIMIT ? OFFSET ?",
        (per_page, offset),
    ).fetchall()
    total = con.execute("SELECT COUNT(*) FROM analysis_history").fetchone()[0]
    con.close()
    return [dict(r) for r in rows], total


def get_stats() -> dict:
    """Return aggregate statistics."""
    con = _conn()
    total = con.execute("SELECT COUNT(*) FROM analysis_history").fetchone()[0]
    fake  = con.execute(
        "SELECT COUNT(*) FROM analysis_history WHERE is_fake = 1"
    ).fetchone()[0]
    con.close()
    real     = total - fake
    fake_pct = round(fake / total * 100, 1) if total > 0 else 0.0
    return {
        "total":          total,
        "fake":           fake,
        "real":           real,
        "fake_percentage": fake_pct,
    }


def get_daily_stats(days: int = 7) -> list:
    """Return per-day counts for the last `days` days."""
    con = _conn()
    rows = con.execute(
        """
        SELECT DATE(created_at)  AS day,
               COUNT(*)          AS total,
               SUM(is_fake)      AS fake_count
        FROM   analysis_history
        WHERE  created_at >= DATE('now', 'localtime', ?)
        GROUP  BY DATE(created_at)
        ORDER  BY day ASC
        """,
        (f"-{days} days",),
    ).fetchall()
    con.close()
    return [{"day": r[0], "total": r[1], "fake": r[2] or 0} for r in rows]


def get_by_id(analysis_id: int) -> dict | None:
    con = _conn()
    row = con.execute(
        "SELECT * FROM analysis_history WHERE id = ?", (analysis_id,)
    ).fetchone()
    con.close()
    return dict(row) if row else None


def delete_by_id(analysis_id: int) -> None:
    con = _conn()
    con.execute("DELETE FROM analysis_history WHERE id = ?", (analysis_id,))
    con.commit()
    con.close()
