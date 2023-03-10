import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { EditFilled, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { handleFormModalEdit, handleFormModalCreate, fetchUsers, handleFormModalChangePassword } from 'redux/features/usersSlice'
import api from 'common/api';
import Guard from 'providers/Guard';
import withAuthCheck from 'hoc/withAuthCheck';
import UserFormModal from './UserForm';
import { fetchGroups, fetchPermissions } from 'redux/features/accessSlice';
import dayjs from 'dayjs';
import ChangePasswordFormModal from './ChangePasswordForm';

// import Guard from '../../../providers/Guard'
// import withAuthCheck from '../../../hoc/withAuthCheck'

const Users = () => {

  const dispatch = useDispatch()
  const { users_list, loading } = useSelector(state => state.users)

  const handleDelete = (key) => {
    api.delete(`/users/${key}/`)
      .then(resp => {
        if (resp.status === 204) {
          dispatch(fetchUsers())
          message.success("Deleted Successfully")
        }
      }).catch(err => {
        console.log(err)
      })
  }
  const handleUpdate = async (key) => {

    api.get(`/users/${key}/`).then(resp => {
      dispatch(handleFormModalEdit(resp.data))
    }).catch(err => {
      console.log(err)
    })

  }
  const handleChangePassword = (key) => {
    dispatch(handleFormModalChangePassword(key))

    
  }



  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchGroups())
    dispatch(fetchPermissions())

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
      title: 'Groups',
      // dataIndex: 'groups',
      render: (record) => {
        return record.groups.map((group, index) => {
          return <Tag key={index}>{group.name}</Tag>
        })
      },
      key: 'groups',
    },
    {
      title: 'Last Login',
      key: 'last_login',
      render: (record) => {
        return <Tag>{record.last_login ? dayjs(record.last_login).toString() : "None"}</Tag>
      },
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

            <EditFilled onClick={() => (handleUpdate(record.id))} style={{ color: "blue", fontSize: "12" }} />
          </Guard>


          <Guard allowedPermissions={['users.delete_useraccount']}>

            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <DeleteOutlined style={{ color: "red", fontSize: "12" }} />
            </Popconfirm>
          </Guard>

          <Guard allowedPermissions={["users.change_useraccount"]}>

            <LockOutlined onClick={() => (handleChangePassword(record.id))} style={{ color: "green", fontSize: "12" }} />

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
          <Guard allowedPermissions={["auth.add_group"]}>
            <Button type="primary" onClick={() => { dispatch(handleFormModalCreate()) }}>
              Add User
            </Button>

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
        // rowSelection={true}
        onChange={handleTableChange}
      />

      <UserFormModal />
      <ChangePasswordFormModal />

    </>
  )
}
// export default Roles
export default withAuthCheck(Users, ['users.view_useraccount'])