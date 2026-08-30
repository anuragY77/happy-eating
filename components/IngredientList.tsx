import type { Ingredient } from "@/lib/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  imageAvailable?: Record<string, boolean>;
}

export default function IngredientList({ ingredients, imageAvailable }: IngredientListProps) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => {
        const available = imageAvailable?.[ingredient.id] ?? false;
        return (
          <li key={ingredient.id} className="ingredient-item">
            {available ? (
              <img className="ingredient-thumb" src={ingredient.image} alt={ingredient.name} />
            ) : (
              <span className="ingredient-thumb-placeholder" aria-hidden="true" />
            )}
            <span className="ingredient-name">{ingredient.name}</span>
            <span className="ingredient-quantity">
              {ingredient.baseQuantity} {ingredient.unit}
            </span>
          </li>
        );
      })}
    </ul>
  );
}