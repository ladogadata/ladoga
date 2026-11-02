import secrets
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from pydantic import BaseModel

from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])
COOKIE = "ladoga_session"


class LoginRequest(BaseModel):
    username: str
    password: str


def same(a: str, b: str) -> bool:
    # сравнение за постоянное время — защита от подбора по времени ответа
    return secrets.compare_digest(a.encode(), b.encode())


def current_user(ladoga_session: str | None = Cookie(default=None)) -> str:
    if not ladoga_session:
        raise HTTPException(status_code=401, detail="Не выполнен вход")
    try:
        payload = jwt.decode(ladoga_session, settings.secret_key, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Сессия недействительна")
    return payload["sub"]


@router.post("/login")
def login(body: LoginRequest, response: Response):
    if not (same(body.username, settings.admin_username)
            and same(body.password, settings.admin_password)):
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")
    exp = datetime.now(timezone.utc) + timedelta(hours=settings.session_hours)
    token = jwt.encode({"sub": body.username, "exp": exp}, settings.secret_key, algorithm="HS256")
    response.set_cookie(COOKIE, token, httponly=True, samesite="lax",
                        max_age=settings.session_hours * 3600)
    return {"username": body.username}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE)
    return {"ok": True}


@router.get("/me")
def me(user: str = Depends(current_user)):
    return {"username": user}