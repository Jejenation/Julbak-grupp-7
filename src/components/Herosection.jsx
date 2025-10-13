import { useEffect, useState } from "react";
import "./Herosection.css"
import { getAllRecipes } from "../services/recipeService";


function HeroSection() {
    //Input
    const [input, setInput] = useState('');
    //recipes
    const [allRecipes, setAllRecipes] = useState([]);
    //results
    const [results, setResults] = useState([]);
    //category
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then(data => {
                setAllRecipes(data)
                const allCats = data.map(recipe => recipe.categories[0]);
                const uniqueCats = [...new Set(allCats)];
                setAllCategories(uniqueCats);
            })
    }, []);
    //search function
    const handleSearch= (e) => {
        const value = e.target.value;
        setInput(value);

        if (!value) {
            setResults([]);
            return;
        }
    //checking for matches
    const filtered = allRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(value.toLowerCase())
    );

    const filteredCategories = allCategories.filter(category =>
        category.toLowerCase().includes(value.toLowerCase())
    )
    setResults(filtered)
    console.log(results);
};

    return (
        <div className="hero">
            <img className="hero-img" src="https://i.imgur.com/spF125p.jpeg" alt="" />
          
          <div className="hero-search">
                <input
                    type="text" value={input} onChange={handleSearch}
                    placeholder="Vad vill du baka idag?"
                />
                <button className="search-button">Sök</button>
                {input.length >= 2 && (
                <ul className="hero-suggestions">
                    {results.length > 0 ? (
                        results.map((recipe) => (
                            <li key={recipe._id}
                            /*onclick here */
                            >
                                {recipe.title}
                            </li>
                        ))
                    ) : (
                        <li>Denna artikel saknas hos oss.</li>
                    )}
                
                </ul>
                )}
            </div>
            
        </div>
    )
}
export default HeroSection


// TODO
// search button will re render the homepage with updated recipecards based on the input
// clicking a recipe in the hero-suggestions will redirect you to the recipe url