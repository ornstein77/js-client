import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(path.join(rootDir, "index.html"), path.join(distDir, "index.html"));

console.log("Client build complete: dist/index.html");
