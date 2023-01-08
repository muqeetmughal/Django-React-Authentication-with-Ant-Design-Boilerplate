import React, { useState } from 'react'
import { LockOutlined } from '@ant-design/icons';
import OTPInput from "otp-input-react";
import jwt_decode from "jwt-decode";
import {
    Button,
    message,
    theme,
    Typography,
} from 'antd';
import AuthService from '../../services/Auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setMfaCredentials } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';


function OTPComponent() {

    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false)

    const { token } = theme.useToken()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { access, refresh } = useSelector(state => state.auth)

    const user = jwt_decode(access)

    function handleSubmit() {
        // setLoading(true)
        if (OTP.length !== 6) {
            message.error("Enter OTP")
        } else {
            setLoading(true)

            AuthService.sendotp({ otp: OTP })
                .then((resp) => {
                    if (resp.data.success) {
                        setLoading(false)
                        dispatch(setMfaCredentials({ user: resp.data.user, access, refresh }))
                        navigate("/")
                        message.success(resp.data.msg)

                    } else {
                        message.error(resp.data.msg)
                        setLoading(false)
                    }
                }).catch((err) => {
                    message.error(err)
                    console.log(err)
                })
        }



    }


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


            {/* <Typography.Title type='secondary' level={2}>{process.env.REACT_APP_NAME}</Typography.Title> */}
            <Typography.Title level={3}>Enter OTP</Typography.Title>
            <Typography.Text style={{ marginBottom: "5px" }}>For : {user.sub}</Typography.Text>

            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} style={{ marginBottom: "10px" }} inputStyles={{ color: token.colorPrimary, width: "40px", height: "40px", fontSize: "25px", background: token.colorBgLayout, border: "1px solid", borderRadius: "8px" }} inputClassName="ant-input-number-input" />

            <Button type="primary" htmlType="submit" loading={loading} onClick={handleSubmit} icon={<LockOutlined />}>
                Authenticate
            </Button>


        </div>
    )
}

export default OTPComponent