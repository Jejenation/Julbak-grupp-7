import { useState, useEffect } from 'react';
import './RecipePage.css';
import { calculateDifficulty, rateRecipe, getRecipeWithId, getComments, postComment } from '../services/recipeService';
import { NavLink, useParams } from 'react-router-dom';
import CommentList from './CommentList';

function RecipePage() {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rating, setRating] = useState(0);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [commentMessage, setCommentMessage] = useState('');

    const [nameError, setNameError] = useState(false);
    const [commentError, setCommentError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {_id} = useParams();

    useEffect(() => {
        getRecipeWithId(_id)
        .then(data => {
            console.log("Receptdata:", data);
            setSelectedRecipe(data); 
        })
        .catch(err => console.error('Fel vid hämtning:', err));

        //fetching comments
        getComments(_id)
        .then(data => {
            setComments(data);
        })
    }, [_id]);

    const handleRatingClick = async (star) => {
        if (!selectedRecipe) return;

        setRating(star);
        setSaving(true);

        try {
            console.log("Selected recipe:", selectedRecipe);
            await rateRecipe(selectedRecipe._id, star);
    
            setMessage("Tack för ditt betyg!⭐");
            //await loadRecipe();
            //Kan behöva lägga till funktion för att hämta senaste versionen av receptet
        } catch (err) {
            console.error("Fel:", err);
            setMessage("Nätverksfel vid sparning.");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const missingName = !name.trim();
        const missingComment = !comment.trim();

        setNameError(missingName);
        setCommentError(missingComment);

        if (missingName || missingComment) {
            setCommentMessage("Fyll i alla obligatoriska fält.");
            setTimeout(() => setCommentMessage(""), 5000);
            return;
        }

        setIsSubmitting(true);

        try {
            const newComment = await postComment(_id, name, comment);
            setComments((prev) => [...prev, newComment]);

            setName('');
            setComment('');
            setCommentMessage("Tack för din kommentar!");
        } catch (error) {
            console.error("Fel vid skickande:", error);
            setCommentMessage("Kunde inte spara kommentaren. Försök igen.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setCommentMessage(""), 5000);
        }
    };

    return (
        <div>

            <header className="header-with-categories">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                        Hem
                    </NavLink>
                    <NavLink
                        to="/categories/bullar"
                        className={({ isActive }) => 
                            isActive || selectedRecipe?.categories?.some(
                                c => c.toLowerCase() === "bullar"
                            )
                                ? "active"
                                : ""
                        }
                    >
                      Bullar
                    </NavLink>
                    <NavLink
                        to="/categories/kakor"
                        className={({ isActive }) => 
                            isActive || selectedRecipe?.categories?.some(
                                c => c.toLowerCase() === "kakor"
                            )
                                ? "active"
                                : ""
                        }
                    >
                      Kakor
                    </NavLink>
                    <NavLink
                        to="/categories/julgodis"
                        className={({ isActive }) => 
                            isActive || selectedRecipe?.categories?.some(
                                c => c.toLowerCase() === "julgodis"
                            )
                                ? "active"
                                : ""
                        }
                    >
                      Julgodis
                    </NavLink>    
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
                        <h3>Betygsätt detta recept</h3>
    
                    <div className="stars clickable" aria-label="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                            <button
                            key={star}
                            tabIndex={0}
                            className={star <= rating ? 'star filled' : 'star'}
                            onClick={() => handleRatingClick(star)}
                            onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') handleRatingClick(star); }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {saving && <p className="rating-message">Sparar betyg...</p>}
                    {message && <p className="rating-message">{message}</p>}

                    <div className="average-rating">
                        <h3>Genomsnittligt betyg:</h3>
                        <div className="recipe-rating-display">
                            <span className="star filled">★</span>
                            <span className="rating number">
                              {selectedRecipe.avgRating ? selectedRecipe.avgRating.toFixed(1) : "0.0"} 
                            </span>
                        </div>
                    </div>
                </div>    

            {/* Comment field */}
            <h3>Lämna en kommentar</h3>

            {commentMessage && (
                <div className={`popup-message ${nameError || commentError ? 'error' : 'success'}`}>
                    {commentMessage}
                </div>
            )}

            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    className={`comment-name ${nameError ? 'error' : ''}`}
                    placeholder="Ditt namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                />

                <textarea
                    className={`comment-box ${commentError ? 'error' : ''}`}
                    placeholder="Skriv din kommentar här..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={isSubmitting}
                ></textarea>

                <button type="submit" className="comment-button" disabled={isSubmitting}>
                    {isSubmitting ? "Skickar..." : "Skicka kommentar"}
                </button>         
            </form>    
        <div className='comment-list'><CommentList comments={comments}/></div>            
    </div>
    ) : (
        <p>Laddar recept...</p>        
    )}
    </div>

    );
}

export default RecipePage;
