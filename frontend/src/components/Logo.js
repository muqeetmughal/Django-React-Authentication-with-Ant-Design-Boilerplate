import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from 'antd'
import appConfigs from 'common/appConfigs'



const Logo = () => {


    const { token } = theme.useToken()

    return (
        <>
            <div className="logo" style={{ color: token.colorTextBase, marginLeft: "10px", fontSize: "20px" }}>
                <Link to={"/"} style={{ color: token.colorPrimary}}>
                    {appConfigs.NAME}
                </Link>
            </div>
        </>
    )
}

export default Logo