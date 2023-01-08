import { createSlice } from "@reduxjs/toolkit";
import { theme } from "antd";
const initialState = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : {
    sidebarCollapsed: false,
    darkModeEnabled: true,
    customTheme: {
        token: {
            wireframe: false,
            fontSize: 13,
            colorPrimary: "#00bd52",
            borderRadius: 0,
        }
    },
    direction: "ltr",
}


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleSidebar: (state) => {


            localStorage.setItem("theme", JSON.stringify({
                ...state,
                sidebarCollapsed: !state.sidebarCollapsed
            }))

            state.sidebarCollapsed = !state.sidebarCollapsed
        },
        setSidebar: (state, action) => {
            localStorage.setItem("theme", JSON.stringify({
                ...state,
                sidebarCollapsed: action.payload
            }))
            state.sidebarCollapsed = action.payload
        },
        setTheme: (state, action) => {
            state.customTheme = action.payload
            localStorage.setItem("theme", JSON.stringify({
                ...state,
                customTheme: action.payload
            }))
        },
        setDarkMode: (state, action) => {
            state.darkModeEnabled = action.payload
            localStorage.setItem("theme", JSON.stringify({
                ...state,
                darkModeEnabled: action.payload
            }))
        },
        setDirection: (state, action) => {
            localStorage.setItem("theme", JSON.stringify({
                ...state,
                direction: action.payload
            }))
            state.direction = action.payload
        },
    }
})


export const { toggleSidebar, setSidebar, setTheme, setDirection, setComponentSize,setDarkMode } = themeSlice.actions
export default themeSlice.reducer