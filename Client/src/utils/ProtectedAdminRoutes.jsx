import { Outlet, Navigate} from "react-router-dom";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reduxIsLoggedIn, reduxReturnUser  } from '../store/userSlice';



const ProtectedAdminRoutes = () =>{
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    const loggedUser = useSelector(reduxReturnUser)
    if(loggedUser.userAuthority == "admin" && isLoggedIn){
        return <Outlet></Outlet>
    }else{
        return <Navigate to={"/"}/>
    }
}

export default ProtectedAdminRoutes
