import type { Ingredient } from "@/lib/types";

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <span>{ingredient.name}</span>
          <span>
            {ingredient.baseQuantity} {ingredient.unit}
          </span>
        </li>
      ))}
    </ul>
  );
}