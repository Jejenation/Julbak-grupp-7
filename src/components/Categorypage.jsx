import './Categorypage.css'

function Categorypage() {
    console.log('Categorypage render');

    return (
        <div className="categorypage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/">Start</a>
                    <a href="/categories" className='chosen-page'>Kategorier</a>
                </nav>
            </header>
            <h1>Kategorier</h1>
            <div className='categories'>
                <a href="/categories/bullar">
                    <img src="https://i.imgur.com/O2JGnLr.jpeg" alt="Bullar" />
                    <h2>Bullar</h2>
                </a>
                <a href="/categories/kakor">
                    <img src="https://i.imgur.com/KyR42pd.jpeg" alt="Kakor" />
                    <h2>Kakor</h2>
                </a>
                <a href="/categories/julgodis">
                    <img src="https://i.imgur.com/njNJnFu.jpeg" alt="Julgodis" />
                    <h2>Julgodis</h2>
                </a>
            </div>
        </div>
    )
}

export default Categorypage;