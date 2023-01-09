
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import navitems from '../configs/NavConfig';
import { setSidebar } from '../redux/features/themeSlice';
import Profile from '../components/Profile';
import { useEffect } from 'react';
import { filterNavItems } from '../common/functions';
import React, { useState } from 'react';
const { Sider } = Layout;


const Sidebar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation();


    const { user } = useSelector((state) => state.auth)
    const { sidebarCollapsed, theme } = useSelector((state) => state.theme)
    const [currentPath, setCurrentPath] = useState(location.pathname)

    const [sidebar_nav_items, set_sidebar_nav_items] = useState([])



    useEffect(() => {



        set_sidebar_nav_items(filterNavItems(user, navitems))




    }, [user])


    useEffect(() => {
        if (location) {
            if (currentPath !== location.pathname) {
                setCurrentPath(location.pathname);
            }
        }
    }, [location, currentPath]);



    function handleClick(e) {
        setCurrentPath(e.key);


        navigate(e.key)
        if (window.innerWidth < 768) {
            dispatch(setSidebar(true))
        }
    }

    const styles = {
        // position: 'sticky',
        // zIndex: 1,
        // width: '100%',
    }
    return (
        <>


            <Sider

                trigger={null} collapsible collapsed={sidebarCollapsed}
                theme={"light"}
                breakpoint="md"
                collapsedWidth="50"
                onBreakpoint={(broken) => {
                    // console.log(broken);

                    dispatch(setSidebar(broken))
                }}
                style={styles}
            // onCollapse={(collapsed, type) => {
            //     console.log(collapsed, type);
            // }}
            >
                {!sidebarCollapsed ? <Profile /> : ""}
                <Menu
                    theme={"light"}
                    mode="inline"
                    style={{
                        // background : "red"
                    }}
                    defaultSelectedKeys={[currentPath]}
                    items={sidebar_nav_items}
                    onClick={handleClick}
                    selectedKeys={[currentPath]}
                // onClick={({ key }) => {

                //     navigate(key)
                //     if (window.innerWidth < 768) {
                //         dispatch(setSidebar(true))
                //     }


                // }}
                />


            </Sider>
        </>
    )
}

export default Sidebar