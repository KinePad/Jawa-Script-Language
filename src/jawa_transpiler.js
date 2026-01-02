import fs from "fs";
import path from "path";
import { compile } from "./compiler.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Gunakan: node transpile.js <file.jawa>");
  process.exit(1);
}

const filePath = path.resolve(args[0]);
const raw = fs.readFileSync(filePath, "utf8");

const jsCode = compile(raw);

const tempPath = path.join(process.cwd(), "temp_runtime.js");
fs.writeFileSync(tempPath, jsCode, "utf8");

import("file://" + tempPath)
  .then(() => {
    fs.unlinkSync(tempPath);
  })
  .catch(err => console.error(err));

