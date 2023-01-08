import React from 'react'
import { useSelector } from 'react-redux'

const Guard = ({ allowedPermissions = [], allowedRoles = [] , children}) => {


    allowedRoles.push("superadmin")

    const auth = useSelector((state) => state.auth)
    
    
    
    var isPermitted = auth.user.role?.find(role_ => allowedRoles?.includes(role_))

    if (!isPermitted) {
        isPermitted = auth.user.permissions?.find(permission => allowedPermissions?.includes(permission))
    }



    if (isPermitted){

        return <>{children}</>
    }
    else{
        return <></>
    }
}

export default Guard