import fs from "fs";
import path from "path";

const dictPath = path.join(process.cwd(), "dictionary.json");
const dictionary = JSON.parse(fs.readFileSync(dictPath, "utf8"));

export function compile(code) {
  let output = code;

  for (const key in dictionary) {
    const js = dictionary[key];
    const pattern = new RegExp("\\b" + key + "\\b", "g");
    output = output.replace(pattern, js);
  }

  return output;
}
