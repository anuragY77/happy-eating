"use client";

import { useState } from "react";
import { scaleQuantity } from "@/lib/scaling";
import type { Recipe } from "@/lib/types";
import IngredientList from "./IngredientList";
import ServingsSelector from "./ServingsSelector";
import StepList from "./StepList";

interface RecipeDetailProps {
  recipe: Recipe;
  heroAvailable: boolean;
}

export default function RecipeDetail({ recipe, heroAvailable }: RecipeDetailProps) {
  const [selectedServings, setSelectedServings] = useState(recipe.baseServings);

  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    baseQuantity: scaleQuantity(ingredient, selectedServings, recipe.baseServings),
  }));

  return (
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
      <ServingsSelector value={selectedServings} onChange={setSelectedServings} />
      <IngredientList ingredients={scaledIngredients} />
      <h2>Steps</h2>
      <StepList steps={recipe.steps} ingredients={scaledIngredients} />
    </article>
  );
}