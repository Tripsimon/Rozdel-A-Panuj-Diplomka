import React, { useState } from 'react'
import AlertDriver from './AlertDriver';
import { useSearchParams } from 'react-router-dom';

function GameBrowserJoinModal(props) {
    const [selectedAdventurerState, setSelectedAdventurerState] = useState("Vyberte dobrodruha")
    const [passwordState, setPasswordState] = useState("")

    //Upozorneni
    const [alertState, setAlertState] = useState({
        showAlert: false,
        alertTyp: "",
        alertText: ""
    })

    const renderAdventurersOptions = () => {
        return props.loadedAdventurersState.map(adventurer => <option key={adventurer._id} value={adventurer._id}>{adventurer.krestniJmeno + " " +adventurer.prijmeni} </option>)
    }

    const submitJoin = () =>{

        if(selectedAdventurerState == "Vyberte dobrodruha" || passwordState == ""){
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Všechna pole musí být vyplněna"
            })
                return
        }else{
            props.joinSession(selectedAdventurerState, passwordState )
        }


    }

    return (
        <dialog id="gameBrowserJoinModal" className="modal">
            <div className="modal-box">
            {alertState.showAlert ? <AlertDriver alertState={alertState}></AlertDriver> : ""}
                <h3 className="text-lg font-bold mb-7 text-primary">Přihlášení</h3>
                <div className="divider divider-warning"></div>

                <select onChange={(event) => setSelectedAdventurerState(event.target.value)} value={selectedAdventurerState} className="w-full input input-bordered input-warning text-primary bg-secondary" >
                    <option >Vyberte dobrodruha pro hru</option>
                    {renderAdventurersOptions()}
                </select>

                <input type="password" placeholder="Heslo" value={passwordState} onChange={(event) => { setPasswordState(event.target.value); }} className="w-full mt-5 input input-bordered input-warning text-primary bg-secondary" />
                <div className="modal-action">
                        <button className="mx-5 btn text-primary" onClick={() => { submitJoin() }}>Přihlásit</button>
                        <button className="btn text-primary" onClick={() =>document.getElementById('gameBrowserJoinModal').close()}>Zavřít</button>
                </div>
            </div>
        </dialog>
    )
}

export default GameBrowserJoinModal