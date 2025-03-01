import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import preserveDirectives from "rollup-preserve-directives";

// import packageJson from "./package.json" assert { type: "json" };

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "src/index.ts",
    output: [
      {
        // file: packageJson.main,
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.cjs.json",
      }),
      preserveDirectives(),
    ],
  },
  {
    input: "dist/cjs/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "cjs" }],
    plugins: [dts()],
  },
];
