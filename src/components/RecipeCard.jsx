import "./RecipeCard.css";
import {
  calculateDifficulty,
} from "../services/recipeService";
import PropTypes from "prop-types";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p className="recipe-rating">
        Betyg: {recipe.avgRating ? recipe.avgRating.toFixed(1) : "0.0"}
      </p>
      <p className="recipe-difficulty">
        Svårighetsgrad: {calculateDifficulty(recipe.price)}
      </p>
      <p className="recipe-time">Tid: {recipe.timeInMins} min</p>
      {/*<p className="recipe-ingredients">
        Ingredienser: {getIngredientCount(recipe)}
      </p> */}
    </div>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    avgRating: PropTypes.number,
    price: PropTypes.number,
    timeInMins: PropTypes.number,
    /*ingredients: PropTypes.array,*/
  }).isRequired,
};

export default RecipeCard;
