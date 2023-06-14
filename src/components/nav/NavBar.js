import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

const handleLogOut = () => {
    localStorage.removeItem("bowler_user")
    navigate("/", {replace: true})
}

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Home">Home</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/Home">Compare</Link>
            </li>


            {
                localStorage.getItem("bowler_user")
                    ? <ul className="nav-item">
                        <button type="button" className="btn btn-outline-danger navbar-right" onClick={handleLogOut}>Logout</button>
                    
                    </ul>
                    : ""
            }
        </ul>
    )
}

