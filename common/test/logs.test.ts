import { test } from "vitest";
import { AuthProcessor } from "../../drizzle-next/processors/auth-processor";
import { AdminProcessor } from "../../drizzle-next/processors/admin-processor";
import { BetterSqlite3PackageStrategy } from "../db-packages/better-sqlite3-package-strategy";
import { PgPackageStrategy } from "../db-packages/pg-package-strategy";
import { DrizzleNextConfig } from "../types/types";
import { Mysql2PackageStrategy } from "../db-packages/mysql2-package-strategy";

const drizzleNextConfig: DrizzleNextConfig = {
  install: false,
  packageManager: "npm",
  dbDialect: "sqlite",
  latest: true,
  pkStrategy: "uuidv4",
  adminEnabled: true,
  authEnabled: true,
  dbPackage: "better-sqlite3",
  version: "2",
  pluralizeEnabled: false,
  framework: { drizzle: true, express: true, next: true },
};

test("better sqlite3 package strategy", () => {
  const s = new BetterSqlite3PackageStrategy(drizzleNextConfig);
  s.printCompletionMessage();
});

test("pg package strategy", () => {
  const s = new PgPackageStrategy(drizzleNextConfig);
  s.printCompletionMessage();
});

test("mysql2 package strategy", () => {
  const s = new Mysql2PackageStrategy(drizzleNextConfig);
  s.printCompletionMessage();
});

test("auth processor", () => {
  const a = new AuthProcessor(drizzleNextConfig);
  a.printCompletionMessage();
});

test("admin processor", () => {
  const a = new AdminProcessor(drizzleNextConfig);
  a.printCompletionMessage();
});
