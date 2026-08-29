import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { recipeSchema, type ValidatedRecipe } from "./recipeSchema";

const recipesDir = path.join(process.cwd(), "data", "recipes");

function loadRecipeFile(fileName: string): ValidatedRecipe | null {
  const filePath = path.join(recipesDir, fileName);
  const raw = readFileSync(filePath, "utf-8");
  const parsed = recipeSchema.safeParse(JSON.parse(raw));

  if (parsed.success) {
    return parsed.data;
  }

  if (process.env.NODE_ENV !== "production") {
    throw new Error(`Invalid recipe data in ${fileName}: ${parsed.error.message}`);
  }

  console.warn(`Skipping invalid recipe file ${fileName}: ${parsed.error.message}`);
  return null;
}

export function getAllRecipes(): ValidatedRecipe[] {
  const files = readdirSync(recipesDir).filter((f) => f.endsWith(".json"));
  return files
    .map(loadRecipeFile)
    .filter((r): r is ValidatedRecipe => r !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRecipeById(id: string): ValidatedRecipe | undefined {
  const fileName = `${id}.json`;
  if (!existsSync(path.join(recipesDir, fileName))) {
    return undefined;
  }
  return loadRecipeFile(fileName) ?? undefined;
}

export function imageAssetExists(publicPath: string): boolean {
  if (!publicPath || !publicPath.startsWith("/")) {
    return false;
  }
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}