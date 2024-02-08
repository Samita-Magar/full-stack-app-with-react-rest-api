import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
  const { actions } = useContext(UserContext);

  useEffect(() => actions.signOut());

  // use replace to clear the history route stack
  return <Navigate to="/" replace />
}

export default UserSignOut