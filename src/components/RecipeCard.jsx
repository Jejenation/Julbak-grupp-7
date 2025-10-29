import "./RecipeCard.css";
import {
  calculateDifficulty,
  getIngredientCount,
} from "../services/recipeService";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p className="recipe-rating">Betyg: {Number(recipe.avgRating).toFixed(1)}</p>
      <p className="recipe-difficulty">
        Svårighetsgrad: {calculateDifficulty(recipe.price)}
      </p>
      <p className="recipe-time">Tid: {recipe.timeInMins} min</p>
      <p className="recipe-ingredients">
        Ingredienser: {getIngredientCount(recipe)}
      </p>
    </div>
  );
}

export default RecipeCard;
