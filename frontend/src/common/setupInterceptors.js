
import axiosInstance from './api'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import axios from 'axios';

import { logOut, setRefreshCredentials } from '../redux/features/authSlice';
import appConfigs from './appConfigs';


const AUTH_TOKEN = "auth"
const TOKEN_PAYLOAD_KEY = 'authorization'

const setup = (store) => {



    const { dispatch } = store;
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {

            // let { access, refresh } = localStorage.getItem(AUTH_TOKEN) ? JSON.parse(localStorage.getItem(AUTH_TOKEN)) : {}
            let { access, refresh, user } = store.getState().auth



            if (access) {

                const user_in_token = jwt_decode(access)

                const isExpired = dayjs.unix(user_in_token.exp).diff(dayjs()) < 1;

                if (!isExpired) {
                    config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + access
                } else {

                    try {

                        const refresh_token_data = { refresh: refresh }
                        const refresh_token_config = {
                            headers: {
                                authorization: "Bearer " + access
                            }
                        };


                        const resp = await axios.post(
                            `${appConfigs.API_BASE_URL}/api/token/refresh/`,
                            refresh_token_data,
                            refresh_token_config
                        )

                        const { access: new_access, refresh: new_refresh } = resp.data

                        const new_data_for_local_storage = {
                            access: new_access,
                            refresh: new_refresh,
                            user: user
                        }

                        localStorage.setItem(AUTH_TOKEN, JSON.stringify(new_data_for_local_storage))
                        dispatch(setRefreshCredentials({ ...new_data_for_local_storage }));
                        config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + new_access
                    } catch (Err) {
                        dispatch(logOut())
                    }
                }
            }


            return config;
        }, (error) => {

            console.log("Error during Request", error)
            // Do something with request error
            return Promise.reject(error);
        });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (res) => {
            // console.log("Response after Request complete", res)
            return res;
        },
        async (err) => {

            if (err.response.status === 401) {
                dispatch(logOut())
            }

            // const originalConfig = err.config;
            // if (originalConfig.url !== "/auth" && err.response) {
            //     // Access Token was expired
            //     if (err.response.status === 401 && !originalConfig._retry) {
            //         originalConfig._retry = true;
            //         try {
            //             axiosInstance.post("/refresh", {
            //                 refresh: TokenService.getLocalRefreshToken(),
            //             })
            //                 .then((resp) => {

            //                     dispatch(setCredentials({ ...resp.data }));
            //                     // TokenService.updateLocalAccessToken(rs.data.access);
            //                     return axiosInstance(originalConfig);
            //                 }).catch(err => {
            //                     console.log("Failed to refresh token")
            //                     dispatch(logOut())

            //                     history.replace("/login")

            //                     return Promise.reject(err);
            //                 })

            //             // // const { accessToken } = rs.data;

            //         } catch (_error) {
            //             return Promise.reject(_error);
            //         }
            //     }
            // }
            return Promise.reject(err);
        }
    );

}

export default setup;