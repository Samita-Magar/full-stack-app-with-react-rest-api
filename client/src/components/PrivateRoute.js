import { useContext } from "react";
import UserContext from "../context/UserContext";

import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();
    //console.log(location);

    if (authUser) {
        // Outlet tag will render the child routes
        return <Outlet />
    } else {
        //uses state prop to pass data from one URL to another
        return <Navigate to="/signin" state={{ from: location.pathname }} />
    }
}

export default PrivateRoute;