from __future__ import annotations

import secrets
import time
import uuid
from typing import Any

import bcrypt

from backend.config import settings
from backend.mongodb.db import db



async def register_user(username: str, fullname: str, email: str, password: str | None = None) -> dict[str, Any]:
    normalized_username = (username or "").strip()
    if not normalized_username:
        raise ValueError("username required")

    existing = await db.get_collection("users").find_one({"username": normalized_username})
    if existing:
        raise ValueError("username already exists")

    raw_password = password or ""
    hashed = bcrypt.hashpw(raw_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    user_id = str(uuid.uuid4())
    now = int(time.time())
    new_user = {
        "_id": user_id,
        "username": normalized_username,
        "password_hash": hashed,
        "fullname": fullname,
        "email": email,
        "role": "user",
        "is_active": True,
        "created_at": now,
        "updated_at": now,
        "last_login_at": None,
    }
    await db.get_collection("users").insert_one(new_user)

    access_token = secrets.token_urlsafe(32)
    refresh_token = secrets.token_urlsafe(48)
    expires_at = int(time.time()) + settings.session_max_age
    refresh_expires_at = int(time.time()) + settings.session_max_age * 4
    await db.get_collection("user_sessions").insert_one(
        {
            "_id": access_token,
            "user_id": user_id,
            "username": normalized_username,
            "role": "user",
            "created_at": int(time.time()),
            "expires_at": expires_at,
            "refresh_token": refresh_token,
            "refresh_expires_at": refresh_expires_at,
        }
    )

    return new_user


async def find_or_register(user_name: str, fullname: str, email: str, password: str | None = None) -> dict[str, Any]:
    normalized_username = (user_name or "").strip()
    if not normalized_username:
        raise ValueError("username required")

    existing = await db.get_collection("users").find_one({"username": normalized_username})
    if existing:
        return existing

    return await register_user(username=normalized_username,fullname = fullname, email = email, password=password)

