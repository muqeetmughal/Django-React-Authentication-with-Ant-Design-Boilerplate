import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserForm from './UserForm'
import UsersService from '../../../services/Users.service'
import withAuthorizationCheck from '../../../hoc/withAuthCheck'

const EditUser = () => {

    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {

        UsersService.getSingleUser(id)
            .then(resp => {
                if (resp.data.success) {

                    setUser(resp.data.data)
                } else {
                    message.error(resp.data.msg)
                }
            }).catch(err => {
                return Promise.reject(err)
            })

    }, [id])
    return (
        <>
            {user ? <UserForm mode='edit' data={user} /> : "Loading..."}

            {/* <UserForm mode='edit' data={user} /> */}
        </>
    )
}

export default withAuthorizationCheck(EditUser, ["users.update"])