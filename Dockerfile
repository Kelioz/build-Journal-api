FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY tsconfig*.json ./
COPY src ./src
COPY .env.example .env
RUN npm install --no-audit --no-fund

RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY package.json ./package.json
COPY .env.example .env
COPY docker-entrypoint.sh ./docker-entrypoint.sh

# Убираем \r (CRLF → LF) и даём права на запуск
RUN sed -i 's/\r$//' ./docker-entrypoint.sh && chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]