import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const viteOutput = resolve(root, "dist");
const packageRoot = resolve(root, ".sites-build");
const runtimeRoot = resolve(packageRoot, "dist");

await rm(packageRoot, { recursive: true, force: true });
await mkdir(resolve(runtimeRoot, "client"), { recursive: true });
await mkdir(resolve(runtimeRoot, "server"), { recursive: true });
await mkdir(resolve(runtimeRoot, ".openai"), { recursive: true });
await mkdir(resolve(packageRoot, ".openai"), { recursive: true });

await cp(viteOutput, resolve(runtimeRoot, "client"), { recursive: true });
await cp(
  resolve(root, ".openai", "sites-worker.js"),
  resolve(runtimeRoot, "server", "index.js"),
);
await cp(
  resolve(root, ".openai", "hosting.json"),
  resolve(runtimeRoot, ".openai", "hosting.json"),
);
await cp(
  resolve(root, ".openai", "hosting.json"),
  resolve(packageRoot, ".openai", "hosting.json"),
);

console.log(`Sites artifact prepared at ${packageRoot}`);
