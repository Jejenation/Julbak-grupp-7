const API_BASE_URL = 'https://grupp7-xslij.reky.se';

export const getAllRecipes = async () => {
    const res = await fetch(`${API_BASE_URL}/recipes`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return res.json();
};

export const getRecipeWithCategory = async (categoryName) => {
    const res = await fetch (`${API_BASE_URL}/categories/${categoryName}/recipes`)
    return res.json();
}

export const getRecipeWithId = async (recipeId) => {
    const res = await fetch (`${API_BASE_URL}/recipes/${recipeId}`)
    return res.json();
}

//To be able to save difficulty in the API we use 'price', 
// because there where no variable for difficulty and we do not need price
export function calculateDifficulty(price) {
    let difficulty = 'Ingen svårighetsgrad';

    if (price == 1) {
        difficulty = 'Enkel'
    } else if (price == 2) {
        difficulty = 'Medel'
    } else if (price == 3) {
        difficulty = 'Svår'
    }
    return difficulty;
};

export function getIngredientCount(recipe) {
    if (!recipe || !recipe.ingredients) {
        return 0;
    }
    return recipe.ingredients.length;
}

export function filterRecipes(recipes, query) {
    if (!query) {
        return recipes;
    }
    return recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );
}

export function countByCategory(recipes) {
    const count = {};
    for (const recipe of recipes) {
        for(const category of recipe.categories || []) {
            count[category] = (count[category] || 0) + 1;
        }
    }
    return count;
}

//maybe implement to check comments
export function sanitizeText(input) {
  if (!input) return "";

  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match]);
}
