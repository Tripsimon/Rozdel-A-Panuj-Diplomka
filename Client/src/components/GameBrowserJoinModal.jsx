import React, { useState } from 'react'
import AlertDriver from './AlertDriver';
import { useSearchParams } from 'react-router-dom';

function GameBrowserJoinModal(props) {
    const [selectedAdventurerState, setSelectedAdventurerState] = useState("Vyberte dobrodruha")
    const [passwordState, setPasswordState] = useState("")



    const renderAdventurersOptions = () => {
        return props.loadedAdventurersState.map(adventurer => <option key={adventurer._id} value={adventurer._id}>{adventurer.krestniJmeno + " " +adventurer.prijmeni} </option>)
    }
    return (
        <dialog id="gameBrowserJoinModal" className="modal">
            <div className="modal-box">
                <AlertDriver className="mb-5" show={false} type="error"></AlertDriver>
                <h3 className="text-lg font-bold mb-7 text-primary">Přihlášení</h3>

                <select onChange={(event) => setSelectedAdventurerState(event.target.value)} value={selectedAdventurerState} className="select">
                    <option >Vyberte dobrodruha pro hru</option>
                    {renderAdventurersOptions()}
                </select>

                <input type="password" placeholder="Heslo" value={passwordState} onChange={(event) => { setPasswordState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary" onClick={() => { props.joinSession(selectedAdventurerState, passwordState ) }}>Přihlásit</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameBrowserJoinModal