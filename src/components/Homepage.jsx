//import { useState } from "react";
import RecipeList from "./RecipeList";
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
            <div className="hero-placeholder">
                Hero Section (Coming soon :D)
            </div>

            {/*Category here */}
            <div className="category-placeholder">
                <a href="/bullar"><h2>Bullar</h2></a>
                <a href="/kakor"><h2>Kakor</h2></a>
                <a href="/julgodis"><h2>Julgodis</h2></a>
            </div>

            {/* change for recipe cards*/}
            <RecipeList />
        </div>
    )
}

export default Homepage;