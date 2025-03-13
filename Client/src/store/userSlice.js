import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isLoggedIn: false,
        userID: 0,
        userName: "",
        userAuthority: 'user'
    },
    reducers: {
        loginUser: (state, vec) =>{
          state.isLoggedIn = true;
          state.userID = vec.payload.id
          state.userAuthority = vec.payload.opravneni
          state.userName = vec.payload.name
        },
        logoutUser: (state) =>{
          state.isLoggedIn = false;
        }
      }
})

export const { loginUser, logoutUser } = userSlice.actions

export const reduxIsLoggedIn = (state) => state.user.isLoggedIn

export default userSlice.reducer