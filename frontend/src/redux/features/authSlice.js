import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "common/api";


// const initiateLogin = createAsyncThunk("auth/login")

const { access, refresh, user, permissions } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {}


export const fetchWhoAmI = createAsyncThunk(
    'auth/whoAmI',
    async (data, thunkAPI) => {
        const response = await api.post("/api/token/", data)
        return response.data
    }
)



const initialState = {
    loading: false,
    user: user,
    access: access,
    refresh: refresh,
    permissions: permissions
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginCredentials: (state, action) => {

            const { access, refresh, user, permissions } = action.payload
            state.access = access
            state.refresh = refresh
            state.user = user
            state.permissions = permissions

            localStorage.setItem("auth", JSON.stringify(action.payload))

        },
        setRefreshCredentials: (state, action) => {

            const { access, refresh } = action.payload
            state.access = access
            state.refresh = refresh
            localStorage.setItem("auth", JSON.stringify(action.payload))
        },
        logOut: (state, action) => {
            localStorage.removeItem("auth")
            state.user = null
            state.permissions = null
            state.access = null
            state.refresh = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchWhoAmI.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchWhoAmI.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        })
    },
})


export const { setLoginCredentials, setRefreshCredentials, logOut,setLoading } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.access