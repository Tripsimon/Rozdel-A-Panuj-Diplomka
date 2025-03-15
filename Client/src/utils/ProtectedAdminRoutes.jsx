import { Outlet, Navigate} from "react-router-dom";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn  } from '../store/userSlice';



const ProtectedAdminRoutes = () =>{
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    return isLoggedIn ? <Outlet></Outlet> : <Navigate to="/" />
}

export default ProtectedAdminRoutes
