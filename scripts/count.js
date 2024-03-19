const fs = require("fs");
const text = fs.readFileSync("9_build_artifacts/plain_text_corpus.txt", { encoding: "utf-8" });

const count = (str, re) => {
  return ((str || '').match(re) || []).length
}

for (let k of "abcdefghijklmnopqrstuvwxyz") {
  console.log(k, count(text, new RegExp(k, "gi")));
}