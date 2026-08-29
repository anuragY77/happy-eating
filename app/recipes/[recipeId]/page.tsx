import { notFound } from "next/navigation";
import IngredientList from "@/components/IngredientList";
import StepList from "@/components/StepList";
import { getRecipeById, imageAssetExists } from "@/lib/recipes";

export default function RecipePage({ params }: { params: { recipeId: string } }) {
  const recipe = getRecipeById(params.recipeId);
  if (!recipe) {
    notFound();
  }

  const heroAvailable = imageAssetExists(recipe.heroImage);

  return (
    <main>
      <article>
        <h1>{recipe.name}</h1>
        <p>
          {recipe.state}, {recipe.country} · base servings {recipe.baseServings}
        </p>
        {heroAvailable ? (
          <img src={recipe.heroImage} alt={`${recipe.name} hero`} />
        ) : (
          <div className="image-placeholder">Recipe photo coming soon</div>
        )}
        <h2>Ingredients</h2>
        <IngredientList ingredients={recipe.ingredients} />
        <h2>Steps</h2>
        <StepList steps={recipe.steps} ingredients={recipe.ingredients} />
      </article>
    </main>
  );
}