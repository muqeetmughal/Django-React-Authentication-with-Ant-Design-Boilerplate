import { Button, Col, Form, Input, message, Row, Spin, theme, Tooltip, Typography } from 'antd'
import React from 'react'
import { useState } from 'react'
import { IoCopyOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthService from 'services/Auth.service'
import OTPInput from "otp-input-react";
import ButtonGroup from 'antd/lib/button/button-group'
import "./register.css"

const Register = () => {

    let access = useSelector(state => state.auth?.access)


    const [secret_key_visible, setSecretkeyVisible] = useState(false)

    const [secret_key, setSecretkey] = useState("")
    const [secret_key_dots, setSecretkeyDots] = useState("")

    const [qrcode_image, setQRCodeImage] = useState(null)
    const [otp, setOTP] = useState("")
    const { token } = theme.useToken()

    const navigate = useNavigate()

    React.useEffect(() => {

        AuthService.getQrCode()
            .then(resp => {
                const svg_image = resp.data[0];
                const secret_key_from_api = resp.data[2].secret_key;
                setSecretkey(secret_key_from_api)

                setSecretkeyDots(_ => new Array(String(secret_key_from_api).length + 1).join("*"))

                setQRCodeImage(svg_image)

            })

    }, [])


    const toggleSecret = () => {
        setSecretkeyVisible(!secret_key_visible)
    }

    function onCopyClick() {
        navigator.clipboard.writeText(secret_key)
        message.success("Copied to Clipboard")
    }




    async function onFinish() {


        const form_data = {
            "secret_key": secret_key,
            "otp": otp
        }

        if (otp.length !== 6) {
            message.error("Make sure OTP is 6 digits")
        } else {
            AuthService.registerMFA(form_data)
                .then(resp => {

                    if (resp.data.success) {
                        message.success(resp.data.msg)
                        navigate("/auth/login")
                    } else {
                        message.error(resp.data.msg)
                    }

                })
        }


    }




    return (
        <>
            {access ?

                <>

                    <Typography.Title type='secondary' level={2}>Register MFA</Typography.Title>

                    <Row justify="center" align='middle'>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 12 }}>

                            {qrcode_image ? <div dangerouslySetInnerHTML={{ __html: qrcode_image }} /> : <Spin />}



                            <h1>Instructions:</h1>
                            <ul>
                                <li>Download <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en&amp;gl=US" target="_blank" rel="noreferrer">Google Authenticator</a> on your mobile.</li>
                                <li><strong>Scan QR code</strong> or <strong>Copy given secret key</strong> in authenticator app.</li>
                                <li>Select Time Based authentication</li>
                                <li>Enter generated otp in input field.</li>
                            </ul>

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 12 }}>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography.Title level={3}>Enter OTP</Typography.Title>
                                <Input.Group compact style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>



                                    <Input
                                        value={secret_key_visible ? secret_key : secret_key_dots}
                                        style={{
                                            width: '100%',
                                            marginBottom: "10px"
                                        }}
                                        disabled
                                    />

                                    <div style={{ marginBottom: "10px" }}>

                                        <Button onClick={toggleSecret} icon={secret_key_visible ? <IoEyeOutline /> : <IoEyeOffOutline />} >View Secret Key</Button>
                                        <Button onClick={onCopyClick} icon={<IoCopyOutline />} >Copy</Button>
                                    </div>
                                    <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} style={{ marginBottom: "10px" }} inputStyles={{ color: token.colorPrimary, width: "40px", height: "40px", fontSize: "25px", background: token.colorBgLayout, border: "1px solid", borderRadius: "8px" }} inputClassName="ant-input-number-input" />

                                    <Button type="primary" onClick={onFinish}>Register</Button>
                                </Input.Group>




                            </div>
                        </Col>


                    </Row>



                </>

                :
                <Navigate to={"/login"} />
            }

        </>
    )
}

export default Register