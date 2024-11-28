import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
    const location = useLocation();
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();
        // if (document.getElementById("email").value === "kevin@gmail.com" && document.getElementById("password").value === "kev02937@"){
        //     localStorage.setItem("access_token", "admin")
        //     const redirectPath = location.state?.from?.pathname || "/";
        //     navigate(redirectPath)
        // }

        localStorage.setItem("access_token", "admin")
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className="login">
                        <h3 lass="mb-4">Login Page</h3>
                        <form onSubmit={(e) => login(e)}>
                            <div className="mb-2">
                                <input type="email" id="email" placeholder="email"/>
                            </div>
                            <div className="mb-2">
                                <input type="password" id="password" placeholder="password"/>
                            </div>
                            <div className="mb-2">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login