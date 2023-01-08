import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {

    const navigate = useNavigate()

    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="secondary" onClick={() => navigate(-1)}>Back Back</Button>}
            />
        </>
    )
}

export default NotFound