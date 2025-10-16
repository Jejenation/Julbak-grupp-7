import RecipeInCategorypage from './RecipeInCategoryList';

function Kakorpage() {
    console.log('Kakorpage render');

    return (
        <div className="kakorpage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/">Start</a>
                    <a href="/categories/bullar">Bullar</a>
                    <a href="/categories/kakor" className='chosen-page'>Kakor</a>
                    <a href="/categories/julgodis">Julgodis</a>
                </nav>
            </header>

            <div>
                <h1>Kakor</h1>
                {RecipeInCategorypage("Kakor")}
            </div>
        </div>
    )
}

export default Kakorpage;