import { Command } from "commander";
import { register } from "esbuild-register/dist/node";
import path from "path";
import fs from "fs";
import { getTableConfig as getTableConfigMysql } from "drizzle-orm/mysql-core";
import { getTableConfig as getTableConfigPostgresql } from "drizzle-orm/pg-core";
import { getTableConfig as getTableConfigSqlite } from "drizzle-orm/sqlite-core";
import { log } from "../lib/log";
import { PackageManager } from "../lib/types";

register();

const PACKAGE_MANAGER_RECORD: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

export const dbCommand = new Command("db");

dbCommand.summary("db commands");

dbCommand
  .command("introspect")
  .argument("[table]", "the table to introspect")
  .action((table) => {
    const config = require(path.join(
      process.cwd(),
      "./drizzle.config.ts"
    )).default;

    const drizzleNextConfig = JSON.parse(
      fs.readFileSync("drizzle-next.config.json", "utf-8")
    );

    const schema = require(path.join(process.cwd(), "./schema/index.ts"));

    const pkg =
      PACKAGE_MANAGER_RECORD[
        drizzleNextConfig.packageManager as PackageManager
      ];

    if (config.dialect === "mysql") {
      table
        ? introspectMysqlTable(schema, pkg, table)
        : introspectMysqlSchema(schema, pkg);
    } else if (config.dialect === "postgresql") {
      introspectPostgresqlSchema(schema, pkg);
    } else if (config.dialect === "sqlite") {
      introspectSqliteSchema(schema, pkg);
    } else {
      throw new Error("unknown dialect");
    }
  });

function introspectMysqlSchema(schema: any, pkg: string) {
  for (const key of Object.keys(schema)) {
    if (key.endsWith("Relations")) continue;
    introspectMysqlTable(schema, pkg, key);
    console.log("");
  }
}

function introspectMysqlTable(schema: any, pkg: string, table: string) {
  const fkSet = new Set<string>();
  let command =
    `${pkg} drizzle-next@latest scaffold ${camelToSnakeCase(table)}` + ` -c `;

  const tableConfig = getTableConfigMysql(schema[table]);
  tableConfig.foreignKeys.forEach((fk) => {
    const ref = fk.reference();
    for (const column of ref.columns) {
      fkSet.add(column.name);
    }
  });
  tableConfig.columns.forEach((col) => {
    command +=
      camelToSnakeCase(col.name) +
      ":" +
      transformSQLType(col.getSQLType(), col.name, fkSet) +
      " ";
  });
  console.log(command);
}

function introspectPostgresqlSchema(schema: any, pkg: string) {
  for (const key of Object.keys(schema)) {
    if (key.endsWith("Relations")) continue;
    introspectPostgresqlTable(schema, pkg, key);
    console.log("");
  }
}

function introspectPostgresqlTable(schema: any, pkg: string, table: string) {
  const fkSet = new Set<string>();
  let command =
    `${pkg} drizzle-next@latest scaffold ${camelToSnakeCase(table)}` + ` -c `;

  const tableConfig = getTableConfigPostgresql(schema[table]);
  tableConfig.foreignKeys.forEach((fk) => {
    const ref = fk.reference();
    for (const column of ref.columns) {
      fkSet.add(column.name);
    }
  });
  tableConfig.columns.forEach((col) => {
    command +=
      camelToSnakeCase(col.name) +
      ":" +
      transformSQLType(col.getSQLType(), col.name, fkSet) +
      " ";
  });
  console.log(command);
}

function introspectSqliteSchema(schema: any, pkg: string, table?: string) {
  for (const key of Object.keys(schema)) {
    if (key.endsWith("Relations")) continue;
    introspectSqliteTable(schema, pkg, key);
    console.log("");
  }
}

function introspectSqliteTable(schema: any, pkg: string, table: string) {
  const fkSet = new Set<string>();
  let command =
    `${pkg} drizzle-next@latest scaffold ${camelToSnakeCase(table)}` + ` -c `;

  const tableConfig = getTableConfigSqlite(schema[table]);
  tableConfig.foreignKeys.forEach((fk) => {
    const ref = fk.reference();
    for (const column of ref.columns) {
      fkSet.add(column.name);
    }
  });
  tableConfig.columns.forEach((col) => {
    command +=
      camelToSnakeCase(col.name) +
      ":" +
      transformSQLType(col.getSQLType(), col.name, fkSet) +
      " ";
  });
  console.log(command);
}

function transformSQLType(
  sqlType: string,
  columnName: string,
  fkSet: Set<string>
) {
  if (columnName.endsWith("Id") && fkSet.has(columnName)) {
    return "references";
  }
  if (sqlType.startsWith("varchar")) {
    return "varchar";
  }
  if (sqlType.startsWith("char")) {
    return "char";
  }
  if (sqlType.startsWith("double precision")) {
    return "doublePrecision";
  }
  if (sqlType.startsWith("timestamp")) {
    return "timestamp";
  }
  return sqlType;
}

function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
