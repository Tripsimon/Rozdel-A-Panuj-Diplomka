import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, loginUser } from '../store/userSlice';

function RegisterModal() {
    const isLoggedIn = useSelector(reduxIsLoggedIn)
    const dispatch = useDispatch()

    const [emailState, setEmailState] = useState("");
    const [prezdivkaState, setPrezdivkaState] = useState("")
    const [hesloState, setHesloState] = useState("")

    //Upozorneni
    const [alertToggleState, setAlertToggleState] = useState("")
    const [alertTitleState, setAlertTitleState] = useState("")
    const [alertTextState, setAlertTextState] = useState("")

    const rules = {
        hesloRule: [
            value => {
                if (value?.length > 7) return true
                return 'Heslo musí obsahovat alespon 8 znaků'
            },],

        nameRule: [
            value => {
                if (value?.length > 3) return true
                return 'Jméno musí obsahovat alespon 4 znaky'
            },],

        emailRule: [
            value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Formát zadání není E-Mail'
        ],

        againPassword: [
            value => {
                if (value == heslo.value) return true
                return 'Heslo se neschoduje'
            }
        ]
    }

    /**
     * Funkce, která po odeslání požadavku zajistí registraci uživatele
     */
    function register() {


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
                            dispatch(loginUser({id:queryResponse.data, opravneni: 'uzivatel', name: prezdivkaState }))
                        }
                        break;
                }
            })
    }

    return (
        <dialog id="registerModal" className="modal">
            <div className="modal-box">
                <h3 className="mb-10 text-lg font-bold text-primary">Registrace</h3>
                <input type="email" onChange={(event) => { setEmailState(event.target.value); }} placeholder="Email" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Přezdívka" onChange={(event) => { setPrezdivkaState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <input type="password" placeholder="Heslo" onChange={(event) => { setHesloState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="password" placeholder="Opakovat heslo" className="w-full mb-5 input input-bordered" />
                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={() => { register() }} className="mx-5 btn text-primary">Registrovat</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default RegisterModal