import React, { Suspense, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Layout } from 'antd';
import LazyLoadSpinnerFallback from "../components/LazyLoadSpinnerFallback"
import TopHeader from './TopHeader';
import { fetchPermissions } from 'redux/features/accessSlice';
const { Content } = Layout;


const MainLayout = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const { access } = useSelector(state => state.auth)


    useEffect(() => {
        console.log("Main Layout rendered")
        // dispatch(fetchPermissions())
    }, [])



    const mainLayout = (
        <Layout style={{ height: "100vh" }}>

            <TopHeader />
            <Layout>

                <Sidebar />
                <Layout>

                    <Content style={{ margin: '5px', overflow: "auto" }} >
                        <div style={{}}>
                            {/* <BreadCrumbGenerator /> */}
                            <Suspense fallback={<LazyLoadSpinnerFallback />}>
                                <Outlet />
                            </Suspense>
                        </div>

                    </Content>

                    {/* <Footer style={{ textAlign: 'center' }}>{process.env.REACT_APP_NAME}</Footer> */}
                </Layout>
            </Layout >

        </Layout >
    )


    if (access) {
        return mainLayout
    } else {
        return <Navigate to="/auth/login" state={{ from: location }} />
    }

}
export default MainLayout;