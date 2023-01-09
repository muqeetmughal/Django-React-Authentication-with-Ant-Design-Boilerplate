import { UserOutlined, DesktopOutlined, LockOutlined} from '@ant-design/icons';

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
    },
    {
        key: "/access",
        icon: <LockOutlined />,
        label: "Access",
        allowed_permissions: ["users.read"],
        allowed_roles: ["superadmin"],
        children : [
            {
                key: "/access/roles",
                icon: <LockOutlined />,
                label: "Roles",
                allowed_permissions: ["users.read"],
                allowed_roles: ["superadmin"]
            },
            {
                key: "/access/permissions",
                icon: <LockOutlined />,
                label: "Permissions",
                allowed_permissions: ["users.read"],
                allowed_roles: ["superadmin"],
            }
        ]
    }
]



export default navitems