import React, { lazy } from 'react'

import NotFound from './pages/NotFound';
import { Navigate } from 'react-router';
import { ENTRY_ROUTE } from './common/constants';
import { Routes, Route } from 'react-router';

// import LoadingWrapper from './components/MainLoading';


import MainLayout from 'layouts/MainLayout';
import PublicLayout from 'layouts/PublicLayout';
import Roles from 'pages/access/Roles';
import Permissions from 'pages/access/Permissions';



const Login = lazy(() => import("pages/auth/Login"))
const Register = lazy(() => import("pages/auth/Register"))

const Welcome = lazy(() => import("pages/Welcome"))
const Users = lazy(() => import("pages/users/Users"))
const AddUser = lazy(() => import('pages/users/AddUser'))
const ChangePassword = lazy(() => import('pages/users/ChangePassword'))
const EditUser = lazy(() => import('pages/users/EditUser'))


const RoutesConfig = () => {

    // const [loading, setLoading] = useState(true)

    // const { status } = useThemeSwitcher();


    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 200)
    // }, [])

    // if (status === "loading") {
    //     return null;
    // }

    return (
        <>

            {/* {loading ? <LoadingWrapper /> : */}


            <Routes>
                {/* Public Routes */}

                <Route path='' element={<Navigate to={ENTRY_ROUTE} />} />
                <Route path="/auth" element={<PublicLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>


                {/* Protected Routes */}

                <Route path="/" element={<MainLayout />}>
                    <Route path='*' element={<NotFound />} />

                    <Route path="users">
                        <Route path='' element={<Users />} />
                        <Route path='add' element={<AddUser />} />
                        <Route path='edit/:id' element={<EditUser />} />
                        <Route path='change-password/:id' element={<ChangePassword />} />
                    </Route>

                    <Route path="roles">
                        <Route path='' element={<Roles />} />
                    </Route>



                    <Route path="dashboard" element={<Welcome />} />
                </Route>

            </Routes>
            {/* } */}
        </>
    )
}

export default RoutesConfig