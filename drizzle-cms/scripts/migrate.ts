import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { openConnection } from "@/lib/db";

async function main() {
  const { db, closeConnection } = await openConnection();
  await migrate(db, { migrationsFolder: "drizzle" });
  await closeConnection();
}

main();
