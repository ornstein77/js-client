FROM oven/bun:latest AS base
WORKDIR /app

COPY package*.json .
RUN bun install

COPY . .
RUN bunx prisma generate

RUN bun run build

EXPOSE 5000
CMD ["sh", "-lc", "bunx prisma migrate deploy && bun run start"]