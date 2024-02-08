import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Nav = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();
  //console.log(location);
  return (
    <nav>
      {authUser === null ? (
        <ul className="header--signedout">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin" state={{from: location.pathname}}>Sign in</Link>
          </li>
        </ul>
      ) : (
        <>
          <span className="header--signedin">
            Welcome {authUser.firstname} {authUser.lastname}{"! "}
          </span>
          <Link className="header--signedout" to="/signout">
            Sign out
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;