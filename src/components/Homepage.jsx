import RecipeList from "./RecipeList";
import HeroSection from "./Herosection";
import "./Homepage.css";
import { useEffect, useState } from "react";
import { countByCategory, getAllRecipes } from "../services/recipeService";
import { NavLink, Link } from "react-router-dom";

function Homepage() {
  console.log("Homepage render");
  const [categoryCount, setCategoryCount] = useState({});

  useEffect(() => {
    getAllRecipes().then(data => {
      const count = countByCategory(data);
      setCategoryCount(count);
    });
  }, []);

    return (
        <div className="homepage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/" className='chosen-page'>Hem</NavLink>
                    <NavLink to="/categories">Kategorier</NavLink>
                </nav>
            </header>

      {/*Hero section here */}
      <div className="hero-section">
        <HeroSection />
      </div>

            {/*Category here */}
            <div className="category-placeholder">
                <Link to="/categories/bullar"><h2>Bullar ({categoryCount.Bullar || 0})</h2></Link>
                <Link to="/categories/kakor"><h2>Kakor ({categoryCount.Kakor || 0})</h2></Link>
                <Link to="/categories/julgodis"><h2>Julgodis ({categoryCount.Julgodis || 0})</h2></Link>
            </div>

      {/* change for recipe cards*/}
      <RecipeList />
    </div>
  );
}

export default Homepage;
