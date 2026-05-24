**Журнал работ на строительном объекте — Backend**

Коротко: этот репозиторий содержит серверную часть (backend) простого приложения "Журнал работ", в котором прораб может фиксировать выполненные виды работ по датам, объёмы, исполнителей и примечания. Бэкенд реализован на NestJS + TypeScript и использует Prisma для доступа к базе данных.

**Стек выбран из за того что он быстрее всего разворачивается и идеально подходит для тестовых заданий или MVP**

**Ключевые технологии / стек**

- Node.js + NestJS (TypeScript)
- Prisma ORM
- PostgreSQL (по умолчанию — можно поднять через Docker Compose)
- Swagger (OpenAPI) для документирования API

Архитектура и основные сущности:

- `WorkType` — справочник видов работ (напр., "Кладка перегородок").
- `JournalEntry` — запись в журнале работ (дата, вид работ, объём + единица, исполнитель, примечание).

Где смотреть код (важное):

- Основной код: [src](src)
- Prisma-схема: [prisma/schema.prisma](prisma/schema.prisma#L1)
- Docker-compose (Postgres): [docker-compose.yml](docker-compose.yml)
- Dockerfile (production image): [Dockerfile](Dockerfile)

API и документация

- Swagger UI доступен по `/api` при запущенном приложении. Там описаны все эндпоинты, схемы запросов и ответов.

Основные эндпоинты (backend):

- `GET /work-types` — список видов работ (словарь для селекта во фронтенде)
- `GET /journal?from=YYYY-MM-DD&to=YYYY-MM-DD&sort=asc|desc` — список записей журнала (фильтр по дате, сортировка)
- `POST /journal` — создать запись (тело: `date`, `workTypeId`, `volume`, `unit`, `performer`, `notes?`)
- `GET /journal/:id` — получить запись
- `PUT /journal/:id` — обновить запись
- `DELETE /journal/:id` — удалить запись

Запуск локально (разработка)

1. Скопируйте `.env` и при необходимости поправьте `DATABASE_URL` (по умолчанию настроен на локальный Postgres):

```bash
# пример: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_building?schema=public
```

## Docker

2. Запустите docker-compose (если используете Docker):

```bash
docker-compose up -d
```

После старта откройте: http://localhost:3000/api — Swagger UI с примерами запросов и схем.

## Yarn

2. Установите зависимости и сгенерируйте Prisma-клиент:

```bash
yarn install
yarn prisma:generate
```

4. Примените схему в базе и засе́дите справочник видов работ (seed):

```bash
yarn prisma db push
yarn prisma:seed
```

5. Запустите приложение в режиме разработки:

```bash
yarn start:dev
```

После старта откройте: http://localhost:3000/api — Swagger UI с примерами запросов и схем.

Что реализовано в этом репозитории

- Backend API (NestJS) с CRUD для `journal` и `work-types`.
- Prisma-схема и seed для базового набора видов работ.
- Swagger документация для всех эндпоинтов.

---

API (backend) endpoints:

- `GET /work-types` — list available work types (dictionary used in the form)
- `GET /journal?from=2026-05-01&to=2026-05-31&sort=asc` — list journal entries (filter by ISO dates, sort by date)
- `POST /journal` — create entry (body: `date`, `workTypeId`, `volume`, `unit`, `performer`, `notes?`)
- `GET /journal/:id` — get single entry
- `PUT /journal/:id` — update entry
- `DELETE /journal/:id` — delete entry

To seed initial work types (after running migrations):

```bash
yarn prisma:seed
```
