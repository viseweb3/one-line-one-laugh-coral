// One Line, One Laugh — make.fun
// A single hilarious line, at most 200 characters.
// Running this program writes the line to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "I asked the AI to write my dating profile, and it described me as 'low-maintenance, high-latency, and emotionally unavailable since the last update.'";

// The bounty caps the entry at 200 characters and exactly one line.
if (line.length === 0) throw new Error("entry line must not be empty");
if (line.length > 200) {
  throw new Error(`entry line is ${line.length} chars, over the 200-char cap`);
}
if (line.includes("\n") || line.trim() !== line) {
  throw new Error("entry must be exactly one line with no leading/trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("entry must not contain control characters");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
// Read back what we wrote: the file must hold exactly the line, nothing else.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`Wrote ${line.length} chars to ${outDir}/entry.txt`);
console.log(line);
