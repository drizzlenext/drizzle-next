#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "../package.json";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const program = new Command();

program
  .name("drizzle-ui")
  .description("The minimalist component library used in Drizzle Next")
  .version(packageJson.version);

// const execAsync = promisify(exec);
const copyFileAsync = promisify(fs.copyFile);

program.command("init").action(async () => {
  try {
    // const { stdout, stderr } = await execAsync("npm i clsx tailwind-merge");
    // if (stderr) {
    //   console.error(`Stderr: ${stderr}`);
    //   return;
    // }
    // console.log(`Stdout: ${stdout}`);

    const libDir = path.join(process.cwd(), "lib");
    await fs.promises.mkdir(libDir, { recursive: true });

    // copy utils
    const sourcePath = path.join(__dirname, "..", "src", "lib", "utils.ts");
    const destinationPath = path.join(process.cwd(), "lib", "utils.ts");
    await copyFileAsync(sourcePath, destinationPath);
    console.log("utils.ts copied successfully.");

    // copy styles
    const stylesSrcPath = path.join(__dirname, "..", "src", "styles.css");
    const tailwindConfigDestinationPath = path.join(
      process.cwd(),
      "app",
      "globals.css",
    );
    await copyFileAsync(stylesSrcPath, tailwindConfigDestinationPath);
    console.log("globals.css copied successfully.");
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
  .description("Add new components to the project")
  .action(async (components) => {
    try {
      const destinationDir = path.join(process.cwd(), "components", "ui");
      await fs.promises.mkdir(destinationDir, { recursive: true });

      for (const component of components) {
        const destinationPath = path.join(destinationDir, `${component}.tsx`);
        const sourcePath = path.join(
          __dirname,
          "..",
          "src",
          "components",
          "ui",
          `${component}.tsx`,
        );

        let fileContent = await fs.promises.readFile(sourcePath, "utf-8");
        fileContent = fileContent.replace(/.\/cn/g, "@/lib/utils");

        await fs.promises.writeFile(destinationPath, fileContent);
        console.log(`${component}.tsx file copied successfully.`);
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
