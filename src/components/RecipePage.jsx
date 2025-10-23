import { useState, useEffect } from 'react';
import './RecipePage.css';
import { getAllRecipes, calculateDifficulty } from '../services/recipeService';
import { NavLink, useParams } from 'react-router-dom';
import { getRecipeWithId } from '../services/recipeService';

function RecipePage() {
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const {_id} = useParams();

    useEffect(() => {
        getRecipeWithId(_id)
        .then(data => {
            setSelectedRecipe(data); 
        })
        .catch(err => console.error('Fel vid hämtning:', err));
    }, [_id]);

    return (
        <div>
            <header className="recipe-header">
                {/*<div className="logo">
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
                </nav> */}
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/">Start</NavLink>
                    <NavLink to="/categories/bullar">Bullar</NavLink>
                    <NavLink to="/categories/kakor">Kakor</NavLink>
                    <NavLink to="/categories/julgodis">Julgodis</NavLink>
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
                </div>    
            ) : (
                <p>Laddar recept...</p>        
            )}
        </div>
    );
}

export default RecipePage;