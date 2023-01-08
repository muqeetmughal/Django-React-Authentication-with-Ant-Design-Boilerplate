import React from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ENTRY_ROUTE } from '../common/constants';


const BreadCrumbGenerator = () => {
    return (
        <>
            <Breadcrumb style={{
                
            }}>
                <Breadcrumb.Item>
                    <Link to={ENTRY_ROUTE}>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
        </>
    )
}

export default BreadCrumbGenerator