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
                    <a href="/">Start</a>
                    <a href="/categories">Kategorier</a>
                </nav>
                <button className="search">🔍</button>
            </header>

            
            {/*Hero section here */}
            <div className="hero-section">
                <HeroSection />
            </div>

            {/*Category here */}
            <div className="category-placeholder">
                Categories (Coming soon :D)
            </div>

            {/* change for recipe cards*/}
            <RecipeList />
        </div>
    )
}

export default Homepage;