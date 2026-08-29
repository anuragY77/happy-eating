export interface Ingredient {
  id: string;
  name: string;
  image: string;
  baseQuantity: number;
  unit: string;
  scalesWithServings: boolean;
}

export interface Step {
  order: number;
  instruction: string;
  ingredientRefs: string[];
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  name: string;
  state: string;
  country: string;
  heroImage: string;
  baseServings: number;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface Region {
  state: string;
  country: string;
  photo: string;
  ambientAudio?: string;
}
