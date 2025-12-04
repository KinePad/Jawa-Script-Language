import fs from "fs";
import path from "path";
import { compile } from "./compiler.js";

export async function run(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const jsCode = compile(raw);
  const temp = path.join(process.cwd(), "temp_runtime.js");

  fs.writeFileSync(temp, jsCode, "utf8");
  const exec = await import("file://" + temp);
  return exec;
}