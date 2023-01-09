import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UsersService from 'services/Users.service'
import { EditFilled, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPermissions, fetchRoles, setFormOpen } from 'redux/features/accessSlice'
import RoleForm from './RoleForm';

// import Guard from '../../../providers/Guard'
// import withAuthCheck from '../../../hoc/withAuthCheck'

const Roles = () => {

  const dispatch = useDispatch()
  const { roles_list, loading } = useSelector(state => state.access)

  const handleDelete = (key) => {
    // UsersService.deleteUser({
    //   "user_id": key
    // })
    //   .then(resp => {
    //     fetchUsers()
    //     message.success("User Deleted Successfully")
    //   })
    //   .catch(err => {
    //     message.err("User Deleted Successfully")
    //     console.log(err)
    //   })

  }
  const handleUpdate = (key) => {

    console.log("editing : ", key)
  }



  useEffect(() => {
    dispatch(fetchRoles())
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
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      // sorter: true,
      width: 200
    },
    {
      title: 'Permissions',
      key: 'permissions',
      // dataIndex : 'permissions',
      sorter: true,
      render: (record) => {
        return record.permissions.map((permission, index) => {
          return <Tag key={index}>{permission.name}</Tag>
        })
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle" style={{ display: "flex", justifyContent: "center" }}>

          {/* <Guard allowedPermissions={["users.update"]}> */}

          <EditFilled onClick={handleUpdate} style={{ color: "blue", fontSize: "12" }} />
          {/* </Guard> */}


          {/* <Guard allowedPermissions={['users.delete']}> */}

          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <DeleteOutlined style={{ color: "red", fontSize: "12" }} />
          </Popconfirm>
          {/* </Guard> */}

          {/* <Guard allowedPermissions={["users.change_password"]}> */}

          <Link to={`/users/change-password/${record._id}`} >
            <EyeOutlined style={{ color: "green", fontSize: "12" }} />

          </Link>

          {/* </Guard> */}





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
          {/* <Guard allowedPermissions={["users.create"]}> */}
          <Button type="primary" onClick={() => dispatch(setFormOpen(true))}>
            Add Role
          </Button>

          {/* </Guard> */}

        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={roles_list}
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

      <RoleForm />

    </>
  )
}
export default Roles
// export default withAuthCheck(Users, ['users.read'])