import { faker } from "@faker-js/faker";
import { openConnection } from "@/lib/db";
import { posts } from "@/schema/posts";
import { categories } from "@/schema/categories";
import { users } from "@/schema/users";
import bcrypt from "bcrypt";

type Post = typeof posts.$inferInsert;
type Category = typeof categories.$inferInsert;
type User = typeof users.$inferInsert;

export async function seed() {
  const { db, closeConnection } = await openConnection();
  const userList: User[] = [];
  const categoryList: Category[] = [];
  const postList: Post[] = [];

  const passwordHash = bcrypt.hashSync("12345678", 10);

  userList.push({
    name: "admin",
    email: "admin@example.com",
    image: faker.image.avatar(),
    role: "admin",
    password: passwordHash,
  });

  userList.push({
    name: "user",
    email: "user@example.com",
    image: faker.image.avatar(),
    role: "user",
    password: passwordHash,
  });

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    userList.push({
      name: faker.person.fullName({ firstName, lastName }),
      email: faker.internet.email({
        firstName,
        lastName,
        provider: "example.com",
      }),
      image: faker.image.avatar(),
      role: faker.helpers.arrayElement(["user", "admin"]),
      password: passwordHash,
    });
  }

  for (let i = 0; i < 100; i++) {
    categoryList.push({
      name: faker.commerce.department(),
    });
  }

  await db.delete(posts);
  await db.delete(categories);
  await db.delete(users);

  await db.insert(categories).values(categoryList);
  await db.insert(users).values(userList);

  const categoryRes = await db.query.categories.findMany();

  for (let i = 0; i < 100; i++) {
    postList.push({
      categoryId:
        categoryRes[Math.floor(Math.random() * categoryRes.length)].id,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(1),
      isPublished: Math.random() > 0.5,
    });
  }

  await db.insert(posts).values(postList);

  await closeConnection();
}

if (require.main === module) {
  seed();
}
