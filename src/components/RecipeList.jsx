import { useState, useEffect } from "react";
import {
  calculateDifficulty,
  getAllRecipes,
  getIngredientCount,
} from "../services/recipeService";
import "./RecipeList.css";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  //reading URL http://localhost:5173/?search=bullar
  const searchParams = new URLSearchParams(window.location.search);
  //search value from URL bullar
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    getAllRecipes()
      .then((data) => setRecipes(data))
      .catch((errMsg) => console.error("Error:", errMsg));
  }, []);

  const filteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    : recipes;

  return (
    <div>
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p className="recipe-rating">Betyg: {recipe.avgRating}</p>
              <p className="recipe-difficulty">
                Svårighetsgrad: {calculateDifficulty(recipe.price)}
              </p>
              <p className="recipe-time">Tid: {recipe.timeInMins} min</p>
              <p className="recipe-ingredients">
                Ingredienser: {getIngredientCount(recipe)}
              </p>
            </div>
          ))
        ) : searchQuery ? (
          <p>Inga recept hittades för "{searchQuery}"</p>
        ) : (
          <p>Inga recept tillgängliga</p>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
