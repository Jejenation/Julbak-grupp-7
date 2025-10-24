import './PageNotFound.css'
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h2>404 Error</h2>
            <p>Oj! Den här sidan verkar inte finnas.</p>
            <p>Dubblekolla länken, eller gå tillbaka till <Link to='/'>startsidan</Link>.</p>
        </div>
    )
}
export default PageNotFound;