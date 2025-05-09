import { spawn, spawnSync, exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { log } from "./log";
import packageDrizzleNextJson from "../package-pinned.json";
import {
  PackageManager,
  DrizzleNextConfig,
  DrizzleExpressConfig,
} from "../types/types";
import { caseFactory } from "./case-utils";
import { register } from "esbuild-register/dist/node";
import { getHandlebars } from "./handlebars-helpers";

const Handlebars = getHandlebars();

register();

export function renderTemplateIfNotExists({
  inputPath,
  outputPath,
  data,
}: {
  inputPath: string;
  outputPath: string;
  data?: any;
}) {
  const joinedOutputPath = path.join(process.cwd(), outputPath);
  if (fs.existsSync(joinedOutputPath)) {
    log.gray(`skip create ${outputPath} (file exists)`);
    return;
  }
  renderTemplate({
    inputPath,
    outputPath,
    data,
  });
}

export function renderTemplate({
  inputPath,
  outputPath,
  data,
}: {
  inputPath: string;
  outputPath: string;
  data?: any;
}) {
  let content = compileTemplate({ inputPath, data });
  const joinedOutputPath = path.join(process.cwd(), outputPath);
  const resolvedPath = path.resolve(joinedOutputPath);
  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(resolvedPath, content);
  log.log("create " + outputPath);
}

export function compileTemplate({
  inputPath,
  data,
}: {
  inputPath: string;
  data?: any;
}): string {
  const templatePath = path.join(__dirname, "..", "templates", inputPath);
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const compiled = Handlebars.compile(templateContent, { noEscape: true });
  const content = compiled(data);
  return content;
}

export function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    log.exec(command);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(error);
      } else {
        // verbose option
        // console.log(`${stdout}`);
        resolve();
      }
    });
  });
}

export async function spawnCommand(command: string): Promise<void> {
  log.exec(command);
  const child = spawn(command, [], { shell: true });

  child.stdout.on("data", (data) => {
    console.log(`${data.toString()}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`${data.toString()}`);
  });

  return new Promise((resolve, reject) => {
    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command ${command} exited with code ${code}`));
      }
    });
  });
}

export function spawnSyncCommand(command: string) {
  log.exec(command);
  const result = spawnSync(command, [], {
    stdio: "inherit", // Directly inherits stdio from the parent, enabling interaction
    shell: true, // Optional: Use the shell to interpret the command (useful for complex commands)
  });

  if (result.error) {
    console.error("Error executing command:", result.error);
  } else {
    console.log(`Process exited with code ${result.status}`);
  }
}

export function appendToEnvLocal(key: string, val: string) {
  appendToFileIfTextNotExists(".env", `${key}=${val}`, `${key}=`);
}

export function appendToFileIfTextNotExists(
  filePath: string,
  textToAppend: string,
  textToSearch: string
) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  if (fileContent.includes(textToSearch)) {
    log.gray(
      `skip append ${filePath} \`${textToSearch
        .trim()
        .substring(0, 30)}...\` (text exists)`
    );
  } else {
    appendToFile(filePath, "\n" + textToAppend);
  }
}

export function checkIfTextExistsInFile(
  filePath: string,
  textToSearch: string
) {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    "utf-8"
  );
  return fileContent.includes(textToSearch.trim());
}

export function appendToFile(filePath: string, textToAppend: string) {
  try {
    const joinedFilePath = path.join(process.cwd(), filePath);
    fs.appendFileSync(joinedFilePath, textToAppend);
    log.log(
      `append ${filePath} \`${textToAppend.trim().substring(0, 30)}...\``
    );
  } catch (error) {
    console.error(error);
  }
}

export function prependToFile(filePath: string, textToPrepend: string) {
  try {
    const joinedFilePath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(joinedFilePath, "utf-8");
    const updatedContent = textToPrepend + fileContent;
    fs.writeFileSync(joinedFilePath, updatedContent, "utf-8");
    log.log(
      `prepend ${filePath} - ${textToPrepend.trim().substring(0, 30)}...`
    );
  } catch (error: any) {
    console.error(
      `Error while prepending content to the file: ${error.message}`
    );
  }
}

export function prependToFileIfNotExists(
  filePath: string,
  textToPrepend: string
) {
  if (checkIfTextExistsInFile(filePath, textToPrepend)) {
    log.log(
      `- ${filePath} - text exists: ${textToPrepend.trim().substring(0, 30)}...`
    );
    return;
  }
  prependToFile(filePath, textToPrepend);
}

export function writeToFile(filePath: string, text: string) {
  try {
    const joinedFilePath = path.join(process.cwd(), filePath);
    fs.writeFileSync(joinedFilePath, text, "utf-8");
    log.log("create " + filePath);
  } catch (error: any) {
    console.error(`Error while writing content to the file: ${error.message}`);
  }
}

