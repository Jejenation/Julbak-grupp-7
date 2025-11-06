import { useState, useEffect } from "react";
import { getAllRecipes, filterRecipes } from "../services/recipeService";
import "./RecipeList.css";
import RecipeCard from "./RecipeCard";

function RecipeList({ searchQuery = "" }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    setLoading(true);
    setError(null);

    getAllRecipes()
      .then((data) => {
        setRecipes(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Kunde inte ladda recept.. ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const displayedRecipes = searchQuery
    ? filterRecipes(recipes, searchQuery)
    : recipes;

  if (error) {
    return (
      <div className="error-container">
        <p className="error-msg">{error}</p>
        <button onClick={fetchRecipes} className="retry-btn">
          Försök igen
        </button>
      </div>
    );
  }

  if (loading) {
    return <p>Väntar på recept...</p>;
  }

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
