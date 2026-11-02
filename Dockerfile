# ---------- Сборка фронтенда ----------
FROM node:24 AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- Бэкенд (основа) ----------
FROM python:3.14-slim AS backend
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# ---------- Разработка: + инструменты тестов ----------
FROM backend AS dev
COPY backend/requirements-dev.txt backend/pytest.ini ./
RUN pip install --no-cache-dir -r requirements-dev.txt
COPY backend/tests ./tests

# ---------- Боевой образ: бэкенд + собранный фронтенд ----------
FROM backend AS prod
COPY --from=frontend-build /frontend/dist ./static