export function insertTextBeforeIfNotExists(
  filePath: string,
  searchText: string,
  newText: string
) {
  if (checkIfTextExistsInFile(filePath, newText)) {
    log.gray(
      `skip insert ${filePath} \`${newText
        .trim()
        .substring(0, 30)}...\` (text exists)`
    );
    return;
  }
  insertTextBefore(filePath, searchText, newText);
}

export function insertTextBefore(
  filePath: string,
  searchText: string,
  newText: string
) {
  // Read the file content
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    "utf8"
  );

  // Find the position of the searchText
  const index = fileContent.indexOf(searchText);

  if (index === -1) {
    throw new Error(`Text "${searchText}" not found in the file.`);
  }

  // Insert the new text before the searchText
  const updatedContent =
    fileContent.slice(0, index) + newText + fileContent.slice(index);

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, "utf8");

  log.log(`insert ${filePath} - ${newText.trim().substring(0, 30)}...`);
}

export function insertTextAfter(
  filePath: string,
  searchText: string,
  newText: string
) {
  // Read the file content
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    "utf8"
  );

  // Find the position of the searchText
  const index = fileContent.indexOf(searchText);

  if (index === -1) {
    throw new Error(`Text "${searchText}" not found in the file.`);
  }

  // Insert the new text after the searchText
  const updatedContent =
    fileContent.slice(0, index + searchText.length) +
    newText +
    fileContent.slice(index + searchText.length);

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, "utf8");

  log.log(`insert ${filePath} - ${newText.trim().substring(0, 30)}...`);
}

export function insertTextAfterIfNotExists(
  filePath: string,
  searchText: string,
  newText: string
) {
  // Read the file content
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    "utf8"
  );

  const newTextIndex = fileContent.indexOf(newText);

  if (newTextIndex > -1) {
    log.gray(
      `skip insert ${filePath} \`${newText
        .trim()
        .substring(0, 30)}...\` (text exists)`
    );
    return;
  }

  insertTextAfter(filePath, searchText, newText);
}

export function getFilenamesFromFolder(folderPath: string): string[] {
  try {
    const filenames = fs.readdirSync(folderPath);
    return filenames.filter((file) => {
      const filePath = path.join(process.cwd(), folderPath, file);
      return fs.lstatSync(filePath).isFile();
    });
  } catch (error: any) {
    return [];
  }
}

export async function installDependencies(opts: {
  dependencies: string[];
  packageManager: PackageManager;
  latest: boolean;
}) {
  const collectDependencies: string[] = [];
  for (const str of opts.dependencies) {
    const pinnedVersion =
      packageDrizzleNextJson.dependencies[
        str as keyof typeof packageDrizzleNextJson.dependencies
      ];
    if (!pinnedVersion) {
      throw new Error("pinned version not found for dependency " + str);
    }
    let version;
    if (pinnedVersion.includes("beta")) {
      // priority 1
      version = pinnedVersion;
    } else if (opts.latest) {
      // priority 2
      version = "latest";
    } else {
      // priority 3
      version = pinnedVersion;
    }
    collectDependencies.push(`${str}@${version}`);
  }
  if (collectDependencies.length === 0) {
    return;
  }

  const packageManagerRecords: Record<PackageManager, string> = {
    npm: `npm install ${collectDependencies.join(" ")} --force`,
    pnpm: `pnpm add ${collectDependencies.join(" ")}`,
    bun: `bun add ${collectDependencies.join(" ")}`,
  };

  const cmd = packageManagerRecords[opts.packageManager];

  await runCommand(cmd);
}

export async function installDevDependencies(opts: {
  devDependencies: string[];
  packageManager: PackageManager;
  latest: boolean;
}) {
  const collectDevDependencies: string[] = [];
  for (const str of opts.devDependencies) {
    const pinnedVersion =
      packageDrizzleNextJson.devDependencies[
        str as keyof typeof packageDrizzleNextJson.devDependencies
      ];
    if (!pinnedVersion) {
      throw new Error("pinned version not found for dev dependency " + str);
    }
    let version;
    if (pinnedVersion.includes("beta")) {
      // priority 1
      version = pinnedVersion;
    } else if (opts.latest) {
      // priority 2
      version = "latest";
    } else {
      // priority 3
      version = pinnedVersion;
    }
    collectDevDependencies.push(`${str}@${version}`);
  }
  if (collectDevDependencies.length === 0) {
    return;
  }

  const packageManagerRecords: Record<PackageManager, string> = {
    npm: `npm install -D ${collectDevDependencies.join(" ")} --force`,
    pnpm: `pnpm add -D ${collectDevDependencies.join(" ")}`,
    bun: `bun add -D ${collectDevDependencies.join(" ")}`,
  };

  const cmd = packageManagerRecords[opts.packageManager];

  await runCommand(cmd);
}

