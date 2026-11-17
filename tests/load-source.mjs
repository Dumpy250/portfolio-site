import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { posix } from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const cache = new Map();
// In-memory transpilation of actual source; no build, server or .next writes.
export function loadSource(path) {
  if (cache.has(path)) return cache.get(path);
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  cache.set(path, exports);
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      if (name.startsWith("@/") || name.startsWith(".")) {
        const local = name.startsWith("@/")
          ? `src/${name.slice(2)}`
          : posix.join(posix.dirname(path), name);
        for (const extension of [".ts", ".tsx"]) {
          try { return loadSource(`${local}${extension}`); }
          catch (error) { if (error.code !== "ENOENT") throw error; }
        }
        throw new Error(`Cannot resolve source import: ${name} from ${path}`);
      }
      return require(name);
    },
  }, { filename: path });
  return exports;
}
