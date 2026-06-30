FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY . .

RUN python -m app.seed_catalog

CMD ["sh", "-c", "python -m app.server --host 0.0.0.0 --port ${PORT:-8080}"]
