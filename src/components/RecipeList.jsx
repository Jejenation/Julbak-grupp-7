import { useState, useEffect } from "react";
import { getAllRecipes } from "../services/recipeService";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then(data => setRecipes(data))
            .catch(errMsg => console.error('Error:',errMsg));
    }, []);

    return (
        <div>
            <h1>Våra recept</h1>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <img src={recipe.imageUrl} alt={recipe.title} /> {/*Have to replace the placeholder Urls in database */}
                        <p>{recipe.description}</p>
                        <p>Antal ingredienser: {recipe.ingredients.length}</p>
                        <p>Tid: {recipe.timeInMins} min</p>
                        <p>Betyg: {recipe.avgRating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;