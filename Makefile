COMPOSE ?= docker compose
.PHONY: up down logs test

up: ## Build and start
	$(COMPOSE) up -d --build --wait

down: ## Stop
	$(COMPOSE) down

logs: ## Follow backend logs
	$(COMPOSE) logs -f ladoga

test: ## Run backend tests, frontend lint and build
	$(COMPOSE) exec ladoga pytest
	$(COMPOSE) exec frontend npm run lint
	$(COMPOSE) exec frontend npm run build