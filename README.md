# Ladoga

[![CI](https://github.com/ladogadata/ladoga/actions/workflows/ci.yml/badge.svg)](https://github.com/ladogadata/ladoga/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/ladogadata/ladoga)](LICENSE)
![Python](https://img.shields.io/badge/python-3.14-blue)

Web UI for CDC replication on top of Kafka Connect and Debezium.

## Quick start

```bash
docker run -p 8000:8000 \
  -e LADOGA_ADMIN_USERNAME=admin \
  -e LADOGA_ADMIN_PASSWORD=change-me \
  -e LADOGA_SECRET_KEY=$(openssl rand -hex 32) \
  ghcr.io/ladogadata/ladoga:latest
```

Open http://localhost:8000