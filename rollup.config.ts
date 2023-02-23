/** @format */

import {InputOption} from "./node_modules/.pnpm/rollup@3.17.2/node_modules/rollup/dist/rollup.d";
/** @format */

import path from "path";
import pkg from "./package.json";
import {watch, rollup, OutputOptions, RollupOptions} from "rollup";
import terser from "@rollup/plugin-terser";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import {argv, argv0} from "process";

const deps = Object.keys(pkg.devDependencies || {});

const buildOptions: RollupOptions | InputOption = {
  input: path.resolve(__dirname, `./src/extension.ts`),
  plugins: [
    terser(),
    nodeResolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          sourceMap: true,
        },
        include: ["src/**/*"],
        exclude: ["node_modules"],
      },
      abortOnError: false,
    }),
  ],
  external(id) {
    return deps.some(
      (k) =>
        (new RegExp(k).test(id) && id.includes("node_modules")) ||
        id.includes("vscode")
    );
  },
};

const getArgv = () => {
  const arg = argv
    .filter((_) => _.includes("="))
    .map((_) => _.replace("--", "").split("="));
  return Object.fromEntries(arg);
};

const outOptions: OutputOptions = {
  format: "cjs",
  file: path.resolve(__dirname, "out/extension.js"),
  name: pkg.name,
  sourcemap: true,
};

const runBuild = async () => {
  const {w} = getArgv();

  if (w === "true") {
   const watcher =  watch({
      input: buildOptions as InputOption,
      output: outOptions,
    });

    watcher.on('change',(id)=>{
      console.log(id);
    });
  } else {
    const build = await rollup(buildOptions);
    build.write(outOptions);
  }
};



runBuild();
