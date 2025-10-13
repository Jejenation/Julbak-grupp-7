import './Categorypage.css'

function Categorypage() {
    console.log('Categorypage render');

    return (
        <div className="categorypage">
            <header className="header">
                <div className="logo">Julens Smaker</div>
                <nav>
                    <a href="/">Start</a>
                    <a href="/categories">Kategorier</a>
                </nav>
                <button className="search">🔍</button>
            </header>
            <h1>Kategorier</h1>
            <div className='categories'>
                <a href="/categories/bullar">
                    <img src="" alt="Bullar" />
                    <h2>Bullar</h2>
                </a>
                <a href="/categories/kakor">
                    <img src="" alt="Kakor" />
                    <h2>Kakor</h2>
                </a>
                <a href="/categories/julgodis">
                    <img src="" alt="Julgodis" />
                    <h2>Julgodis</h2>
                </a>
            </div>
        </div>
    )
}

export default Categorypage;