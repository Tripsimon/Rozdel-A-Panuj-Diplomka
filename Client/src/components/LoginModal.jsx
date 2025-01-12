import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {reduxIsLoggedIn, loginUser } from '../store/userSlice';

function LoginModal() {
    const dispatch = useDispatch()
    
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("")

/**
 * Metoda pro přihlášení uživatele
 */
    function prihlaseni() {
        axios.post(axios.defaults.baseURL + '/uzivatel/prihlaseni', { 'email': emailState, 'heslo': passwordState })
            .then(queryResponse => {
                switch (queryResponse.data) {
                    case 'noUser':
                        alertTitle.value = "Učet nenalezen",
                            alertText.value = 'Nebyl nalezen učet s tímto E-Mailem. Prosím, zkontroluje zadaná data'
                        showAlert.value = true
                        break;

                    case 'wrongPass':
                        alertTitle.value = "špatné přihlašovací udaje",
                            alertText.value = 'Byly zadány špatné přihlašovací udaje. Prosím, zkuste to znovu'
                        showAlert.value = true
                        break;

                    default:
                        if (queryResponse.status == 200 || queryResponse.data != null) {
                            dispatch(loginUser())
                        }
                        break;
                }
            }
            )
    }

    return (
        <>
            <dialog id="loginModal" className="modal">
                <div className="modal-box">
                    <h3 className="mb-10 text-lg font-bold text-primary">Přihlášení</h3>

                    <input type="text" placeholder="Email" onChange={(event) => { setEmailState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                    <input type="text" placeholder="Heslo" onChange={(event) => { setPasswordState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="mx-5 btn text-primary" onClick={() => {prihlaseni()}}>Přihlásit</button>
                            <button className="btn text-primary">Zavřít</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default LoginModal