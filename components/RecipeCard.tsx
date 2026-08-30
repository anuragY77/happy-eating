import Link from "next/link";
import type { Recipe } from "@/lib/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="recipe-card">
      <h2>{recipe.name}</h2>
      <p className="recipe-card-meta">
        {recipe.state}, {recipe.country} · serves {recipe.baseServings}
      </p>
    </Link>
  );
}