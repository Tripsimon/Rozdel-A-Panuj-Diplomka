import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleNavigation = (destination) => {
        navigate(destination);
    }

    return (
        <div className="navbar bg-secondary rounded-md w-full p-0 sticky top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn bg-primary btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                <a onClick={() => handleNavigation('/')} className="btn btn-ghost text-xl text-primary">Rozděl a Panuj</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='text-primary'>Item 1</a></li>
                    <li>
                        <details>
                            <summary className='text-primary'>Informace</summary>
                            <ul className="p-2 text-primary">
                                <li><a onClick={() => handleNavigation('/rules')}>Pravidla</a></li>
                                <li><a onClick={() => handleNavigation('/thanks')}>Poděkování</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a className='text-primary'>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a onClick={() => document.getElementById('registerModal').showModal()} className="btn btn-outline uppercase m-2 text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Registrace</a>
                <a onClick={() => document.getElementById('loginModal').showModal()} className="btn btn-outline uppercase m-2 text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Přihlásit se</a>
            </div>
        </div>
    )
}

export default Navbar