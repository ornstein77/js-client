FROM oven/bun:latest AS base
WORKDIR /app

# У серверного образа build context должен быть корнем репозитория,
# чтобы внутри был и backend, и client (backend собирает клиент и копирует в dist/public).

COPY backend/package*.json ./backend/
RUN bun install --cwd ./backend

COPY backend ./backend
COPY client ./client

WORKDIR /app/backend
RUN bunx prisma generate

RUN bun run build

EXPOSE 5000
CMD ["sh", "-lc", "bunx prisma migrate deploy && bun run start"]