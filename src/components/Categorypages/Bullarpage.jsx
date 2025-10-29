import { NavLink } from 'react-router-dom';
import RecipeInCategorypage from './RecipeInCategoryList';

function Bullarpage() {
    console.log('Bullarpage render');

    return (
        <div className="bullarpage">
            <header className="header-with-categories">
                <div className="logo">Julens Smaker</div>
                <nav className='nav-links'>
                    <NavLink to="/">Start</NavLink>
                    <NavLink to="/categories/bullar" className='chosen-page'>Bullar</NavLink>
                    <NavLink to="/categories/kakor">Kakor</NavLink>
                    <NavLink to="/categories/julgodis">Julgodis</NavLink>
                </nav>
            </header>

            <div>
                <h1>Bullar</h1>
                {RecipeInCategorypage("Bullar")}
            </div>
        </div>
    )
}

export default Bullarpage;