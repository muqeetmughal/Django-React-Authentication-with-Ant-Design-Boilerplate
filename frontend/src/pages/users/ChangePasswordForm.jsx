import { Button, Col, Form, Input, Modal, Row, Select, Switch, Typography, message } from 'antd';
import api from 'common/api';
import { toCapitalize } from 'common/functions';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, handleFormModalCancel, setFormOpen, setSelected } from 'redux/features/usersSlice';

const ChangePasswordFormModal = () => {
    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { formOpen, formMode } = useSelector(state => state.users)


    return (


        <Modal
            title={`Change Password User`}
            width={700}
            open={formOpen && formMode === "change_password"}
            footer={null}
            maskClosable={true}
            destroyOnClose={true}
            onCancel={() => dispatch(handleFormModalCancel())}
        >
            <ChangePasswordForm />
        </Modal>
    )
}

export default ChangePasswordFormModal



export const ChangePasswordForm = () => {

    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { formMode, selected } = useSelector(state => state.users)

    const { permissions_list, groups_list } = useSelector(state => state.access)

    const [form] = Form.useForm();
    const [errors, setErrors] = useState({})


    const onFinish = (values) => {

        if (formMode === "change_password") {
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
                >


                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="password1"
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
                        <Col span={24}>
                            <Form.Item
                                name="password2"
                                label="Confirm Password"

                                dependencies={['password1']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password1') === value) {
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



                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </>
    )
}
