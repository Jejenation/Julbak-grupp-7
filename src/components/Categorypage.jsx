import './Categorypage.css'
import { NavLink, Link } from 'react-router-dom';


function Categorypage() {
    console.log('Categorypage render');

    return (
        <div className="categorypage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <NavLink to="/">Start</NavLink>
                    <NavLink to="/categories" className='chosen-page'>Kategorier</NavLink>
                </nav>
            </header>
            <h1>Kategorier</h1>
            <div className='categories'>
                <Link to="/categories/bullar">
                    <img src="https://i.imgur.com/O2JGnLr.jpeg" alt="Bullar" />
                    <h2>Bullar</h2>
                </Link>
                <Link to="/categories/kakor">
                    <img src="https://i.imgur.com/KyR42pd.jpeg" alt="Kakor" />
                    <h2>Kakor</h2>
                </Link>
                <Link to="/categories/julgodis">
                    <img src="https://i.imgur.com/njNJnFu.jpeg" alt="Julgodis" />
                    <h2>Julgodis</h2>
                </Link>
            </div>
        </div>
    )
}

export default Categorypage;