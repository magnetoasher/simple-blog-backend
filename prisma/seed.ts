import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData = [
  {
    firstName: 'Henry',
    lastName: 'Brown',
    email: 'alice@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'When it means it',
          published: true,
        },
      ],
    },
  },
  {
    firstName: 'Nilu',
    lastName: 'Green',
    email: 'nilu@prisma.io',
    password: '$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi', // random42
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'love means love',
          published: true,
          viewCount: 42,
        },
      ],
    },
  },
  {
    firstName: 'Mahmoud',
    lastName: 'Melnick',
    email: 'mahmoud@prisma.io',
    password: '$2a$10$lTlNdIBQvCho0BoQg21KWu/VVKwlYsGwAa5r7ctOV41EKXRQ31ING', // iLikeTurtles42
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'Fall in love',
          published: true,
          viewCount: 128,
        },
        {
          title: 'Prisma on YouTube',
          content: 'I love it',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });