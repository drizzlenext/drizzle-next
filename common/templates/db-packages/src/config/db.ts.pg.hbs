import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, Client } from "pg";
import { env } from "@/config/env";
import * as schema from "@/config/schema";

const pool = new Pool({
  connectionString: env.DB_URL,
});

export const db = drizzle(pool, { schema, casing: "snake_case" });

export async function openConnection() {
  const client = new Client({ connectionString: env.DB_URL });
  await client.connect();
  const db = drizzle(client, { schema, casing: "snake_case" });
  const closeConnection = async () => await client.end();
  return {
    db,
    closeConnection,
  }
}