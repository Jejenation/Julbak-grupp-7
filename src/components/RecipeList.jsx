import { useState, useEffect } from "react";
import { calculateDifficulty, getAllRecipes } from "../services/recipeService";
import './RecipeList.css'

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then(data => setRecipes(data))
            .catch(errMsg => console.error('Error:',errMsg));
    }, []);

    return (
        <div>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <img src={recipe.imageUrl} alt={recipe.title} /> {/*Have to replace the placeholder Urls in database */}
                        <h3>{recipe.title}</h3>
                        <p className="recipe-rating">Betyg: {recipe.avgRating}</p>
                        <p className="recipe-time">Tid: {recipe.timeInMins} min</p>
                        <p className="recipe-difficulty">Svårighetsgrad: {calculateDifficulty(recipe.price)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;