import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../components/Unauthorized";



const withAuthCheck = (Component = null, allowedPermissions = [], allowedRoles = []) => {
  function PrivateRoute(props) {
    allowedRoles.push("superadmin")

    const auth = useSelector((state) => state.auth)
    
    
    
    var isPermitted = auth.user.role?.find(role_ => allowedRoles?.includes(role_))

    if (!isPermitted) {
       isPermitted = auth.user.permissions?.find(permission => allowedPermissions?.includes(permission))
    }








    return (
      isPermitted ?
        <Component {...props} /> : <Unauthorized />)
  }

  return PrivateRoute;
};

export default withAuthCheck;