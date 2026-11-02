COMPOSE ?= docker compose
.PHONY: up down logs test

up: ## Собрать и запустить
	$(COMPOSE) up -d --build --wait

down: ## Остановить
	$(COMPOSE) down

logs: ## Логи
	$(COMPOSE) logs -f ladoga

test: ## Тесты бэкенда, линтер и сборка фронтенда
	$(COMPOSE) exec ladoga pytest
	$(COMPOSE) exec frontend npm run lint
	$(COMPOSE) exec frontend npm run build