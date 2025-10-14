import { useState } from 'react';
import './RecipePage.css';

function RecipePage() {
    const [activeCategory, setActiveCategory] = useState('');
    
    return (
        <header className="recipe-header">
            <div className="logo">
                <span className="site-title">Julens Smaker</span>           
            </div>

            <nav className="menu">
                {['Hem', 'Bullar', 'Kakor', 'Julgodis'].map((item) => (
                    <span
                    key={item}
                    className={`menu-item ${activeCategory === item ? 'active' : ''}`}
                    onClick={() => setActiveCategory(item)}
                    >
                      {item}
                    </span>
                ))}
            </nav>
        </header>
    );
}

export default RecipePage;