import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Navbar() {
    let navigate = useNavigate()

    const carts = useSelector(state => state.products.carts)

    const logout = () => {
      localStorage.removeItem("access_token")
      navigate("/")
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top">
            <div className="container-fluid d-flex justify-content-start">
                <h3 className="mx-4 mt-1 mb-2">BukaPedia</h3>
                <Link className="nav-link mx-3 my-2 text-secondary" to="/">Home</Link>
                {
                    !localStorage.getItem("access_token")
                    &&
                    <Link className="nav-link mx-3 my-2 text-secondary" to="/login">Login</Link>
                }
                {
                    localStorage.getItem("access_token")
                    &&
                    <>
                        {carts.length > 0 ? (
                            <Link className="nav-link ms-3 me-4 my-2 text-secondary position-relative" to="/cart">
                                Cart
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary mx-3">
                                    {carts.length}
                                </span>
                            </Link>
                        ) : (
                            <Link className="nav-link mx-3 my-2 text-secondary" to="/cart">Cart</Link>
                        )}
                        <Link onClick={() => logout()} className="nav-link mx-3 my-2 text-secondary" to="/">Logout</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;