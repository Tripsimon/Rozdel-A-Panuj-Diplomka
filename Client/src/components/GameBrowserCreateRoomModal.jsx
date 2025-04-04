import React, { useState } from 'react'
import AlertDriver from './AlertDriver';
import { useSelector } from 'react-redux';
import { reduxReturnUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GameBrowserCreateRoomModal() {
    const loggedUser = useSelector(reduxReturnUser)
    const navigate = useNavigate();

    const [sessionNameState, setSessionNameState] = useState("")
    const [sessionPasswordState, setSessionPasswordState] = useState("")

    const handleNavigation = (destination) => {
        navigate(destination);
    }

    const createSession = () => {
        //Naplnění obsahu
        let obsah = {
            "majitel": loggedUser._id,
            "jmenoMajitele": loggedUser.name,
            "jmenoSessionu": sessionNameState,
            "heslo": sessionPasswordState
        }

        //Odeslání požadavku
        axios.post(axios.defaults.baseURL + '/sessions/createSession', obsah)
            .then(queryResponse => {
                if (queryResponse.data === null) {
                    /*
                    showAlert.value = true;
                    alertTitle.value = "Chyba v komunikaci"
                    alertText.value = "Komunikace se serverem se nezdařila. Prosím, zkuste akci znovu později"
                    */
                    return
                } else if (queryResponse.data === "Name Taken") {
                    /*
                    showAlert.value = true;
                    alertTitle.value = "Využité jméno"
                    alertText.value = "Toto jméno herní místnosti je již zabrané. Prosím, vyberte jiné jméno"
                    */
                    return
                }

                handleNavigation("/game")
            })
            .catch(error => {
                showAlert.value = true;
                alertTitle.value = "Chyba v komunikaci"
                alertText.value = "Komunikace se serverem se nezdařila. Prosím, zkuste akci znovu později"
            })

    }

    return (
        <dialog id="gameBrowserCreateRoomModal" className="modal">
            <div className="modal-box">
                <AlertDriver className="mb-5" show={false} type="error"></AlertDriver>
                <h3 className="text-lg font-bold mb-7 text-primary">Vytvoření hry</h3>

                <input type="text" placeholder="Email" value={sessionNameState} onChange={(event) => { setSessionNameState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="password" placeholder="Heslo" value={sessionPasswordState} onChange={(event) => { setSessionPasswordState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary" onClick={() => { createSession() }}>Přihlásit</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameBrowserCreateRoomModal