import React from 'react';

import { Button, Row, Col, Layout, message, Badge, Avatar, Popover, theme as antTheme } from 'antd';
import {
    MenuFoldOutlined,
    PoweroffOutlined,
    MenuUnfoldOutlined,
    BellOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SettingsDrawer from '../components/SettingsDrawer';
import AuthService from '../services/Auth.service';
import { toggleSidebar } from '../redux/features/themeSlice';
import { logOut } from '../redux/features/authSlice';

import Logo from '../components/Logo'
import NotificationsCard from 'components/NotificationsCard';
const { Header } = Layout
const TopHeader = () => {


    const { sidebarCollapsed } = useSelector((state) => state.theme)

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const { token } = antTheme.useToken();

    function handleLogout() {
        dispatch(logOut());
    }

    const styles = {
        padding: 0,
        background: token.colorBgContainer,
        color: token.colorPrimary
        // position: 'fixed',
        // zIndex: 1,
        // width: '100%',

        // background: "white"

    }
    return (
        <>
            <Header style={styles}>

                <Row justify="space-between">
                    <Col>

                        <div style={{ fontSize: "20px", padding: "0px 10px", display: "flex", alignItems: "center" }}>
                            {
                                user ?
                                    sidebarCollapsed ? <MenuUnfoldOutlined className='trigger' onClick={() => dispatch(toggleSidebar())} /> : <MenuFoldOutlined className='trigger' onClick={() => dispatch(toggleSidebar())} />
                                    : ""
                            }
                            <Logo />
                        </div>


                        {/* </Col>

                    <Col > */}

                    </Col>



                    <Col >

                        <Badge count={10}>

                            <Popover placement="bottom" title={"Notifications"} content={<NotificationsCard />} trigger="click">
                                <Button icon={<BellOutlined style={{ fontSize: "20px", color: token.colorPrimary }} />} type="text" />
                            </Popover>

                        </Badge>

                        {
                            <Button
                                type="text"
                                size='large'
                                icon={<PoweroffOutlined style={{ fontSize: "20px", color: token.colorPrimary }} />}
                                onClick={handleLogout}
                            >
                            </Button>
                        }

                        <SettingsDrawer />

                    </Col>
                </Row>


            </Header>
        </>
    )
}

export default TopHeader