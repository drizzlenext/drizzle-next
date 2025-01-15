import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { config } from "@/lib/config";
import * as schema from "@/lib/schema";

const sqlite = new Database(config.DB_URL);

export const db = drizzle(sqlite, { schema, casing: "snake_case" });

export async function openConnection() {
  const betterSqlite = new Database(config.DB_URL);
  const db = drizzle(betterSqlite, { schema, casing: "snake_case" });
  const closeConnection = async () => await betterSqlite.close();
  return {
    db,
    closeConnection,
  }
}