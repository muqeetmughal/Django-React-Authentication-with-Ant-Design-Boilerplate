import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UsersService from 'services/Users.service'
import { EditFilled, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from 'redux/features/usersSlice'
import Guard from 'providers/Guard'
import withAuthCheck from 'hoc/withAuthCheck'
// import Guard from '../../../providers/Guard'
// import withAuthCheck from '../../../hoc/withAuthCheck'

const Users = () => {

    const dispatch = useDispatch()
    const { users_list, loading } = useSelector(state => state.users)


    // const [users_list, setUsersList] = useState([])
    // const [loading, setLoading] = useState(true)



    const handleDelete = (key) => {
        UsersService.deleteUser({
            "user_id": key
        })
            .then(resp => {
                fetchUsers()
                message.success("User Deleted Successfully")
            })
            .catch(err => {
                message.err("User Deleted Successfully")
                console.log(err)
            })

    }



    useEffect(() => {
        dispatch(fetchUsers())

    }, [dispatch])

    const handleTableChange = (pagination, filters, sorter) => {
        // setTableParams({
        //   pagination,
        //   filters,
        //   ...sorter,


        // console.log(pagination, sorter, filters)
    };


    const columns = [
        {
            title: 'Full Name',
            key: 'name',
            sorter: true,
            render: (record) => (
                <span>{record.first_name} {record.last_name}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'active',
            filters: [
                {
                    text: 'Active',
                    value: true,
                },
                {
                    text: 'InActive',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_active === value,
            render: (_, record) => (
                <span style={{ display: "flex", justifyContent: "center" }}>{record.is_active ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}</span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Space size="middle" style={{ display: "flex", justifyContent: "center" }}>

                    <Guard allowedPermissions={["users.change_useraccount"]}>

                        <Link to={`/users/edit/${record._id}`} >
                            <EditFilled style={{ color: "blue", fontSize: "12" }} />
                        </Link>
                    </Guard>


                    <Guard allowedPermissions={['users.delete_useraccount']}>

                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                            <DeleteOutlined style={{ color: "red", fontSize: "12" }} />
                        </Popconfirm>
                    </Guard>

                    <Guard allowedPermissions={["users.change_useraccount"]}>

                    <Link to={`/users/change-password/${record._id}`} >
                        <LockOutlined style={{ color: "green", fontSize: "12" }} />

                    </Link>

                    </Guard>





                </Space>
            ),
        }

    ];



    return (
        <>

            <Row justify="space-between">
                <Col>

                <Input placeholder='Search' />


                </Col>



                <Col>
                    <Guard allowedPermissions={["users.add_useraccount"]}>
                        <Link to="/users/add">
                            <Button type="primary" >
                                Add User
                            </Button>
                        </Link>

                    </Guard>

                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={users_list}
                scroll={{
                    // x: 1600,
                    // y: "70vh"
                }}
                // bordered={true}
                rowKey="id"
                size='small'
                pagination={{
                    position: ["bottomCenter"],
                }}
                loading={loading}
                rowSelection={false}
                onChange={handleTableChange}
            />



        </>
    )
}
// export default Users
export default withAuthCheck(Users, ['users.view_useraccount'])