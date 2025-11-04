import { useEffect, useState } from "react";
import "./Herosection.css";
import { getAllRecipes } from "../services/recipeService";
import { useNavigate, useSearchParams } from "react-router-dom";

function HeroSection() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getAllRecipes().then((data) => {
      const searchQuery = searchParams.get('search');
      if (searchQuery) {
        setInput(searchQuery);
      }
      });
  }, [searchParams]);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const performSearch = () => {
    if(input) {
      navigate(`/?search=${input}`);
    } else {
      navigate('/');
    }
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
              performSearch();
            }
          }}
        />
        <button
          className="search-button"
          onClick={performSearch}
        >
          Sök
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
