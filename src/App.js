import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Outlet, Link, useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("access_token")
    navigate("/")
  }

  return (
    <>
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
          <div class="container-fluid d-flex justify-content-start">
              <h3 class="mx-4 mt-1 mb-2">BukaPedia</h3>
              <Link class="nav-link mx-3 my-2 text-secondary" to="/">Home</Link>
              {
                !localStorage.getItem("access_token")
                &&
                <Link class="nav-link mx-3 my-2 text-secondary" to="/login">Login</Link>
              }
              {
                localStorage.getItem("access_token")
                &&
                <>
                  <Link class="nav-link mx-3 my-2 text-secondary" to="/cart">Cart</Link>
                  <Link onClick={() => logout()} class="nav-link mx-3 my-2 text-secondary" to="/">Logout</Link>
                </>
              }
          </div>
      </nav>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
