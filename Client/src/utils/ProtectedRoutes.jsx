import { Outlet, Navigate} from "react-router-dom";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser, reduxReturnUserAuthority } from '../store/userSlice';



const ProtectedRoutes = () =>{
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    const userAuthority = useSelector(reduxReturnUserAuthority)
    if(userAuthority == "admin" && isLoggedIn){
        return <Outlet></Outlet>
    }else{
        return <Navigate to={"/"}/>
    }
}

export default ProtectedRoutes
