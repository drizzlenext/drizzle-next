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
    input: "components/index.ts",
    output: [
      {
        // file: packageJson.module,
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.esm.json",
      }),
      preserveDirectives(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
