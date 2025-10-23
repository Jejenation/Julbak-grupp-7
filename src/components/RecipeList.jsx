import { useState, useEffect } from "react";
import {
  calculateDifficulty,
  getAllRecipes,
  getIngredientCount,
} from "../services/recipeService";
import "./RecipeList.css";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

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
            <Link to={`/recipe/${recipe._id}`} />
            <RecipeCard key={recipe._id} recipe={recipe} />
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