export function loadDrizzleNextConfig(): DrizzleNextConfig {
  const drizzleNextConfig = require(
    path.join(process.cwd(), "./drizzle-next.config.ts")
  ).default;
  return drizzleNextConfig;
}

export function writeDrizzleNextConfig(completeConfig: DrizzleNextConfig) {
  const configTsContent = `const drizzleNextConfig = ${JSON.stringify(
    completeConfig,
    null,
    2
  )};\n\nexport default drizzleNextConfig;`;
  writeToFile("drizzle-next.config.ts", configTsContent);
}

export function loadDrizzleExpressConfig(): DrizzleExpressConfig {
  const drizzleExpressConfig = require(
    path.join(process.cwd(), "./drizzle-express.config.ts")
  ).default;
  return drizzleExpressConfig;
}

export function writeDrizzleExpressConfig(
  completeConfig: DrizzleExpressConfig
) {
  const configTsContent = `const drizzleExpressConfig = ${JSON.stringify(
    completeConfig,
    null,
    2
  )};\n\nexport default drizzleExpressConfig;`;
  writeToFile("drizzle-express.config.ts", configTsContent);
}

export function completeDrizzleNextConfig(
  partialConfig: Partial<DrizzleNextConfig>
): DrizzleNextConfig {
  const completeConfig: DrizzleNextConfig = {
    version: partialConfig.version ?? "",
    packageManager: partialConfig.packageManager ?? "npm",
    latest: partialConfig.latest ?? false,
    dbDialect: partialConfig.dbDialect ?? "sqlite",
    dbPackage: partialConfig.dbPackage ?? "better-sqlite3",
    pkStrategy: partialConfig.pkStrategy ?? "uuidv4",
    authEnabled: partialConfig.authEnabled ?? true,
    adminEnabled: partialConfig.adminEnabled ?? true,
    install: partialConfig.install ?? true,
    pluralizeEnabled: partialConfig.pluralizeEnabled ?? true,
  };
  return completeConfig;
}

export function completeDrizzleExpressConfig(
  partialConfig: Partial<DrizzleExpressConfig>
): DrizzleExpressConfig {
  const completeConfig: DrizzleExpressConfig = {
    version: partialConfig.version ?? "",
    packageManager: partialConfig.packageManager ?? "npm",
    latest: partialConfig.latest ?? false,
    dbDialect: partialConfig.dbDialect ?? "sqlite",
    dbPackage: partialConfig.dbPackage ?? "better-sqlite3",
    pkStrategy: partialConfig.pkStrategy ?? "uuidv4",
    install: partialConfig.install ?? true,
    pluralizeEnabled: partialConfig.pluralizeEnabled ?? true,
  };
  return completeConfig;
}

export function removeTextFromFile(
  filePath: string,
  targetString: string
): void {
  // Read the file content
  let fileContent = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");

  // Replace the target multiline string with an empty string
  const updatedContent = fileContent.replace(targetString, "");

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, "utf8");
}

export function insertSchemaToSchemaIndex(
  table: string,
  opts: { pluralize: boolean }
) {
  const tableObj = caseFactory(table, { pluralize: opts.pluralize });
  appendToFileIfTextNotExists(
    "src/config/schema.ts",
    `export * from "@/schema/${tableObj.pluralKebabCase}";`,
    `export * from "@/schema/${tableObj.pluralKebabCase}";`
  );
}

export function isNextJsApp() {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  let hasNextDependency = false;

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      hasNextDependency =
        (packageJson.dependencies && packageJson.dependencies.next) ||
        (packageJson.devDependencies && packageJson.devDependencies.next);
    } catch (error) {
      console.error("Error reading package.json:", error);
    }
  }

  return hasNextDependency;
}

export function isAppDirectoryAtRoot() {
  const appDirectoryPath = path.join(process.cwd(), "app");

  return (
    fs.existsSync(appDirectoryPath) &&
    fs.lstatSync(appDirectoryPath).isDirectory()
  );
}

export function hasTailwindCSS() {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) return false;

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    return (
      (packageJson.dependencies && packageJson.dependencies.tailwindcss) ||
      (packageJson.devDependencies && packageJson.devDependencies.tailwindcss)
    );
  } catch (error) {
    console.error("Error reading package.json:", error);
    return false;
  }
}

export function hasTsConfig() {
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  return fs.existsSync(tsConfigPath);
}

export function preflightChecks() {
  if (!isNextJsApp()) {
    log.red("nextjs is required");
    process.exit(1);
  }

  if (!isAppDirectoryAtRoot()) {
    log.red("app directory at project root is required");
    process.exit(1);
  }

  if (!hasTailwindCSS()) {
    log.red("tailwindcss is required");
    process.exit(1);
  }

  if (!hasTsConfig()) {
    log.red("typescript is required");
    process.exit(1);
  }
}
