import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catalog: false,
    resources: false, 
    community: false, 
    career: false, 
    avatar: false ,
}

const NavbarSlice = createSlice({
    name:"Navbar",
    initialState,
    reducers:{
        toggleNavbar: (state,action)=>{
            const buttonName = action.payload;
            Object.keys(state).forEach((key)=>{if(key != buttonName){state[key] = false}} );
            state[buttonName] = !state[buttonName];
         }
    }
})

export const {toggleNavbar} = NavbarSlice.actions
export default NavbarSlice.reducer;