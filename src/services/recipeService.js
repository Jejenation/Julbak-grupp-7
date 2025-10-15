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

