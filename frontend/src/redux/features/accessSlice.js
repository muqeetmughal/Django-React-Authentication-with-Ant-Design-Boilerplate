import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "common/api";

const initialState = {
    groups_list: [],
    permissions_list: [],

    loading: true,
    formOpen: false,
    formMode: "add",
    formValues: {},
    selected: null,


}


export const fetchPermissions = createAsyncThunk('access/fetchPermissions', async (data, thunkAPI) => {
    const response = await api.get("/permissions/", data)
    return response.data
})

export const fetchGroups = createAsyncThunk('access/fetchGroups', async (data, thunkAPI) => {
    const response = await api.get("/groups/")
    return response.data
})
export const createGroup = createAsyncThunk('access/createGroup', async (data, thunkAPI) => {
    const response = await api.post("/groups/", data)
    return response.data
})



const accessSlice = createSlice({
    name: "access",
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

        builder.addCase(fetchPermissions.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchPermissions.fulfilled, (state, action) => {
            state.permissions_list = action.payload
            state.loading = false
        })
        builder.addCase(fetchGroups.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchGroups.fulfilled, (state, action) => {
            state.groups_list = action.payload
            state.loading = false
        })
    },
})


export const { setFormOpen, setFormMode, setFormValues, setSelected, handleFormModalCancel, handleFormModalCreate, handleFormModalEdit } = accessSlice.actions
export default accessSlice.reducer