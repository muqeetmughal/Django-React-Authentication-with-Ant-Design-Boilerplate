import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "common/api";

const initialState = {
    users_list: [],
    // permissions_list: [],

    loading: true,
    formOpen: false,
    formMode: "add",
    formValues: {},
    selected: null,


}



export const fetchUsers = createAsyncThunk('users/fetchUsers', async (data, thunkAPI) => {
    const response = await api.get("/users/")
    return response.data
})



const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setFormOpen: (state, action) => {
            state.formOpen = action.payload

        },

        setFormMode: (state, action) => {
            state.formMode = action.payload

        },
        setFormValues: (state, action) => {
            state.formValues = action.payload

        },
        setSelected: (state, action) => {
            state.selected = action.payload

        },
        handleFormModalCancel: (state, action) => {
            state.formValues = {};
            state.formMode = "add";
            state.formOpen = false;
        },
        handleFormModalCreate: (state, action) => {
            state.formValues = {};
            state.formMode = "add";
            state.formOpen = true;
        },
        handleFormModalEdit: (state, action) => {
            state.formValues = action.payload;
            state.formMode = "edit";
            state.formOpen = true;
        },
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


export const { setFormOpen, setFormMode, setFormValues, setSelected, handleFormModalCancel, handleFormModalCreate, handleFormModalEdit } = usersSlice.actions
export default usersSlice.reducer