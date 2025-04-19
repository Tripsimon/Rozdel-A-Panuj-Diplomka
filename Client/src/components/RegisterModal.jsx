import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, loginUser } from '../store/userSlice';
import AlertDriver from './AlertDriver';

function RegisterModal() {
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    const dispatch = useDispatch()

    const [emailState, setEmailState] = useState("");
    const [prezdivkaState, setPrezdivkaState] = useState("")
    const [hesloState, setHesloState] = useState("")
    const [passwordRepeatState, setPasswordRepeatState] = useState("")

    //Upozorneni
    const [alertState, setAlertState] = useState({
        showAlert: false,
        alertTyp: "",
        alertText: ""
    })


    /**
     * Funkce, která po odeslání požadavku zajistí registraci uživatele
     */
    function register() {

        if (emailState == "" || prezdivkaState == "" ||hesloState == "" ||passwordRepeatState == "" ) {
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Všechny položky musí být vyplněny. Prosím zkuste tuto operaci znovu"
            })
            return
        }

        if (hesloState != passwordRepeatState ) {
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Heslo se musí shodovat. Prosím, zkuste zadat data znovu"
            })
            return
        }

        var re = /\S+@\S+\.\S+/;

        if (!re.test(emailState)) {
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Zadaný email není email. Prosím zkuste data zadat znovu"
            })
            return
        }




        axios.post(axios.defaults.baseURL + "/uzivatel/registrace", { 'email': emailState, 'prezdivka': prezdivkaState, 'heslo': hesloState })
            .then(queryResponse => {
                switch (queryResponse.data) {
                    case 'usedMail':

                        setAlertState({
                            showAlert: true,
                            alertTyp: "error",
                            alertText: "Tato E-Mailová adresa je již využívána. Prosím, zvolte jinou"
                        })
                        break;

                    case 'usedNick':
                        setAlertState({
                            showAlert: true,
                            alertTyp: "error",
                            alertText: "Tato přezdívka adresa je již využívána."
                        })
                        alertText.value = 'Tato přezdívka adresa je již využívána. Prosím, použíjte jinou'
                        break;

                    default:
                        if (queryResponse.status == 201 || queryResponse.data != null) {
                            dispatch(loginUser({ id: queryResponse.data, opravneni: 'uzivatel', name: prezdivkaState }))
                            document.getElementById('registerModal').close()

                            setAlertState({
                                showAlert: false,
                                alertTyp: "",
                                alertText: ""
                            })
                        }
                        break;
                }
            })
    }

    return (
        <dialog id="registerModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary">Registrace</h3>
                <div className="mb-10 divider divider-warning"></div>
                {alertState.showAlert ? <AlertDriver alertState={alertState}></AlertDriver> : ""}


                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Email</legend>
                    <input type="email" onChange={(event) => { setEmailState(event.target.value); }}  className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>

                
                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Přezdívka</legend>
                    <input type="text"  onChange={(event) => { setPrezdivkaState(event.target.value); }} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Heslo</legend>
                    <input type="password"  onChange={(event) => { setHesloState(event.target.value); }} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Opakovat heslo</legend>
                    <input type="password" onChange={(event) => { setPasswordRepeatState(event.target.value); }} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    <p className="label"></p>
                </fieldset>
                <div className="modal-action">
                    <form method="dialog">
                        <button type='button' onClick={() => { register() }} className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Registrovat</button>
                        <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default RegisterModal