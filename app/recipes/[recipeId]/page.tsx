import { notFound } from "next/navigation";
import RecipeDetail from "@/components/RecipeDetail";
import { getRecipeById, imageAssetExists } from "@/lib/recipes";

export default function RecipePage({ params }: { params: { recipeId: string } }) {
  const recipe = getRecipeById(params.recipeId);
  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <RecipeDetail key={recipe.id} recipe={recipe} heroAvailable={imageAssetExists(recipe.heroImage)} />
    </main>
  );
}