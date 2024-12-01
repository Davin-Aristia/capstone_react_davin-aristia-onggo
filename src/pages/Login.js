import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {
    const location = useLocation();
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();

        // CREDENTIALS (paste this into .env file):
        // REACT_APP_USER_EMAIL=kevin@gmail.com
        // REACT_APP_USER_PASSWORD=kev02937@

        const user_email = process.env.REACT_APP_USER_EMAIL
        const user_password = process.env.REACT_APP_USER_PASSWORD
        if (document.getElementById("email").value === user_email && document.getElementById("password").value === user_password){
            localStorage.setItem("access_token", "admin")
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
            toast.success(`Welcome back! ${user_email} `, {
                autoClose: 3000,
            });
        } else {
            toast.warning(`Invalid email or password! Please try again`, {
                autoClose: 3000,
            });
        }
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