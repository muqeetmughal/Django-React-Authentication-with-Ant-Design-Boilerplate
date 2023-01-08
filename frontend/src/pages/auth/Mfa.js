
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import OTPComponent from '../../components/custom/OTPComponent'
const Mfa = () => {

    const token = useSelector(state => state.auth?.access)

    return (
        <>
            {token ?

                <OTPComponent /> :
                <Navigate to={"/login"} />
            }

        </>
    )
}

export default Mfa