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
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="my-3">Login</h1>

            <hr/>
            <div className="row justify-content-center">
                <form onSubmit={(e) => login(e)}>
                    <div className="mb-3">
                        <label for="email">Email Address</label>
                        <input type="email" className="form-control mt-2" id="email" placeholder="email" style={{ width: "20rem" }}/>
                    </div>
                    <div className="mb-3">
                        <label for="password">Password</label>
                        <input type="password" className="form-control mt-2" id="password" placeholder="password" style={{ width: "20rem" }}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login