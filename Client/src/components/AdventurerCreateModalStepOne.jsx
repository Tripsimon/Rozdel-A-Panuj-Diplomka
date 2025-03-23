import React, { useState } from 'react'
import axios from 'axios'

function AdventurerCreateModalStepOne(props) {

    function renderRaceSelect() {
        return (
            <details className='z-50'>
                <summary className="btn btn-outline text-primary  w-full text-lg  uppercase font-dm font-normal hover:bg-primary active:!bg-primary-200">
                    {props.selectedRaceState != false ? props.selectedRaceState.jmeno : "Vyberte rasu"}
                </summary>
                <ul className="bg-primary w-full rounded-none relative !p-0">
                    {props.racesChoiceState.map((race, index) => <li key={race.jmeno}><a key={race.jmeno} onClick={() => props.selectRace(index)} className='text-white text-lg  font-dm font-normal flex text-center !justify-center border-b-2 rounded-none active:!bg-primary'>{race.jmeno}</a></li>)}
                </ul>
            </details>
        )
    }

    function renderClassSelect() {
        if (props.selectedRaceState == false) {
            return ""
        } else {
            return (
                < details className='z-50' >
                    <summary className="btn btn-outline mt-4  w-full text-lg text-primary uppercase font-dm font-normal hover:bg-primary active:!bg-primary-200">
                    {props.selectedClassState != false ? props.selectedClassState.jmeno : "Vyberte třídu"}
                    </summary>
                    <ul className="bg-primary w-full rounded-none relative !p-0">
                        {props.loadedClasses.map((trida, index) => <li key={trida.jmeno}><a key={trida.jmeno} onClick={() => props.selectClass(index)} className='text-white text-lg  font-dm font-normal flex text-center !justify-center border-b-2 rounded-none active:!bg-primary'>{trida.jmeno}</a></li>)}
                    </ul>
                </details >

            )
        }
    }

    function handleNextStep() {
        props.changeStep(1)
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

            <input type="text" placeholder="Křestní jméno" className="w-full mb-5 text-white input border-primary input-bordered " />
            <input type="text" placeholder="Přezdívka" className="w-full mb-5 text-white border-primary input input-bordered " />
            <input type="text" placeholder="Příjmení" className="w-full mb-5 text-white border-primary input input-bordered " />

            {renderRaceSelect()}
            {renderClassSelect()}

            <div className="modal-action">
                <button className="btn text-primary" onClick={() => { handleNextStep() }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateModalStepOne