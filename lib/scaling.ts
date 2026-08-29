export interface ScalableIngredient {
  baseQuantity: number;
  unit: string;
  scalesWithServings: boolean;
}

const UNIT_ROUNDING: Record<string, number> = {
  tsp: 0.25,
  tbsp: 0.25,
  cup: 0.25,
  g: 5,
  ml: 5,
  kg: 0.05,
  piece: 1,
  sprig: 1,
  pinch: 1,
};

const DEFAULT_ROUNDING = 0.25;

export function roundToCooking(quantity: number, unit: string): number {
  const increment = UNIT_ROUNDING[unit] ?? DEFAULT_ROUNDING;
  const rounded = Math.round(quantity / increment) * increment;
  return Math.round(rounded * 100) / 100;
}

export function scaleQuantity(
  ingredient: ScalableIngredient,
  selectedServings: number,
  baseServings: number,
): number {
  if (baseServings <= 0) {
    throw new Error(`baseServings must be positive, got ${baseServings}`);
  }
  if (selectedServings <= 0) {
    throw new Error(`selectedServings must be positive, got ${selectedServings}`);
  }

  const raw = ingredient.scalesWithServings
    ? ingredient.baseQuantity * (selectedServings / baseServings)
    : ingredient.baseQuantity;

  return roundToCooking(raw, ingredient.unit);
}