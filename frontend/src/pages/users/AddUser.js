import React from 'react'
// import withAuthorizationCheck from '../../../hoc/withAuthCheck'
import UserForm from './UserForm'

const AddUser = () => {
  return (
    <>
      <UserForm />
    </>
  )
}

// export default withAuthorizationCheck(AddUser, ["users.create"])
export default AddUser