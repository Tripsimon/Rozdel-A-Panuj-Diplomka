import React, { useState } from 'react'
import axios from 'axios'
import { useSelector,  useDispatch } from 'react-redux';
import { changeUser } from '../store/userSlice';

function RegisterModal() {
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
        dispatch(changeUser("DASDSA"))

        return

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
                            uzivatelStore.$patch({
                                prihlasen: true,
                                prezdivka: this.prezdivka,
                                _id: queryResponse.data
                            })
                            router.push({ path: '/' })
                        }
                        break;
                }
            })
    }

    return (
        <>
            <dialog id="registerModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-10 text-primary">Registrace</h3>

                    <input type="email" onChange={(event) => {setEmailState(event.target.value);}} placeholder="Email" className="input input-bordered w-full mb-5 " />
                    <input type="text" placeholder="Přezdívka" className="input input-bordered w-full mb-5" />
                    <input type="password" placeholder="Heslo" className="input input-bordered w-full mb-5 " />
                    <input type="password" placeholder="Opakovat heslo" className="input input-bordered w-full mb-5" />
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={() => { register() }} className="btn text-primary mx-5">Registrovat</button>
                            <button className="btn text-primary">Zavřít</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default RegisterModal