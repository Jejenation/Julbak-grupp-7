import { describe, it, expect } from "vitest";
import { filterRecipes } from "../services/recipeService";

describe("filterRecipes", () => {
    const recipes = [
        {title: 'Lussebullar', _id: '1'},
        {title: 'Pepparkakstryffel', _id: '2'},
        {title: 'Pepparkakor', _id: '3'},
        {title: 'Knäckkola', _id: '4'},
    ];
    it('filter recipes case-insensitively', () => {
        expect(filterRecipes(recipes, 'LUSSEBULLAR')).toHaveLength(1);
        expect(filterRecipes(recipes, 'pepparkakor')).toHaveLength(1);
        expect(filterRecipes(recipes, 'KNÄCKkola')).toHaveLength(1);
        expect(filterRecipes(recipes, 'PEPPARKAKsTryffeL')).toHaveLength(1);
    });
});