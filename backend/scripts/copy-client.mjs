import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const clientDistDir = path.resolve(rootDir, "../client/dist");
const targetDir = path.resolve(rootDir, "./dist/public");

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });
await cp(clientDistDir, targetDir, { recursive: true });

console.log("Copied client build to backend/dist/public");
