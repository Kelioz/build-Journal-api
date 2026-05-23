const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const types = [
    'Кладка перегородок',
    'Монтаж опалубки',
    'Бетонные работы',
    'Армирование',
  ];

  for (const name of types) {
    await prisma.workType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
