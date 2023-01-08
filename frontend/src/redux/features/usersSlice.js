import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "common/api";


const initialState = {
    users_list: [],
    loading: false
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (thunkAPI) => {
        const response = await api.get("/users/")
        console.log(response)
        return response.data
    }
)


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        // logOut: (state, action) => {
        //     state.user = null
        //     state.access = null
        //     state.refresh = null
        // }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users_list = action.payload
            state.loading = false
        })
    },
})


export const { } = usersSlice.actions
export default usersSlice.reducer



