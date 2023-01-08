import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const LoadingWrapper = () => {
    return (
        <>

            <div className={`loading`} style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>

                <h1>
                    {process.env.REACT_APP_NAME}
                </h1>
                <Spin size="large" />
            </div>
        </>
    )
}

export default LoadingWrapper