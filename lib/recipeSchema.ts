import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  baseQuantity: z.number(),
  unit: z.string(),
  scalesWithServings: z.boolean(),
});

export const stepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  ingredientRefs: z.array(z.string()),
  timerSeconds: z.number().optional(),
});

export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string(),
  country: z.string(),
  heroImage: z.string(),
  baseServings: z.number(),
  ingredients: z.array(ingredientSchema),
  steps: z.array(stepSchema),
  sources: z.array(z.string()).optional(),
});

export type ValidatedRecipe = z.infer<typeof recipeSchema>;