import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isLoggedIn: false
    },
    reducers: {
        loginUser: (state) =>{
          state.isLoggedIn = true;
        }
      }
})

export const { loginUser } = userSlice.actions

export const reduxIsLoggedIn = (state) => state.user.isLoggedIn

export default userSlice.reducer