import { Button, Col, Form, Input, Modal, Row, Select, Switch, Typography, message } from 'antd';
import api from 'common/api';
import { toCapitalize } from 'common/functions';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, handleFormModalCancel, setFormOpen, setSelected } from 'redux/features/usersSlice';

const UserFormModal = () => {
    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { selected, formOpen, formMode } = useSelector(state => state.users)





    useEffect(() => {

        console.log("Modal rendered")



    }, [])

    return (


        <Modal
            title={`${toCapitalize(formMode)} User`}
            width={700}
            open={formOpen}
            footer={null}
            maskClosable={true}
            destroyOnClose={true}
            onCancel={() => dispatch(handleFormModalCancel())}
        >
            <UserForm />
        </Modal>
    )
}

export default UserFormModal



export const UserForm = () => {

    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { selected, formOpen, formMode,  formValues } = useSelector(state => state.users)

    const { permissions_list, groups_list} = useSelector(state=>state.access)

    const [form] = Form.useForm();
    const [errors, setErrors] = useState({})


    const onFinish = (values) => {

        if (formMode === "add") {
            api.post("/users/", values)
                .then((resp) => {

                    if (resp.status === 201) {

                        form.resetFields()
                        dispatch(handleFormModalCancel())

                        dispatch(fetchUsers())
                        message.success(resp.statusText)
                    } else {
                        console.log("err during create user", resp)
                    }
                })
                .catch((err) => {

                    setErrors(err.response.data)
                    Promise.reject(err)


                })

        } else if (formMode === "edit") {
            api.put(`/users/${formValues.id}/`, values)
                .then((resp) => {

                    if (resp.status === 200) {

                        form.resetFields()

                        dispatch(handleFormModalCancel())

                        dispatch(fetchUsers())

                        message.success("Updated Successfully")
                    } else {
                        message.error("Cannot update please check console")
                        console.log(resp)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Promise.reject(err)
                })
        }

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Row gutter={[8, 8]}>
                {/* {Object.entries(errors).map(([key, value]) => {
                        return <Typography.Text type='danger' key={String(key)+String(value)}>{value[0]}</Typography.Text>;
                    })} */}
                <Form
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ width: "100%" }}
                    initialValues={formValues}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <Form.Item
                                name="first_name"
                                label="First Name"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="last_name"
                                label="Last Name"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input />

                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        type: "email"
                                    }
                                ]}
                            >
                                <Input />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="groups"
                                label="Groups"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Select Groups"
                                    options={groups_list}

                                    fieldNames={{ label: "name", value: "id" }}
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="user_permissions"
                                label="User Permissions"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Select Permissions"
                                    options={permissions_list}

                                    fieldNames={{ label: "name", value: "id" }}
                                />
                               

                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[8, 8]}>
                        <Col span={4}>
                            <Form.Item
                                name="is_active"
                                label="Active"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                valuePropName="checked"
                            >
                                <Switch />

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                        </Col>
                    </Row>

                    {formMode === "add" ?

                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password2"
                                    label="Confirm Password"

                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />

                                </Form.Item>
                            </Col>
                        </Row>

                        :
                        ""

                    }




                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </>
    )
}
