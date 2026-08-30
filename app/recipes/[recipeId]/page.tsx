import { notFound } from "next/navigation";
import RecipeDetail from "@/components/RecipeDetail";
import { getRecipeById, imageAssetExists } from "@/lib/recipes";

export default function RecipePage({ params }: { params: { recipeId: string } }) {
  const recipe = getRecipeById(params.recipeId);
  if (!recipe) {
    notFound();
  }

  const ingredientImagesAvailable: Record<string, boolean> = {};
  for (const ingredient of recipe.ingredients) {
    ingredientImagesAvailable[ingredient.id] = imageAssetExists(ingredient.image);
  }

  return (
    <main>
      <RecipeDetail
        key={recipe.id}
        recipe={recipe}
        heroAvailable={imageAssetExists(recipe.heroImage)}
        ingredientImagesAvailable={ingredientImagesAvailable}
      />
    </main>
  );
}