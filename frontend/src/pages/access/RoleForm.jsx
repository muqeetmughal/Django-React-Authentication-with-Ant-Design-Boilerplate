import { Button, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import api from 'common/api';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, setFormOpen } from 'redux/features/accessSlice';

const RoleForm = () => {
    const dispatch = useDispatch()
    const { formOpen, formMode, permissions_list } = useSelector(state => state.access)

    const [form] = Form.useForm();



    // const handleOk = () => {

    // };

    const layout = {
        // labelCol: {
        //     span: 8,
        // },
        // wrapperCol: {
        //     span: 16,
        // },
    };

    const onFinish = (values) => {

        console.log("Form values are : ", values)

        if (formMode === "add") {
            api.post("/roles/", values)
                .then((resp) => {

                    if (resp.status===201){

                        form.resetFields()
                        dispatch(setFormOpen(false))

                        dispatch(fetchRoles())
                        message.success(resp.statusText)
                    }else{
                        console.log(resp)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Promise.reject(err)
                })

        } else if (formMode === "edit") {
            // UsersService.editUser(data?._id, values)
            //     .then((resp) => {
            //         if (resp.data.success) {
            //             form.resetFields()
            //             message.success(resp.data.msg)
            //             navigate("/users")

            //         } else {
            //             message.error(resp.data.msg)
            //         }
            //     }).catch((err) => {
            //         return Promise.reject(err)
            //     })

        }

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (


        <Modal
            title="Title"
            width={700}
            open={formOpen}
            onOk={form.submit}
            onCancel={() => { form.resetFields(); dispatch(setFormOpen(false)) }}
            maskClosable={false}
        >
            <Row gutter={[8, 8]}>
                <Form
                    {...layout}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ width: "100%" }}
                    initialValues={formMode === "edit" ? {} : {}}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />

                            </Form.Item>
                            <Form.Item
                                name="permissions"
                                label="Permissions"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    // defaultValue={['a10', 'c12']}
                                    // onChange={handleChange}
                                    options={permissions_list}

                                    fieldNames={{ label: "name", value: "id", options: "options" }}
                                />

                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
                        </Col> */}
                    </Row>


                </Form>
            </Row>
        </Modal>
    )
}

export default RoleForm