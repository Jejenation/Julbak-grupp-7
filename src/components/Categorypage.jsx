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
                    <img src="https://trello.com/1/cards/68df8b88aac96c3ab57a354d/attachments/68e6228511598ff09b04ed5e/download/lussekatter.jpg" alt="Bullar" />
                    <h2>Bullar</h2>
                </a>
                <a href="/categories/kakor">
                    <img src="https://trello.com/1/cards/68df8b88aac96c3ab57a354d/attachments/68e6231d08a3695a905d7630/download/pepparkakor.jpg" alt="Kakor" />
                    <h2>Kakor</h2>
                </a>
                <a href="/categories/julgodis">
                    <img src="https://trello.com/1/cards/68df8b88aac96c3ab57a354d/attachments/68e6238aa92957ebf766525a/download/kolaknack.jpg" alt="Julgodis" />
                    <h2>Julgodis</h2>
                </a>
            </div>
        </div>
    )
}

export default Categorypage;