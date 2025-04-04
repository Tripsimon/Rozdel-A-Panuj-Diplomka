import React from 'react'
import AlertDriver from "./AlertDriver"

function ItemCreateModal() {
    return (
        <dialog id="itemCreateModal" className="modal">
            <div className="modal-box">
                <AlertDriver className="mb-5" show={false} type="error"></AlertDriver>
                <h3 className="text-lg font-bold mb-7 text-primary">Tvorba předmětu</h3>

                <input type="text" placeholder="Email" onChange={(event) => { setEmailState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="password" placeholder="Heslo" onChange={(event) => { setPasswordState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary" onClick={() => { prihlaseni() }}>Vytvořit předmět</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ItemCreateModal