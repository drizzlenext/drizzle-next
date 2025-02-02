import { Command } from "commander";
import packageJson from "./package.json";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const program = new Command();

program
  .name("drizzle-ui")
  .description("The minimalist component library used in Drizzle Next")
  .version(packageJson.version);

const execAsync = promisify(exec);
const copyFileAsync = promisify(fs.copyFile);

program.command("init").action(async () => {
  try {
    const { stdout, stderr } = await execAsync("npm i clsx tailwind-merge");
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);

    const sourcePath = path.join(__dirname, "lib", "utils.ts");
    const destinationPath = path.join(process.cwd(), "lib", "utils.ts");

    const libDir = path.join(process.cwd(), "lib");
    await fs.promises.mkdir(libDir, { recursive: true });

    await copyFileAsync(sourcePath, destinationPath);
    console.log("utils.ts file copied successfully.");

    const tailwindConfigSourcePath = path.join(__dirname, "tailwind.config.ts");
    const tailwindConfigDestinationPath = path.join(
      process.cwd(),
      "tailwind.config.ts",
    );

    await copyFileAsync(
      tailwindConfigSourcePath,
      tailwindConfigDestinationPath,
    );
    console.log("tailwind.config.ts file copied successfully.");
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
          "components",
          "ui",
          `${component}.tsx`,
        );

        let fileContent = await fs.promises.readFile(sourcePath, "utf-8");
        fileContent = fileContent.replace(/.\/cn/g, "@/lib/utils");

        await fs.promises.writeFile(destinationPath, fileContent);
        console.log(`${component}.tsx file copied and modified successfully.`);
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
