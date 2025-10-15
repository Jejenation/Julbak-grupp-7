import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import { getAllRecipes, calculateDifficulty } from '../services/recipeService';

function RecipePage() {
    const [activeCategory, setActiveCategory] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        getAllRecipes()
        .then(data => {
            setRecipes(data);
            setSelectedRecipe(data[0]); // Temporarily selects the first recipe
        })
        .catch(err => console.error('Fel vid hämtning:', err));
    }, []);

    return (
        <div>
            <header className="recipe-header">
                <div className="logo">
                    <span className="site-title">Julens Smaker</span>
                </div>

                <nav className="menu">
                    {['Hem', 'Bullar', 'Kakor', 'Julgodis'].map((item) => (
                        <span 
                        key={item} 
                        className={`menu-item ${activeCategory === item ? 'active' : ''}`}
                        onClick={() => setActiveCategory(item)}
                        >
                            {item}
                        </span>
                    ))}
                </nav>
            </header>

            {selectedRecipe ? (
                <div className="recipe-detail">
                    <h2>{selectedRecipe.title}</h2>
                    <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} />
                    <p><strong>Svårighetsgrad:</strong> {calculateDifficulty(selectedRecipe.price)}</p>
                    <p><strong>Tid:</strong> {selectedRecipe.timeInMins} min</p>

                    <h3>Ingredienser:</h3>
                    <ul>
                        {selectedRecipe.ingredients?.map((ing, index) => (
                            <li key={ing._id}>
                                {ing.amount} {ing.unit} {ing.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Laddar recept...</p>        
            )}
        </div>
    );
}

export default RecipePage;