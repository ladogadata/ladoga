COMPOSE ?= docker compose
.PHONY: up down logs

up: ## Собрать и запустить
	$(COMPOSE) up -d --build --wait

down: ## Остановить
	$(COMPOSE) down

logs: ## Логи
	$(COMPOSE) logs -f ladoga