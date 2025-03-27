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
          state.userID = 0
          state.userName = ""
          state.userAuthority= "user"
        }
      }
})

export const { loginUser, logoutUser } = userSlice.actions

export const reduxIsLoggedIn = (state) => state.user.isLoggedIn
export const reduxReturnUserAuthority = (state) => state.user.reduxReturnUserAuthority
export const reduxReturnUser = (state) => state.user

export default userSlice.reducer