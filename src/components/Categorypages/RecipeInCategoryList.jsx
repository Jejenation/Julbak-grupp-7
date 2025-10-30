import { useState, useEffect } from "react";
import {
  getRecipeWithCategory,
  calculateDifficulty,
} from "../../services/recipeService";
import { Link } from "react-router-dom";

function RecipeInCategorypage(category) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipeWithCategory(category)
      .then((data) => setRecipes(data))
      .catch((error_) => console.error("Error:", error_));
  }, [category]);

  return (
    <div>
      <div className="category-recipe-grid">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} className="link-style" key={recipe._id}>
            <div className="category-recipe-card">
              {/*<h1 className="recipe-category-title">{recipe.categories}</h1>*/}
              <img src={recipe.imageUrl} alt={recipe.title} />
              <div className="category-recipe-card-child">
                <h3>{recipe.title}</h3>
                <p>Betyg: {recipe.avgRating ? recipe.avgRating.toFixed(1) : "0.0"}</p>
                <p className="recipe-difficulty">
                  Svårighetsgrad: {calculateDifficulty(recipe.price)}
                </p>
                <p>Tid: {recipe.timeInMins} min</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeInCategorypage;
