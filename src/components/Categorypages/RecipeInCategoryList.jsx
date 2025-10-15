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
            <div className="category-recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="category-recipe-card">
                        {/*<h1 className="recipe-category-title">{recipe.categories}</h1>*/}
                        <img src={recipe.imageUrl} alt={recipe.title} /> {/*Have to replace the placeholder Urls in database */}
                        <div className="category-recipe-card-child">
                        <h3>{recipe.title}</h3>
                        <p>Betyg: {recipe.avgRating}</p>
                        <p>Tid: {recipe.timeInMins} min</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeInCategorypage;