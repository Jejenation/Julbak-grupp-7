import { useState, useEffect } from "react";
import { calculateDifficulty, getAllRecipes } from "../services/recipeService";
import './RecipeList.css'

const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('search') || '';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then(data => setRecipes(data))
            .catch(errMsg => console.error('Error:',errMsg));
    }, []);

    const filteredRecipes = searchQuery
        ? recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        )
        : recipes;

    return (
        <div>
            <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <img src={recipe.imageUrl} alt={recipe.title} /> {/*Have to replace the placeholder Urls in database */}
                        <h3>{recipe.title}</h3>
                        <p className="recipe-rating">Betyg: {recipe.avgRating}</p>
                        <p className="recipe-difficulty">Svårighetsgrad: {calculateDifficulty(recipe.price)}</p>
                        <p className="recipe-time">Tid: {recipe.timeInMins} min</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;