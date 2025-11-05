import RecipeList from "./RecipeList";
import HeroSection from "./Herosection";
import "./Homepage.css";
import { useEffect, useState } from "react";
import { countByCategory, getAllRecipes } from "../services/recipeService";
import { NavLink, Link, useSearchParams } from "react-router-dom";

function Homepage() {
  console.log("Homepage render");
  const [categoryCount, setCategoryCount] = useState({});
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    setError(null);

    getAllRecipes()
      .then((data) => {
        const count = countByCategory(data);
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
  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategories = () => {
    if (error) {
      return (
        <div className="error-container">
          <p className="error-msg">{error}</p>
          <button onClick={fetchCategories} className="retry-btn">
            Försök igen
          </button>
        </div>
      );
    }

    if (loading) {
      return <p className="loading-msg">Laddar kategorier</p>;
    }

    return (
      <div className="category-placeholder">
        <Link to="/categories/bullar">
          <h2>Bullar ({categoryCount.Bullar || 0})</h2>
        </Link>
        <Link to="/categories/kakor">
          <h2>Kakor ({categoryCount.Kakor || 0})</h2>
        </Link>
        <Link to="/categories/julgodis">
          <h2>Julgodis ({categoryCount.Julgodis || 0})</h2>
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

      {/*Hero section here */}
      <div className="hero-section">
        <HeroSection />
      </div>

      {renderCategories()}

      {/* change for recipe cards*/}
      <RecipeList searchQuery={searchQuery} />
    </div>
  );
}

export default Homepage;
