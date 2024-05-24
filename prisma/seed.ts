import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      username: 'coralharmut',
      tasks: {
        create: [
          {
            title: 'Hacer la compra',
            content: 'Pimiento, cebolla, patatas, champiñones, verduras, quinoa',
          },
          {
            title: 'Hacer práctica 4',
            content: 'Práctica 4 proyecto de backend con express y prisma',
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'inesfernandez',
      tasks: {
        create: [
          {
            title: 'Ir al gimnasio',
            content: 'Hacer fuerza durante 1 hora y 30 mins de cardio',
          },
          {
            title: 'Sacar a pasear a Terry',
            content: 'Paseo de 1 hora.',
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });

  console.log('Seed completed successfully!');
}

await main();