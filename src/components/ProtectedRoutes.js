import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({children}) {
    let location = useLocation()
    console.log("location:", location);
    if (!localStorage.getItem("access_token")) {
        return <Navigate state={{from: location}} to="/login"/>
    }
    return children
}

export default ProtectedRoutes