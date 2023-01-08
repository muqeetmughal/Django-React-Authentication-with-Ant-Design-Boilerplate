import { Outlet, useNavigate } from "react-router-dom"
import { Layout, Row, Col } from 'antd';
import React from 'react';
import TopHeader from "./TopHeader";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { ENTRY_ROUTE } from "../../common/constants";
import { Suspense } from "react";
import LazyLoadSpinnerFallback from "../LazyLoadSpinnerFallback";
const { Content, Footer } = Layout;

const PublicLayout = () => {

    const navigate = useNavigate()

    const user = useSelector(selectCurrentUser)

    React.useEffect(() => {
        if (user) {
            navigate(ENTRY_ROUTE)
        }
    }, [navigate, user])



    return (

        <Layout>

            {/* <TopHeader /> */}
            <Content
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <div
                    style={{
                    }}
                >
                    <Row justify="center" align="middle">
                        <Col span={24} >
                            <Suspense fallback={<LazyLoadSpinnerFallback />}>
                                <Outlet />
                            </Suspense>
                        </Col>
                    </Row>



                </div>
            </Content>
            {/* <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                {process.env.REACT_APP_NAME} 2022
            </Footer> */}
        </Layout>)
};

export default PublicLayout;