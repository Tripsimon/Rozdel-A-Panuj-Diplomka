import { Outlet, Navigate} from "react-router-dom";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser } from '../store/userSlice';



const ProtectedRoutes = () =>{
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    return isLoggedIn ? <Outlet></Outlet> : <Navigate to="/" />
}

export default ProtectedRoutes
