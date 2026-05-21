import argparse
import sqlite3
import sys

from app.database import get_db_connection


def promote_to_admin(email: str) -> int:
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, role FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user:
        conn.close()
        raise ValueError(f"User with email '{email}' was not found.")

    if user["role"] == "admin":
        conn.close()
        return user["id"]

    cursor.execute("UPDATE users SET role = ? WHERE id = ?", ("admin", user["id"]))
    conn.commit()
    conn.close()
    return user["id"]


def main() -> int:
    parser = argparse.ArgumentParser(description="Promote an existing user to admin role.")
    parser.add_argument("email", help="Email of the user to promote")
    args = parser.parse_args()

    try:
        user_id = promote_to_admin(args.email)
        print(f"Success: user_id={user_id} is now admin")
        return 0
    except ValueError as exc:
        print(f"Error: {exc}")
        return 1
    except sqlite3.Error as exc:
        print(f"Database error: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
