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

        if(emailState == ""){
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Všechny položky musí být vyplněny. Prosím zkuste tuto operaci znovu"
            })
            return
        }


        axios.post(axios.defaults.baseURL + "/uzivatel/registrace", { 'email': emailState, 'prezdivka': prezdivkaState, 'heslo': hesloState })
            .then(queryResponse => {
                switch (queryResponse.data) {
                    case 'usedMail':
                        showAlert.value = true;
                        alertTitulek.value = "Využitá adresa"
                        alertText.value = 'Tato E-Mailová adresa je již využívána. Prosím, zvolte jinou'
                        break;

                    case 'usedNick':
                        showAlert.value = true;
                        alertTitulek.value = "Využitá přezdívka"
                        alertText.value = 'Tato přezdívka adresa je již využívána.'
                        break;

                    default:
                        if (queryResponse.status == 201 || queryResponse.data != null) {
                            dispatch(loginUser({ id: queryResponse.data, opravneni: 'uzivatel', name: prezdivkaState }))
                            document.getElementById('registerModal').close()
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
                { alertState.showAlert ? <AlertDriver alertState={alertState}></AlertDriver>:""}

                <div className="hidden validator-hint">Enter valid email address</div>
                <input type="email" onChange={(event) => { setEmailState(event.target.value); }} placeholder="Email" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Přezdívka" onChange={(event) => { setPrezdivkaState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <input type="password" placeholder="Heslo" onChange={(event) => { setHesloState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="password" placeholder="Opakovat heslo" className="w-full mb-5 input input-bordered" />
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