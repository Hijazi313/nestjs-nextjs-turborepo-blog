import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

const uniqueTagNames = new Set<string>();
while (uniqueTagNames.size < 3) {
  uniqueTagNames.add(faker.lorem.word());
}
console.log([...uniqueTagNames].map((name) => ({ name })));

const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, ''); // remove all non-word chars
};
async function main() {
  const defaultPassword = await hash('Test@123');
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 400 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraph(),
    thumbnail: faker.image.urlLoremFlickr(),
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: faker.datatype.boolean(),
  }));

  await Promise.all(
    posts.map(
      async (post) =>
        await prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({ length: 20 }).map(() => ({
                  content: faker.lorem.sentence(),
                  authorId: faker.number.int({ min: 1, max: 10 }),
                })),
              },
            },
          },
        }),
    ),
  );
  console.log('Seeding completed ');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((err) => {
    prisma.$disconnect();
    console.error(err);
    process.exit(1);
  });
