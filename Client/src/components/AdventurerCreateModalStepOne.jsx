import React, { useState } from 'react'

function AdventurerCreateModalStepOne(props) {

    function renderRaceSelect() {
        return(
                <select className="w-full max-w-xs select select-bordered">
                    {props.racesChoice.map((race) => <option> {race.jmeno}</option>)}
                </select>
        )
    }

    return (
        <div className="modal-box">

            <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
            <form method="dialog">
                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
            </form>

            <ul className="steps steps-vertical lg:steps-horizontal">
                <li className="step step-primary">Základ dobrodruha</li>
                <li className="step">Atributy</li>
                <li className="step">Příběh</li>
                <li className="step">Shrnutí</li>
            </ul>

            <input type="text" placeholder="Křestní jméno" className="w-full mb-5 input input-bordered " />
            <input type="text" placeholder="Přezdívka" className="w-full mb-5 input input-bordered " />
            <input type="text" placeholder="Příjmení" className="w-full mb-5 input input-bordered " />

            {renderRaceSelect()}

            <select className="w-full max-w-xs select select-bordered">
                <option disabled selected> Třída ?</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>

            <div className="modal-action">
                <button className="btn text-primary" onClick={() => { changeStep(+1) }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateModalStepOne