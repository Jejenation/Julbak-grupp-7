/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeList from "../components/RecipeList.jsx";
import "@testing-library/jest-dom";
import { vi, describe, it, expect } from "vitest";

vi.mock("../services/recipeService", () => ({
    getAllRecipes: () =>
    Promise.resolve([
      { _id: "1", title: "Knäckkola", avgRating: 4.5, price: 2, timeInMins: 30},
      { _id: "2", title: "Lussebullar", avgRating: 4.3, price: 3, timeInMins: 45},
    ]),

    filterRecipes: (recipes, query) =>
       recipes.filter((r) => 
         r.title.toLowerCase().includes(query.toLowerCase())
    ),

    calculateDifficulty: (price) => {
        if (price < 2) return "Lätt";
        if (price < 4) return "Medel";
        return "Svår";
    },
}));

describe("Integration Test: URL-parameter q sanitiseras och UI fungerar", () => {
    it("Ignonerar skadliga script-taggar i URL-parametern och laddar sidan utan att krascha", async () => {
        render(
            <MemoryRouter initialEntries={["/?q=<script>alert(1)</script>"]}>
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText("Knäckkola")).toBeInTheDocument();
        expect(await screen.findByText("Lussebullar")).toBeInTheDocument();

        const scriptTags = document.querySelectorAll("script");
        expect(scriptTags.length).toBe(0);
    });
});