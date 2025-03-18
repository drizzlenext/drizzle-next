#!/usr/bin/env node

import { Command, Option } from "commander";
import packageJson from "../package.json";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import matter from "gray-matter";
import { exec } from "child_process";

const execAsync = promisify(exec);
const copyFileAsync = promisify(fs.copyFile);

const program = new Command();

program
  .name("drizzle-ui")
  .description("The minimalist component library used in Drizzle Next")
  .version(packageJson.version);

program
  .command("init")
  .addOption(
    new Option("-p, --package-manager <manager>")
      .choices(["npm", "pnpm", "bun", "yarn"])
      .default("npm"),
  )
  .action(async (options) => {
    try {
      const { stderr } = await execAsync(
        `${options.packageManager} i clsx tailwind-merge`,
      );
      if (stderr) {
        console.error(`${stderr}`);
        return;
      }
      const libDir = path.join(process.cwd(), "lib");
      await fs.promises.mkdir(libDir, { recursive: true });

      // copy utils
      const sourcePath = path.join(__dirname, "..", "src", "lib", "utils.ts");
      const destinationPath = path.join(process.cwd(), "lib", "utils.ts");
      await copyFileAsync(sourcePath, destinationPath);
      const relativePath = path.relative(process.cwd(), destinationPath);
      console.log(`create ${relativePath}`);

      // copy styles
      const stylesSrcPath = path.join(
        __dirname,
        "..",
        "src",
        "styles",
        "styles.css",
      );
      const tailwindConfigDestinationPath = path.join(
        process.cwd(),
        "app",
        "globals.css",
      );
      await copyFileAsync(stylesSrcPath, tailwindConfigDestinationPath);
      const relativePath2 = path.relative(
        process.cwd(),
        tailwindConfigDestinationPath,
      );
      console.log(`create ${relativePath2}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
    }
  });

program
  .command("add <components...>")
  .addOption(
    new Option("-p, --package-manager <manager>")
      .choices(["npm", "pnpm", "bun", "yarn"])
      .default("npm"),
  )
  .description("Add new components to the project")
  .action(async (components, options) => {
    try {
      const destinationDir = path.join(process.cwd(), "components", "ui");
      await fs.promises.mkdir(destinationDir, { recursive: true });

      for (const component of components) {
        const sourcePath = path.join(
          __dirname,
          "..",
          "content",
          "components",
          `${component}.md`,
        );

        const fileContent = await fs.promises.readFile(sourcePath, "utf-8");

        const { data } = matter(fileContent);

        if (data.dependencies instanceof Array) {
          for (const dep of data.dependencies) {
            console.log(`${options.packageManager} i ${dep}`);
            const { stderr } = await execAsync(
              `${options.packageManager} i ${dep}`,
            );
            if (stderr) {
              console.error(`${stderr}`);
              return;
            }
          }
        }

        if (data.dev_dependencies instanceof Array) {
          for (const dep of data.dev_dependencies) {
            console.log(`${options.packageManager} i -D ${dep}`);
            const { stderr } = await execAsync(
              `${options.packageManager} i -D ${dep}`,
            );
            if (stderr) {
              console.error(`${stderr}`);
              return;
            }
          }
        }

        if (typeof data.code === "string") {
          await copyFile(data.code);
        } else if (data.code instanceof Array) {
          for (const code of data.code) {
            await copyFile(code);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
    }
  });

program.parse();

async function copyFile(filePath: string) {
  const sourcePath = path.join(__dirname, "..", filePath);
  const codePathSegments = filePath.split("/");
  codePathSegments.shift();
  const relativeCodePath = codePathSegments.join("/");
  const destinationPath = path.join(process.cwd(), relativeCodePath);
  await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
  let fileContent = await fs.promises.readFile(sourcePath, "utf-8");
  fileContent = fileContent.replace(/\.\.\/\.\./g, "@");
  await fs.promises.writeFile(destinationPath, fileContent);
  console.log(`create ${relativeCodePath}`);
}
