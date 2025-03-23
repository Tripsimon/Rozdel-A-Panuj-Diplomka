import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser, reduxReturnUser, reduxReturnUserAuthority } from '../store/userSlice';


function Navbar() {
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    const loggedUser = useSelector(reduxReturnUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleNavigation = (destination) => {
        navigate(destination);
    }

    const renderUnloggedUser = () => {

        if (!isLoggedIn) {
            return (<div className="navbar-end">
                <a onClick={() => document.getElementById('registerModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Registrace</a>
                <a onClick={() => document.getElementById('loginModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Přihlásit se</a>
            </div>)
        } else {
            return (<div className="navbar-end">
                Přihlášený uživatel: {loggedUser.userName}
                <a onClick={() => dispatch(logoutUser())} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Odhlasit</a>
            </div>)
        }
    }

    const logOffUser = () =>{
        dispatch(logoutUser)
    }

    return (
        <div className="sticky top-0 w-full p-0 rounded-md navbar bg-secondary">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn bg-primary btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="secondary"
                            viewBox="0 0 24 24"
                            stroke="secondary">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1ds</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a onClick={() => handleNavigation('/')} className="text-xl btn btn-ghost text-primary">Rozděl a Panuj</a>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    <li>
                        <details>
                            <summary className='text-primary'>Informace</summary>
                            <ul className="p-2 text-primary">
                                <li><a onClick={() => handleNavigation('/rules')}>Pravidla</a></li>
                                <li><a onClick={() => handleNavigation('/thanks')}>Poděkování</a></li>
                            </ul>
                        </details>
                    </li>
                    {isLoggedIn?<>
                    <li><a onClick={() => handleNavigation('/adventurers')} className='text-primary'>Správa dobrodruhů</a></li>
                    <li><a className='text-primary'>Připojit se</a></li>
                    </>:""}
                    {loggedUser.userAuthority == "admin" ? <li>
                        <details>
                            <summary className='text-primary'>Administrace</summary>
                            <ul className="p-2 text-primary">
                                <li><a onClick={() => handleNavigation('/admin/monsters')}>Sprava monster</a></li>
                                <li><a onClick={() => handleNavigation('/admin/items')}>Sprava predmetu</a></li>
                                <li><a onClick={() => handleNavigation('/admin/maps')}>Sprava lokalit</a></li>
                            </ul>
                        </details>
                    </li>
                        : ""}
                </ul>
            </div>
            {renderUnloggedUser()}
        </div>
    )
}

export default Navbar