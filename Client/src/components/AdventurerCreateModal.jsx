import React from 'react'

function AdventurerCreateModal() {
    return (
        <dialog id="createAdventurerModal" className="modal">
            <div className="modal-box">
                <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>

                <input type="text" placeholder="Křestní jméno" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Přezdívka" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Příjmení" className="w-full mb-5 input input-bordered " />

                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected> Rasa ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected> Třída ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary">Registrovat</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AdventurerCreateModal