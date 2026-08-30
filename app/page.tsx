import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export default function HomePage() {
  const recipes = getAllRecipes();

  return (
    <main>
      <header className="app-header">
        <h1>Happy Eating</h1>
        <p>Pick a dish and cook it like you are being served there.</p>
      </header>
      <section className="content">
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}