import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, loginUser } from '../store/userSlice';

import AlertDriver from './AlertDriver';

function LoginModal() {
    const dispatch = useDispatch()

    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("")

    //Upozorneni
    const [alertState, setAlertState] = useState({
        showAlert: false,
        alertTyp: "",
        alertText: ""
    })

    /**
     * Metoda pro přihlášení uživatele
     */
    function prihlaseni() {
        axios.post(axios.defaults.baseURL + '/uzivatel/prihlaseni', { 'email': emailState, 'heslo': passwordState })
            .then(queryResponse => {
                switch (queryResponse.data) {
                    case 'No User Found':
                        setAlertState({
                            showAlert: true,
                            alertTyp: "error",
                            alertText: "Uživatel s těmito informacemi nebyl nalezen. Prosím zkuste operaci znovu."
                        })
                        break;

                    case 'Wrong Password':
                        setAlertState({
                            showAlert: true,
                            alertTyp: "error",
                            alertText: "KOmbinace emailu a hesla není správná. Prosím zkuste operaci znovu."
                        })
                        break;

                    default:
                        if (queryResponse.status == 200 || queryResponse.data != null) {
                            dispatch(loginUser({ id: queryResponse.data._id, opravneni: queryResponse.data.opravneni, name: queryResponse.data.prezdivka }))
                        }
                        break;
                }
            }
            )
    }

    return (
        <dialog id="loginModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary">Přihlášení</h3>
                <div className="mb-10 divider divider-warning"></div>
                {alertState.showAlert ? <AlertDriver alertState={alertState}></AlertDriver> : ""}
                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Email</legend>
                    <input type="email" onChange={(event) => { setEmailState(event.target.value); }} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Heslo</legend>
                    <input type="password" onChange={(event) => { setPasswordState(event.target.value); }} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>


                <div className="modal-action">
                    <form method="dialog">


                        <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { prihlaseni() }}>Přihlásit</button>
                        <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default LoginModal