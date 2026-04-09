FROM oven/bun:latest AS base
WORKDIR /app

# установка зависимостей

COPY package*.json .
RUN bun install 

COPY . .

RUN bun run build

# Клиент собирается в статические файлы, их раздаёт backend
CMD ["sh", "-lc", "echo 'client built (static files), served by backend'"]