import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDrawerOpen: false,
    isProfileExtended: false,
    isResourceExtended:false,
    isCommunityExtended:false
}

const DrawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen
        },
        toggleProfileExtended: (state) => {
            state.isProfileExtended = !state.isProfileExtended
        },
        setDrawer: (state, action) => {
            const value = action?.payload
            state.isDrawerOpen = value
        },
        setProfileExtended: (state, action) => {
            const value = action.payload
            state.isProfileExtended = value
        },
        setResourceExtended: (state, action) => {
            const value = action.payload
            state.isResourceExtended = value
        },
        setCommunityExtended: (state, action) => {
            const value = action.payload
            state.isCommunityExtended = value
        },
    },
    extraReducers: () => {
    }
})

export const { toggleDrawer, toggleProfileExtended, setDrawer, setProfileExtended ,setResourceExtended,setCommunityExtended} = DrawerSlice.actions
export default DrawerSlice.reducer