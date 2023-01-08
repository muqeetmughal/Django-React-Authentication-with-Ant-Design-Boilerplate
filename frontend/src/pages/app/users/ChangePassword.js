import { Button, Col, Form, Input, message, Row } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import withAuthorizationCheck from '../../../hoc/withAuthCheck';
import UsersService from '../../../services/Users.service';

const ChangePassword = () => {

    const [form] = Form.useForm();
    const { id } = useParams()
    const navigate = useNavigate()

    const onFinish = (values) => {


        if (values.password === values.password2){

            UsersService.changePassword(id , values)
            .then(resp=>{
                if (resp.data.success){
                    message.success("Password Changed Successfully")
                    navigate("/users")

                }else{
                    message.error(resp.data.msg)
                }
            }).catch(err=>{
                message.error("Unable to change password")
                return Promise.reject(err)
            
    
                
            })
        }else{
            message.error("Passwords do not match")
        }



    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row gutter={[8, 8]}>
            <Form
                autoComplete="off"
                layout="vertical"
                form={form}
                name="change-password-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: "100%" }}
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="New Password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />

                        </Form.Item>

                        <Form.Item
                            name="password2"
                            label="Confirm password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Change Password
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>





            </Form>
        </Row>
    )
}

export default withAuthorizationCheck(ChangePassword, "users.change_password")