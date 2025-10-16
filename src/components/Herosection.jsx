import { useEffect, useState } from "react";
import "./Herosection.css";
import { getAllRecipes } from "../services/recipeService";

function HeroSection() {
  //Input
  const [input, setInput] = useState("");
  //recipes
  const [allRecipes, setAllRecipes] = useState([]);
  //results
  const [results, setResults] = useState([]);
  //category
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllRecipes().then((data) => {
      setAllRecipes(data);
      const allCats = data.map((recipe) => recipe.categories[0]);
      const uniqueCats = [...new Set(allCats)];
      setAllCategories(uniqueCats);
    });
  }, []);
  //search function
  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!value) {
      setResults([]);
      return;
    }
    //checking for matches via title
    const filtered = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );
    //checking category
    const filteredCategories = allCategories.filter((category) =>
      category.toLowerCase().includes(value.toLowerCase())
    );
    //
    const categoryToObject = filteredCategories.map((cat) => ({
      type: "category",
      name: cat,
    }));
    //
    const recipeToObject = filtered.map((recipe) => ({
      type: "recipe",
      ...recipe,
    }));
    //combining result
    const combined = [...categoryToObject, ...recipeToObject];
    setResults(combined);
  };

  return (
    <div className="hero">
      <img className="hero-img" src="https://i.imgur.com/spF125p.jpeg" alt="" />

      <div className="hero-search">
        <input
          type="text"
          value={input}
          onChange={handleSearch}
          placeholder="Vad vill du baka idag?"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/?search=${input}`;
            }
          }}
        />
        <button
          className="search-button"
          tabIndex={-1}
          onClick={() => {
            if (input) {
              window.location.href = `/?search=${input}`;
            }
          }}
        >
          Sök
        </button>
        {input.length >= 2 && (
          //Dropdown suggestions
          <ul className="hero-suggestions">
            {results.length > 0 ? (
              results.map((result, i) => (
                <li
                  key={i}
                  //clicking with mouse
                  onClick={() => {
                    if (result.type === "category") {
                      window.location.href = `/categories/${result.name}`;
                    } else {
                      window.location.href = `/recipe/${result._id}`;
                    }
                  }}
                  //Pressing enter will search
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (result.type === "category") {
                        window.location.href = `/categories/${result.name}`;
                      } else {
                        window.location.href = `/recipe/${result._id}`;
                      }
                    }
                  }}
                  tabIndex={0}
                >
                  {result.type === "category" ? result.name : result.title}
                </li>
              ))
            ) : (
              <li>Denna artikel saknas hos oss.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
export default HeroSection;

// TODO
// search button will re render the homepage with updated recipecards based on the input
// clicking a recipe in the hero-suggestions will redirect you to the recipe url
