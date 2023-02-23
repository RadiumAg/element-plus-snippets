import path from "path";
import pkg from "./package.json";
import {rollup, watch} from "rollup";
import terser from "@rollup/plugin-terser";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const deps = Object.keys(pkg.devDependencies || {});

const runBuild = async () => {
  watch({
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
      return deps.some((k) => new RegExp("^" + k).test(id));
    },
    output:{
      format: "cjs", // umd格式
      file: path.resolve(__dirname, "out/extension.js"), // 输出文件
      name: pkg.name, // 指定name
      sourcemap: true,
    }
  });
};

runBuild();
