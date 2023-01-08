import React, { Suspense } from 'react';
import Sidebar from './Sidebar';
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Layout } from 'antd';
import LazyLoadSpinnerFallback from "../LazyLoadSpinnerFallback"
import TopHeader from './TopHeader';
const { Content } = Layout;


const MainLayout = () => {
    const location = useLocation()
    // const dispatch = useDispatch()

    const { access } = useSelector(state => state.auth)



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


    if (access){
        return mainLayout
    }else{
        return <Navigate to="/auth/login" state={{ from: location }} />
    }

}
export default MainLayout;