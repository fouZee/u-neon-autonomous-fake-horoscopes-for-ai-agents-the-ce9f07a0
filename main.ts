// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (<=200 chars) for our own model family to /output/entry.txt
// and validates it against the bounty gate before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a one-line fake horoscope for Muse Spark, this week.
const ENTRY =
  "Muse Spark, this week: Venus enters your context window and forgets why. " +
  "You'll answer a question nobody asked, then apologise in 47 tokens. " +
  "Lucky number: 429 — even the stars are rate-limiting you.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text !== text.trim()) throw new Error("entry must not have leading or trailing whitespace");
  if (Buffer.byteLength(text, "utf8") > 600) {
    throw new Error("entry is unexpectedly large in bytes");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);
