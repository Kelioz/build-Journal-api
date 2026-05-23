const { Client } = require('pg');
require('dotenv').config();

const types = [
  'Кладка перегородок',
  'Монтаж опалубки',
  'Бетонные работы',
  'Армирование',
];

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not set in environment');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    // Ensure table exists (Prisma db push should have created it). Use quoted identifier.
    for (const name of types) {
      const res = await client.query(
        `INSERT INTO "WorkType" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
        [name],
      );
      if (res.rows.length) {
        console.log('Inserted work type:', name);
      } else {
        console.log('Work type exists:', name);
      }
    }
    console.log('Seed finished.');
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
