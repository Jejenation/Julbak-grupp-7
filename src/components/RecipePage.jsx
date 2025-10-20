import { useState, useEffect } from 'react';
import './RecipePage.css';
import { getAllRecipes, calculateDifficulty, rateRecipe } from '../services/recipeService';

function RecipePage() {
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rating, setRating] = useState(0);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getAllRecipes()
        .then(data => {
            setSelectedRecipe(data[0]); // Temporarily selects the first recipe
        })
        .catch(err => console.error('Fel vid hämtning:', err));
    }, []);

    const handleRatingClick = async (star) => {
        if (!selectedRecipe) return;

        setRating(star);
        setSaving(true);

        try {
            await rateRecipe(selectedRecipe.id, star);
            console.log(`Betyg ${star} sparat för recept ${selectedRecipe.id}`);
        } catch (error) {
            console.error('Kunde inte spara betyg:', error);
        } finally {
            setSaving(false);
        }
    };

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
                    <h1 className="recipe-title-main">Recept</h1>

                    <div className="recipe-content">
                        <div className="recipe-left">
                            <img
                            src={selectedRecipe.imageUrl}
                            alt={selectedRecipe.title}
                            className="recipe-image"
                            />
                        </div>

                        <div className="recipe-right">
                            <h2 className="recipe-title">{selectedRecipe.title}</h2>
                            <p><strong>Svårighetsgrad:</strong> {calculateDifficulty(selectedRecipe.price)}</p>
                            <p><strong>Tid:</strong> {selectedRecipe.timeInMins} min</p>
                        </div>
                    </div>

                    <div className="recipe-sections">
                        <div className="ingredients">
                            <h3>Ingredienser</h3>
                            <ul>
                                {selectedRecipe.ingredients?.map((ing, index) => (
                                    // Using array index as key is acceptable here since:
                                    //-The ingredient list is static and wont be recordered
                                    //-Each render produces the same items in the same order
                                    // If list order or content becomes dynamic later, use a unique ID instead.
                                    <li key={index}>
                                        {ing.amount} {ing.unit} {ing.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="instructions">
                            <h3>Tillagning</h3>
                            <ol>
                                {selectedRecipe.instructions?.map((step, index) => (
                                    // Using array index as key is acceptable here since:
                                    //-The ingredient list is static and wont be recordered
                                    //-Each render produces the same items in the same order
                                    // If list order or content becomes dynamic later, use a unique ID instead.
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="recipe-rating">
                        <h3>Betygsätt detta recept:</h3>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={star <= rating ? "star filled" : "star"}
                                onClick={() => handleRatingClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        {saving && <p>Sparar betyg...</p>}
                    </div>
                    
                    {/* Comment field */}
                    <div classname="comment-section">
                        <h3>Kommentar</h3>
                        <textarea
                        className="comment-box"
                        placeholder="Lämna en kommentar"
                        ></textarea>
                        <button className="comment-button">Skicka kommentar</button>
                    </div>
                </div>    
            ) : (
                <p>Laddar recept...</p>        
            )}
        </div>
    );
}

export default RecipePage;