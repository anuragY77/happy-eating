import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export default function HomePage() {
  const recipes = getAllRecipes();

  return (
    <main>
      <h1>Happy Eating</h1>
      <p>Pick a dish to get started.</p>
      <section className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
}