import RecipeInCategorypage from './RecipeInCategoryList';
import { NavLink } from 'react-router-dom';

function Kakorpage() {
    console.log('Kakorpage render');

    return (
        <div className="kakorpage">
            <header className="header-with-categories">
                <div className="logo">Julens Smaker</div>
                <nav className='nav-links'>
                    <NavLink to="/">Hem</NavLink>
                    <NavLink to="/categories/bullar">Bullar</NavLink>
                    <NavLink to="/categories/kakor" className='chosen-page'>Kakor</NavLink>
                    <NavLink to="/categories/julgodis">Julgodis</NavLink>
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