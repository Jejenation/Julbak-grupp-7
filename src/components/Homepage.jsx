import RecipeList from "./RecipeList"
import HeroSection from "./Herosection";
import './Homepage.css'


function Homepage () {
    console.log('Homepage render');

    return (
        <div className="homepage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/" className="chosen-page">Start</a>
                    <a href="/categories">Kategorier</a>
                </nav>
            </header>

            
            {/*Hero section here */}
            <div className="hero-section">
                <HeroSection />
            </div>

            {/*Category here */}
            <div className="category-placeholder">
                <a href="/categories/bullar"><h2>Bullar</h2></a>
                <a href="/categories/kakor"><h2>Kakor</h2></a>
                <a href="/categories/julgodis"><h2>Julgodis</h2></a>
            </div>

            {/* change for recipe cards*/}
            <RecipeList />
        </div>
    )
}

export default Homepage;