import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
// 新增 postcss plugins
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import path from "path";

const packageJson = require("./package.json");

const customResolver = resolve({
  extensions: [".mjs", ".js", ".jsx", "tsx", ".json", ".sass", ".scss"],
});
const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      alias({
        entries: [
          { find: "@", replacement: path.resolve(projectRootDir, "src") },
        ],
        customResolver,
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true,
        modules: true,
        extensions: [".scss", ".css"],
        plugins: [
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano(),
        ],
      }),
      terser(),
      image(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
