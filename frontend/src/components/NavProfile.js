import { } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Icon from './icon';
import {
    EditOutlined,
    SettingOutlined,
    ShopOutlined,
    QuestionCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons';
const NavProfile = () => {
    const menuItem = [
        {
            title: "Edit Profile",
            icon: EditOutlined,
            path: "/"
        },

        {
            title: "Account Setting",
            icon: SettingOutlined,
            path: "/"
        },
        {
            title: "Billing",
            icon: ShopOutlined,
            path: "/"
        },
        {
            title: "Help Center",
            icon: QuestionCircleOutlined,
            path: "/"
        }
    ]
    const profileMenu = (
        <div className="nav-profile nav-dropdown">
            <div className="nav-profile-header">
                <div className="d-flex">
                    <Avatar size={45} src={"https://joeschmoe.io/api/v1/random"} />
                    <div className="pl-3">
                        <h4 className="mb-0">{"username"}</h4>
                        <span className="text-muted">{"first_name"} {"last_name"}</span>
                    </div>
                </div>
            </div>
            <div className="nav-profile-body">
                <Menu>
                    {menuItem.map((el, i) => {
                        return (
                            <Menu.Item key={i}>
                                <a href={el.path}>
                                    <Icon className="mr-3" type={el.icon} />
                                    <span className="font-weight-normal">{el.title}</span>
                                </a>
                            </Menu.Item>
                        );
                    })}
                    <Menu.Item key={menuItem.length + 1}>
                        <span>
                            <LogoutOutlined className="mr-3" />
                            <span className="font-weight-normal">Sign Out</span>
                        </span>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
    return (
        <>
            <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
                <Menu className="d-flex align-item-center" mode="horizontal">
                    <Menu.Item key="profile">
                        <Avatar src={"https://joeschmoe.io/api/v1/random"} />
                    </Menu.Item>
                </Menu>
            </Dropdown>
        </>
    )
}

export default NavProfile

