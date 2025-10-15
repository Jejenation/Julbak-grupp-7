import RecipeInCategorypage from './RecipeInCategoryList';

function Julgodispage() {
    console.log('Julgodispage render');

    return (
        <div className="julgodispage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/">Start</a>
                    <a href="/categories/bullar">Bullar</a>
                    <a href="/categories/kakor">Kakor</a>
                    <a href="/categories/julgodis" className='chosen-page'>Julgodis</a>
                </nav>
                <button className="search">🔍</button>
            </header>

            <div>
                <h1>Julgodis</h1>
                {RecipeInCategorypage("Julgodis")}
            </div>
        </div>
    )
}

export default Julgodispage;