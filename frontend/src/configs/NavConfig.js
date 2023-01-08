import { UserOutlined, DesktopOutlined} from '@ant-design/icons';

const navitems = [
    {
        key: "/dashboard",
        icon: <DesktopOutlined />,
        label: "Dashboard",
        allowed_permissions: [],
        allowed_roles: ["superadmin"],
    },
    {
        key: "/users",
        icon: <UserOutlined />,
        label: "Users",
        allowed_permissions: ["users.read"],
        allowed_roles: ["superadmin"],
    }
]



export default navitems