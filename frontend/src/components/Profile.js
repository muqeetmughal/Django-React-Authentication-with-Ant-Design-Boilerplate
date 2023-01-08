import { Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const { user } = useSelector((state) => state.auth)

    const styles = {


        text: {
            paddingLeft: 5,
            fontSize: 10
        },
        component: {
            paddingLeft: "10px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "2px",
            marginBottom: "5px",
        }


    }
    return (
        <>
            <div style={styles.component}>

                <Avatar size={25} icon={<UserOutlined />} />
                <Typography.Text style={styles.text}>
                    {user?.email}
                </Typography.Text>
            </div>
        </>
    )
}

export default Profile