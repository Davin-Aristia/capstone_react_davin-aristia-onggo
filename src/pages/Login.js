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
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-4">
                    <div class="login">
                        <h3 lass="mb-4">Login Page</h3>
                        <form onSubmit={(e) => login(e)}>
                            <div class="mb-2">
                                <input type="email" id="email" placeholder="email"/>
                            </div>
                            <div class="mb-2">
                                <input type="password" id="password" placeholder="password"/>
                            </div>
                            <div class="mb-2">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login