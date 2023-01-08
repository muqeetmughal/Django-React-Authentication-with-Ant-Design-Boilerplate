import { Button, Col, Form, Input, message, Row, Select, Switch } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../../services/Users.service';
import ClientsService from '../../../services/Clients.service';
const { Option } = Select;
const layout = {
    // labelCol: {
    //     span: 8,
    // },
    // wrapperCol: {
    //     span: 16,
    // },
};


const UserForm = ({ mode = "add", data = {} }) => {

  

    const navigate = useNavigate()
    const [form] = Form.useForm();




    React.useEffect(() => {
      



    }, [])

    const onFinish = (values) => {

        if (mode === "add") {
            UsersService.createUser(values)
                .then((resp) => {
                    if (resp.data.success) {
                        form.resetFields()
                        message.success(resp.data.msg)
                        navigate("/users")


                    } else {
                        message.error(resp.data.msg)
                    }
                }).catch((err) => {
                    return Promise.reject(err)
                })
        } else if (mode === "edit") {
            UsersService.editUser(data?._id, values)
                .then((resp) => {
                    if (resp.data.success) {
                        form.resetFields()
                        message.success(resp.data.msg)
                        navigate("/users")

                    } else {
                        message.error(resp.data.msg)
                    }
                }).catch((err) => {
                    return Promise.reject(err)
                })

        }

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <Row gutter={[8, 8]}>
            <Form
                {...layout}
                autoComplete="off"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: "100%" }}
                initialValues={mode === "edit" ? data : {}}
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
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
                                    required: true,
                                },
                            ]}
                        >
                            <Input />

                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name="email"
                            label="Email"
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
            

                {mode === "add" ?

                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
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
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password />

                            </Form.Item>
                        </Col>
                    </Row>

                    :
                    <Row gutter={[8, 8]}>
                        <Col span={4}>
                            <Form.Item
                                name="active"
                                label="Active"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                valuePropName="checked"
                            >
                                <Switch />

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="authenticated"
                                label="Authenticated"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                valuePropName="checked"
                            >
                                <Switch />

                            </Form.Item>
                        </Col>
                    </Row>

                }




                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>

    );
};

export default UserForm;