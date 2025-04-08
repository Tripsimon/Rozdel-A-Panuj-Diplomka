import React from 'react'
import AlertDriver from './AlertDriver';

function GameLogModal(props) {
    return (
        <dialog id="GameLogModal" className="modal">
            <div className="modal-box">
                <AlertDriver className="mb-5" show={false} type="error"></AlertDriver>
                <h3 className="text-lg font-bold mb-7 text-primary">LOG: </h3>
                {console.log(props)}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameLogModal