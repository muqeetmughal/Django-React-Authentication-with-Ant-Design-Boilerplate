import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EditFilled, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPermissions, fetchGroups, setFormOpen, setFormMode, setFormValues, setSelected, handleFormModalEdit, handleFormModalCreate } from 'redux/features/accessSlice'
import GroupForm from './GroupForm';
import api from 'common/api';
import Guard from 'providers/Guard';
import withAuthCheck from 'hoc/withAuthCheck';

// import Guard from '../../../providers/Guard'
// import withAuthCheck from '../../../hoc/withAuthCheck'

const Groups = () => {

  const dispatch = useDispatch()
  const { groups_list, loading } = useSelector(state => state.access)

  const handleDelete = (key) => {
    api.delete(`/groups/${key}/`)
      .then(resp => {
        if (resp.status === 204) {
          dispatch(fetchGroups())
          message.success("Deleted Successfully")
        }
      }).catch(err => {
        console.log(err)
      })
  }
  const handleUpdate = async (key) => {

    api.get(`/groups/${key}/`).then(resp => {
      dispatch(handleFormModalEdit(resp.data))
    }).catch(err => {
      console.log(err)
    })

  }



  useEffect(() => {
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
            <Button type="primary" onClick={() => { dispatch(handleFormModalCreate()) }}>
              Add Group
            </Button>

          </Guard>

        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={groups_list}
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

      <GroupForm />

    </>
  )
}
// export default Groups
export default withAuthCheck(Groups, ['auth.view_group'])