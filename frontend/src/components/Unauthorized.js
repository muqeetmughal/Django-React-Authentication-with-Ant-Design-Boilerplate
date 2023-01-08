import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const Unauthorized = () => {

    const navigate = useNavigate()

    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not alloed to perform this action."
                extra={<Button type="secondary" onClick={() => navigate(-1)}>Back</Button>}
            />
        </>
    )
}

export default Unauthorized