import { describe, it, expect } from "vitest";
import { getIngredientCount } from "../services/recipeService";

describe("getIngredientCount", () => {
  it("returns the amount of ingredients in a recipe", () => {
    const recipe = {
      title: "Lussebullar",
      ingredients: [
        { name: "mjölk", amount: 5, unit: "dl" },
        { name: "vetemjöl", amount: 0.5, unit: "g" },
      ],
    };
    expect(getIngredientCount(recipe)).toBe(2);
  });

  it("returns 0 if there are no ingredients", () => {
    const recipe = {
      title: "Knäckkola",
      ingredients: [],
    };
    expect(getIngredientCount(recipe)).toBe(0);
  });
  it("returns 0 for an empty recipe", () => {
    const recipe = {
      title: "",
      ingredients: [],
    };
    expect(getIngredientCount(recipe)).toBe(0);
  });
});
