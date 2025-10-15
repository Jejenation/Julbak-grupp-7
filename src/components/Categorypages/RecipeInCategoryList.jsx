import { useState, useEffect } from "react";
import { getRecipeWithCategory }  from "../../services/recipeService";

function RecipeInCategorypage(category) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipeWithCategory(category)
            .then(data => setRecipes(data))
            .catch(errMsg => console.error('Error:',errMsg));
    }, []);

    return (
        <div>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <h1 className="recipe-category-title">{recipe.categories}</h1>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.imageUrl} alt={recipe.title} /> {/*Have to replace the placeholder Urls in database */}
                        <p>Betyg: {recipe.avgRating}</p>
                        <p>Tid: {recipe.timeInMins} min</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeInCategorypage;