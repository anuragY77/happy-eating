import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { recipeSchema } from "../lib/recipeSchema.ts";

const dir = path.join(process.cwd(), "data", "recipes");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort();

let failed = 0;
for (const file of files) {
  const raw = readFileSync(path.join(dir, file), "utf-8");
  const parsed = recipeSchema.safeParse(JSON.parse(raw));

  if (parsed.success) {
    console.log(`OK   ${file} -> "${parsed.data.name}" (${parsed.data.id})`);
  } else {
    failed += 1;
    console.error(`FAIL ${file}`);
    console.error(JSON.stringify(parsed.error.issues, null, 2));
  }
}

if (failed > 0) {
  console.error(`\n${failed} of ${files.length} recipe files failed validation.`);
  process.exit(1);
}

console.log(`\nAll ${files.length} recipe files validated OK.`);