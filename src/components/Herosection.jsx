import { useEffect, useState } from "react";
import "./Herosection.css";
import { getAllRecipes, filterRecipes } from "../services/recipeService";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  //Input
  const [input, setInput] = useState("");
  //recipes
  const [allRecipes, setAllRecipes] = useState([]);
  //results
  const [results, setResults] = useState([]);
  //category
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

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
    const filtered = filterRecipes(allRecipes, value);
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
              navigate(`/?search=${input}`);
            }
          }}
        />
        <button
          className="search-button"
          tabIndex={-1}
          onClick={() => {
            if (input) {
              navigate(`/?search=${input}`);
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
                      navigate(`/categories/${result.name}`);
                    } else {
                      navigate(`/recipe/${result._id}`);
                    }
                  }}
                  //Pressing enter will search
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (result.type === "category") {
                        navigate(`/categories/${result.name}`);
                      } else {
                        navigate(`/recipe/${result._id}`);
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
