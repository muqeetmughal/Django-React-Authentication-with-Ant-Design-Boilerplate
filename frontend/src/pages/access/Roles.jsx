import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EditFilled, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPermissions, fetchRoles, setFormOpen, setFormMode, setFormValues, setSelected, handleFormModalEdit, handleFormModalCreate } from 'redux/features/accessSlice'
import RoleForm from './RoleForm';
import api from 'common/api';
import Guard from 'providers/Guard';

// import Guard from '../../../providers/Guard'
// import withAuthCheck from '../../../hoc/withAuthCheck'

const Roles = () => {

  const dispatch = useDispatch()
  const { roles_list, loading } = useSelector(state => state.access)

  const handleDelete = (key) => {
    api.delete(`/roles/${key}`)
      .then(resp => {
        if (resp.status === 204) {
          dispatch(fetchRoles())
          message.success("Deleted Successfully")
        }
      }).catch(err => {
        message.error(err.response.data.detail)
      })
  }
  const handleUpdate = async (key) => {

    api.get(`/roles/${key}/`).then(resp => {
      dispatch(handleFormModalEdit(resp.data))
    }).catch(err => {
      message.error(err.response.data.detail)
    })

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

          <Guard allowedPermissions={["auth.change_group"]}>

          <EditFilled onClick={() => (handleUpdate(record.id))} style={{ color: "blue", fontSize: "12" }} />
          </Guard>


          <Guard allowedPermissions={['auth.delete_group']}>

          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined style={{ color: "red", fontSize: "12" }} />
          </Popconfirm>
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
          <Button type="primary" onClick={() => { dispatch(handleFormModalCreate())}}>
            Add Role
          </Button>

          </Guard>

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