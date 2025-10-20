import RecipeList from "./RecipeList"
import HeroSection from "./Herosection";
import './Homepage.css'
import { NavLink, Link } from "react-router-dom";


function Homepage () {
    console.log('Homepage render');

    return (
        <div className="homepage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/" className='chosen-page'>Start</NavLink>
                    <NavLink to="/categories">Kategorier</NavLink>
                </nav>
            </header>

            
            {/*Hero section here */}
            <div className="hero-section">
                <HeroSection />
            </div>

            {/*Category here */}
            <div className="category-placeholder">
                <Link to="/categories/bullar"><h2>Bullar</h2></Link>
                <Link to="/categories/kakor"><h2>Kakor</h2></Link>
                <Link to="/categories/julgodis"><h2>Julgodis</h2></Link>
            </div>

            {/* change for recipe cards*/}
            <RecipeList />
        </div>
    )
}

export default Homepage;