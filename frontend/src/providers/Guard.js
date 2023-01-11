import React from 'react'
import { useSelector } from 'react-redux'

const Guard = ({ allowedPermissions = [], children }) => {

    const { user } = useSelector((state) => state.auth)

    let isPermitted = user.is_superuser || user.user_permissions?.find(permission => allowedPermissions?.includes(permission))

    if (isPermitted) {
        return <>{children}</>
    }
    else {
        return <></>
    }
}

export default Guard