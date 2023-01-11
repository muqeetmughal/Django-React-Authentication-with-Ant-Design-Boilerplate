import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../components/Unauthorized";



const withAuthCheck = (Component = null, allowedPermissions = []) => {
  function PrivateRoute(props) {

    const {user} = useSelector((state) => state.auth)


    let isPermitted = user.is_superuser || user.user_permissions?.find(permission => allowedPermissions?.includes(permission))

    return (
      isPermitted ? <Component {...props} /> : <Unauthorized />)
  }

  return PrivateRoute;
};

export default withAuthCheck;