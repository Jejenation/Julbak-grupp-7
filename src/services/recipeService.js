const API_BASE_URL = 'https://grupp7-xslij.reky.se';

export const getAllRecipes = async () => {
    const res = await fetch(`${API_BASE_URL}/recipes`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return res.json();
};

export const getRecipeById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch recipe');
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