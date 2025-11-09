import RecipeList from "./RecipeList";
import HeroSection from "./Herosection";
import "./Homepage.css";
import { useEffect, useState } from "react";
import { fetchCategories } from "../services/recipeService";
import { NavLink, Link, useSearchParams } from "react-router-dom";

function Homepage() {
  console.log("Homepage render");
  const [categoryCount, setCategoryCount] = useState({});
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch category count from API and updates state
  const loadCategory = () => {
    setLoading(true);
    setError(null);

    fetchCategories()
      .then((data) => {
        const count = {};
        data.forEach((cat) => {
          count[cat.name] = cat.count;
        });
        setCategoryCount(count);
        setError(null);
      })
      .catch((err) => {
        console.error("Error", err);
        setError("Kunde inte ladda kategorier..");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Runs once on initial load
  useEffect(() => {
    loadCategory();
  }, []);

  //Loads if API call fails
  const renderCategories = () => {
    if (error) {
      return (
        <div className="error-container">
          <p className="error-msg">{error}</p>
          <button onClick={loadCategory} className="retry-btn">
            Försök igen
          </button>
        </div>
      );
    }

    if (loading) {
      return <p className="loading-msg">Laddar kategorier</p>;
    }

    return (
      <div className="homepage-category-titles">
        <Link to="/categories/bullar">
          <h2>Bullar ({categoryCount?.Bullar || 0})</h2>
        </Link>
        <Link to="/categories/kakor">
          <h2>Kakor ({categoryCount?.Kakor || 0})</h2>
        </Link>
        <Link to="/categories/julgodis">
          <h2>Julgodis ({categoryCount?.Julgodis || 0})</h2>
        </Link>
      </div>
    );
  };
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">Julens Smaker</div>
        <nav>
          <NavLink to="/" className="chosen-page">
            Hem
          </NavLink>
          <NavLink to="/categories">Kategorier</NavLink>
        </nav>
      </header>

      <div className="hero-section">
        <HeroSection />
      </div>

      {renderCategories()}

      <RecipeList searchQuery={searchQuery} />
    </div>
  );
}

export default Homepage;
