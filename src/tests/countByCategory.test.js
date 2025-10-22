import { describe, it, expect } from "vitest";
import { countByCategory } from "../services/recipeService";

describe("countByCategory", () => {
    const recipes = [
        {title: 'Lussebullar', categories: ['Bullar']},
        {title: 'Saftig saffranskaka', categories: ['Bullar']},
        {title: 'Mjuk pepparkaka', categories: ['Bullar']},
        {title: 'Pepparkakor', categories: ['Kakor']},
    ];
    it('filter recipes case-insensitively', () => {
        const result = countByCategory(recipes);

        expect(result).toEqual({Bullar: 3, Kakor: 1});
    });
});