import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import HomePage from "../components/Homepage.jsx";
vi.mock("../services/recipeService", () => ({
  getAllRecipes: vi.fn().mockResolvedValue([
    {
      _id: "1",
      title: "Knäckkola",
      imageUrl: "https://i.imgur.com/7HUcUtm.jpeg",
      avgRating: 4.2,
      price: 1,
      timeInMins: 30,
      categories: ["Julgodis"],
    },

    {
      _id: "2",
      title: "Lussebullar",
      imageUrl: "https://i.imgur.com/wF8ucWV.jpeg",
      avgRating: 4,
      price: 2,
      timeInMins: 120,
      categories: ["Bullar"],
    },

    {
      _id: "3",
      title: "Pepparkakor",
      imageUrl: "https://i.imgur.com/nQAhVrt.jpeg",
      avgRating: 5,
      price: 3,
      timeInMins: 30,
      categories: ["Kakor"],
    },
  ]),
  countByCategory: vi
    .fn()
    .mockReturnValue({ Julgodis: 1, Bullar: 1, Kakor: 1 }),
  calculateDifficulty: vi.fn().mockImplementation((price) => {
    if (price === 1) return "Enkel";
    if (price === 2) return "Medel";
    if (price === 3) return "Svår";
  }),
}));

describe("HomePage integration test", () => {
  it("Homepage loads and renders recipe cards and category list", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    //Titles
    expect(await screen.findByText("Knäckkola")).toBeInTheDocument();
    expect( screen.getByText("Lussebullar")).toBeInTheDocument();
    expect( screen.getByText("Pepparkakor")).toBeInTheDocument();
    
    //Category list
    expect(await screen.findByText(/Bullar \(1\)/)).toBeInTheDocument();
    expect( screen.getByText(/Kakor \(1\)/)).toBeInTheDocument();
    expect( screen.getByText(/Julgodis \(1\)/)).toBeInTheDocument();
  });
});
