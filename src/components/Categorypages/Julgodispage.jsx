import RecipeInCategorypage from './RecipeInCategoryList';
import { NavLink } from 'react-router-dom';

function Julgodispage() {
    console.log('Julgodispage render');

    return (
        <div className="julgodispage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/">Start</NavLink>
                    <NavLink to="/categories/bullar">Bullar</NavLink>
                    <NavLink to="/categories/kakor">Kakor</NavLink>
                    <NavLink to="/categories/julgodis" className='chosen-page'>Julgodis</NavLink>
                </nav>
            </header>

            <div>
                <h1>Julgodis</h1>
                {RecipeInCategorypage("Julgodis")}
            </div>
        </div>
    )
}

export default Julgodispage;