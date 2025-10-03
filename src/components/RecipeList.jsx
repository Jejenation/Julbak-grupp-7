import { useState, useEffect } from "react";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('https://grupp7-xslij.reky.se/recipes')
        .then(res => res.json())
        .then(data => {
            console.log('Recipes:', data);
            setRecipes(data);
        });
    }, []);

    return (
        <div>
            <h1>Våra recept</h1>
            {recipes.map(recipe => (
                <div key={recipe._id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;