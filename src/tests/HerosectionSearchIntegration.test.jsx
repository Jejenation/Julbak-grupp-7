// src/tests/HerosectionSearchIntegration.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage";
import { vi, it, expect, describe } from "vitest";
import "@testing-library/jest-dom";

// Mocka recipeService direkt inline för att undvika hoisting-problem
vi.mock("../services/recipeService", () => ({
  getAllRecipes: vi.fn().mockResolvedValue([
    { _id: "1", title: "Knäckkola", imageUrl: "https://i.imgur.com/7HUcUtm.jpeg", avgRating: 4.2, price: 1, timeInMins: 30, categories: ["Julgodis"] },
    { _id: "4", title: "Chokladpraliner", imageUrl: "https://i.imgur.com/7HUcUtm.jpeg", avgRating: 4.2, price: 1, timeInMins: 30, categories: ["Julgodis"] },
    { _id: "2", title: "Lussebullar", imageUrl: "https://i.imgur.com/wF8ucWV.jpeg", avgRating: 4, price: 2, timeInMins: 120, categories: ["Bullar"] },
    { _id: "3", title: "Pepparkakor", imageUrl: "https://i.imgur.com/nQAhVrt.jpeg", avgRating: 5, price: 3, timeInMins: 30, categories: ["Kakor"] },
  ]),

    fetchCategories: vi.fn().mockResolvedValue([
    { name: "Julgodis", count: 2 },
    { name: "Bullar", count: 1 },
    { name: "Kakor", count: 1 }
  ]),
  
  countByCategory: vi.fn().mockReturnValue({ Julgodis: 2, Bullar: 1, Kakor: 1 }),
  calculateDifficulty: vi.fn((price) => (price === 1 ? "Enkel" : price === 2 ? "Medel" : "Svår")),
}));

describe("Homepage integration test - search functionality", () => {
  const allTitlesRegex = /Knäckkola|Chokladpraliner|Lussebullar|Pepparkakor/i;

  it("filters recipes based on search and resets when cleared", async () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    // Kontrollera att alla recept renderas
    const initialRecipes = await screen.findAllByText(allTitlesRegex);
    expect(initialRecipes).toHaveLength(4);

    // Kontrollera att kategorier visas korrekt
    const categories = [
      { name: "Bullar", count: 1 },
      { name: "Kakor", count: 1 },
      { name: "Julgodis", count: 2 },
    ];
    categories.forEach(({ name, count }) => {
      expect(screen.getByText(`${name} (${count})`)).toBeInTheDocument();
    });

    // Sök efter "choklad"
    const searchInput = screen.getByPlaceholderText(/Vad vill du baka idag?/i);
    fireEvent.change(searchInput, { target: { value: "choklad" } });

    const filteredRecipes = await screen.findAllByText(/choklad/i);
    expect(filteredRecipes).toHaveLength(1);

    // Rensa sökning
    fireEvent.change(searchInput, { target: { value: "" } });

    const resetRecipes = await screen.findAllByText(allTitlesRegex);
    expect(resetRecipes).toHaveLength(4);
  });
});
