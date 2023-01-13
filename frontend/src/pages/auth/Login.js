import { Typography } from 'antd';

import appConfigs from 'common/appConfigs';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginCredentials, logOut, setLoading } from 'redux/features/authSlice'
// import AuthService from '../services/Auth.service';

import { LockOutlined } from '@ant-design/icons';
import api from 'common/api';
import { ENTRY_ROUTE } from 'common/constants';
import { fetchPermissions } from 'redux/features/accessSlice';


const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    // const [loading, setLoading] = useState(false)
    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const onFinish = async (values) => {
        dispatch(setLoading(true))

        api.post("/api/token/", values).then((resp) => {
            // dispatch(fetchPermissions())
            dispatch(setLoginCredentials({ ...resp.data }))


            if (location.state?.from) {
                navigate(location.state.from)
            }else{
                navigate(ENTRY_ROUTE)
            }

            message.success("Successfully Logged in")
        }).catch(err => {

            console.log("Error here", err.response)
            if (err.response.data) {
                message.error(err.response.data.detail)
            }
            else {
                message.error("Unable to login check internet")
            }


        })


        dispatch(setLoading(false))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };





    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                <Typography.Title type='secondary' level={2}>{appConfigs.NAME}</Typography.Title>
                <Form
                    layout='vertical'
                    name="login"
                    // labelCol={{
                    //     span: 4,
                    // }}
                    // wrapperCol={{
                    //     span: 24,
                    // }}
                    initialValues={{
                        remember: true,
                        // email: "muqeetmughal786@gmail.com",
                        // password: "12345678"
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >


                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                    // wrapperCol={{
                    //     span: 4,
                    // }}
                    >
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            <LockOutlined />
                            Login
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    );
};

export default Login;