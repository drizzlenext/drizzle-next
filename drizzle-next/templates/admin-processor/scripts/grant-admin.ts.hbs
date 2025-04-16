import { eq } from "drizzle-orm";
import { openConnection } from "@/lib/db";
import { users } from "@/schema/users";

async function main() {
  const { db, closeConnection } = await openConnection();

  const email = process.argv[2];

  const userObj = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!userObj) {
    throw new Error("user not found " + email);
  }

  await db.update(users).set({ role: "admin" }).where(eq(users.email, email));

  console.log("granted admin role to user " + email);

  await closeConnection();

  process.exit(0);
}

main();
