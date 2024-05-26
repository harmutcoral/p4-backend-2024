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
      habitChecks: {
        create: [
          {
            habit: 'Meditación diaria',
            checkDate: new Date(),
            status: 'checked',
          },
          {
            habit: 'Lectura diaria',
            checkDate: new Date(),
            status: 'unchecked',
          },
        ],
      },
    },
    include: {
      tasks: true,
      habitChecks: true,
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
      habitChecks: {
        create: [
          {
            habit: 'Hacer la cama',
            checkDate: new Date(),
            status: 'checked',
          },
          {
            habit: 'Estiramientos',
            checkDate: new Date(),
            status: 'unchecked',
          },
        ],
      },
    },
    include: {
      tasks: true,
      habitChecks: true,
    },
  });

  console.log('Seed completed successfully!');
}

await main();