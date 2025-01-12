import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isLoggedIn: false
    },
    reducers: {
        loginUser: (state) =>{
          state.isLoggedIn = true;
        },
        logoutUser: (state) =>{
          state.isLoggedIn = false;
        }
      }
})

export const { loginUser, logoutUser } = userSlice.actions

export const reduxIsLoggedIn = (state) => state.user.isLoggedIn

export default userSlice.reducer