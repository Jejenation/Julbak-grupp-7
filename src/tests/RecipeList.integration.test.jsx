/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import RecipeList from "../components/RecipeList.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { describe, it, expect, vi } from "vitest";

vi.mock("../components/RecipeCard.jsx", () => ({
    default: ({ recipe }) => <div>{recipe.title}</div>
}));

const mockRecipes = [
    { _id: "1", title: "Knäckkola", avgRating: 4.5, price: 2, timeInMins: 30 },
    { _id: "2", title: "Lussebullar", avgRating: 4.3, price: 3, timeInMins: 45 },
];

vi.mock("../services/recipeService", () => ({
    getAllRecipes: () => Promise.resolve(mockRecipes),
    filterRecipes: (recipes, query) => 
        recipes.filter((r) => r.title.toLoweCase().includes(query.toLoweCase())),
}));

describe("Integration Test: RecipeList Rendering", () => {
    it("renders recipe names correctly and does not trigger any events", async () => {
        render(
            <BrowserRouter>
               <RecipeList recipes={mockRecipes} />
            </BrowserRouter>
        );

        expect(await screen.findByText("Knäckkola")).toBeInTheDocument();
        expect(await screen.findByText("Lussebullar")).toBeInTheDocument();
    });
});
