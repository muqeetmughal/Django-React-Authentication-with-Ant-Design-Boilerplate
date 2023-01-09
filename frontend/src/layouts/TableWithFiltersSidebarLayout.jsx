import { Layout, Space } from 'antd'
import React from 'react'

const { Content, Menu, Sider } = Layout

const TableWithFiltersSidebarLayout = ({ table, filters }) => {
    return (
        <>
            <Layout
                style={{
                    padding: '0px 5px',
                }}
            >
                <Sider width={200}>
                    <Space direction='vertical'>
                        Filters:

                        {filters}
                    </Space>
                </Sider>
                <Content
                    style={{
                        padding: '0px 5px',
                        minHeight: 280,
                    }}
                >
                    {table}
                </Content>
            </Layout>

        </>
    )
}

export default TableWithFiltersSidebarLayout