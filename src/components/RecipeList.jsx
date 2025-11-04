import { useState, useEffect } from "react";
import { getAllRecipes, filterRecipes } from "../services/recipeService";
import "./RecipeList.css";
import RecipeCard from "./RecipeCard";

function RecipeList({ searchQuery = "" }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes()
      .then((data) => setRecipes(data))
      .catch((error_) => console.error("Error:", error_));
  }, []);

  const displayedRecipes = searchQuery
    ? filterRecipes(recipes, searchQuery)
    : recipes;

  return (
    <div>
      <div className="recipe-grid">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
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
