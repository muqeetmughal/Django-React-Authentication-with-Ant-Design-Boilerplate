import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

export const isJWTExpired = (token) => {

    const user = jwt_decode(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    return isExpired
}


export const return_expiry_date = (access, refresh) => {

    try {

        const access_user = jwt_decode(access)
        const refresh_user = jwt_decode(refresh)

        const access_expiry = dayjs.unix(access_user.exp).diff(dayjs())
        const refresh_expiry = dayjs.unix(refresh_user.exp).diff(dayjs())

        return {
            access_token_expiry: access_expiry / 1000,
            refresh_token_expiry: refresh_expiry / 1000

        }
    } catch {
        return {
            access_token_expiry: 0,
            refresh_token_expiry: 0

        }
    }



}

export function filterNavItems(user, navitems) {

    let final_nav_items = []

    
    if (user) {

        // var isPermitted = user.role?.find(role_ => allowedRoles?.includes(role_))



        navitems.forEach((navitem, i) => {

            var isPermitted = user.is_superuser || user.user_permissions?.find(permission => navitem.allowed_permissions?.includes(permission))


            if (isPermitted) {

                final_nav_items.push(navitem)
            }

            // console.log(navitem.key, isPermitted)

        })

        return final_nav_items
    } else {
        return navitems
    }


}

export const toCapitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
}