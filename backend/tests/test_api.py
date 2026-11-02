from fastapi.testclient import TestClient

from app.main import app


def test_health():
    assert TestClient(app).get("/api/health").json() == {"status": "ok"}


def test_me_requires_login():
    assert TestClient(app).get("/api/auth/me").status_code == 401


def test_wrong_password():
    r = TestClient(app).post("/api/auth/login", json={"username": "admin", "password": "nope"})
    assert r.status_code == 401


def test_login_me_logout():
    c = TestClient(app)
    assert c.post("/api/auth/login", json={"username": "admin", "password": "secret"}).status_code == 200
    assert c.get("/api/auth/me").json() == {"username": "admin"}
    c.post("/api/auth/logout")
    assert c.get("/api/auth/me").status_code == 401