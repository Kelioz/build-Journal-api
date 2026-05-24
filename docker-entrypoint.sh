#!/bin/sh

echo "Running Prisma db push..."
npx prisma db push --accept-data-loss || echo "Warning: db push failed, but continuing..."

echo "Waiting for database to be ready..."
sleep 2

echo "Running seed..."
node prisma/seed.js || echo "Warning: seed failed, but continuing..."

echo "Starting NestJS application..."
exec node dist/src/main.js
