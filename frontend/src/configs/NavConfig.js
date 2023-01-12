import { UserOutlined, DesktopOutlined, LockOutlined} from '@ant-design/icons';

const navitems = [
    {
        key: "/dashboard",
        icon: <DesktopOutlined />,
        label: "Dashboard",
        allowed_permissions: ['dashboard.view_dashboard'],
    },
    {
        key: "/users",
        icon: <UserOutlined />,
        label: "Users",
        allowed_permissions: ["users.view_useraccount"],
    },
    {
        key: "/groups",
        icon: <LockOutlined />,
        label: "Groups",
        allowed_permissions: ["auth.view_group"],
    
    }
]



export default navitems