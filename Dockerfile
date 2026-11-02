# ---------- Frontend build ----------
FROM node:24 AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- Backend (base) ----------
FROM python:3.14-slim AS backend
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/alembic.ini ./
COPY backend/migrations ./migrations
COPY backend/app ./app
RUN mkdir -p /data
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]

# ---------- Development: + test tools ----------
FROM backend AS dev
COPY backend/requirements-dev.txt backend/pytest.ini ./
RUN pip install --no-cache-dir -r requirements-dev.txt
COPY backend/tests ./tests

# ---------- Production: backend + built frontend ----------
FROM backend AS prod
COPY --from=frontend-build /frontend/dist ./static