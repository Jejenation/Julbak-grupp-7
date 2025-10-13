import RecipeInCategorypage from './RecipeInCategoryList';

function Bullarpage() {
    console.log('Bullarpage render');

    return (
        <div className="bullarpage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/">Start</a>
                    <a href="/categories/bullar">Bullar</a>
                    <a href="/categories/kakor">Kakor</a>
                    <a href="/categories/julgodis">Julgodis</a>
                </nav>
                <button className="search">🔍</button>
            </header>

            <div>
                {RecipeInCategorypage("Bullar")}
            </div>
        </div>
    )
}

export default Bullarpage;