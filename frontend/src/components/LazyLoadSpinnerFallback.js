import React from 'react';
import { Spin } from 'antd';
import { } from '@ant-design/icons';


const LazyLoadSpinnerFallback = () => {
    return (
        <>

            <div className={`loading`} style={{height : "60vh",display: 'flex', justifyContent: "center", alignItems: 'center'}}>

                <Spin/>
            </div>
        </>
    )
}

export default LazyLoadSpinnerFallback