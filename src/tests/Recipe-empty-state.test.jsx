import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import RecipeList from "../components/RecipeList";

vi.mock("../services/recipeService", () => ({
  getAllRecipes: vi
    .fn()
    .mockRejectedValue(new Error("Failed to fetch recipes")),
}));

describe("RecipeList API failure", () => {
  it("shows empty state when API fails", async () => {
    render(
      <MemoryRouter>
        <RecipeList />
      </MemoryRouter>
    );
    expect(
      await screen.findByText("Inga recept tillgängliga")
    ).toBeInTheDocument();
  });
});

vi.mock("../services/recipeService", () => ({
  getAllRecipes: vi.fn().mockResolvedValue([]),
}));

describe("RecipeList empty state", () => {
  it("Shows message when there are no recipes available", async () => {
    render(
      <MemoryRouter>
        <RecipeList />
      </MemoryRouter>
    );
    expect(
      await screen.findByText("Inga recept tillgängliga")
    ).toBeInTheDocument();
  });
});
