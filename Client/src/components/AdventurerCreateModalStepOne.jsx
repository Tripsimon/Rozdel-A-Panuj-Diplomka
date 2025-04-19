import React, { useState } from 'react'
import axios from 'axios'
import AbilityCard from './AbilityCard'

function AdventurerCreateModalStepOne(props) {

    function renderRaceSelect() {
        return (
            <details className='z-50'>
                <summary className="btn btn-outline text-primary  w-full text-lg bg-secondary  uppercase font-dm font-normal hover:bg-primary active:!bg-primary-200">
                    {props.selectedRaceState != false ? props.selectedRaceState.jmeno : "Vyberte rasu"}
                </summary>
                <ul className="bg-primary mt-5 w-full rounded-none relative !p-0">
                    {props.racesChoiceState.map((race, index) => <li key={race.jmeno}><a key={race.jmeno} onClick={() => props.selectRace(index)} className='text-primary text-lg bg-secondary font-dm font-normal flex text-center !justify-center border-b-2 border-primary select-none active:!bg-primary'>{race.jmeno}</a></li>)}
                </ul>
            </details>
        )
    }

    const renderRaceAbilities = () => {
        return (<div className="w-full mt-10 shadow-sm card card-xl bg-secondary">
            <div className="card-body">
                <h2 className="text-xl uppercase card-title text-primary">Schopnosti rasy</h2>
                <div className="mt-0 divider divider-warning"></div>
                <div className='grid grid-cols-3'>{ props.selectedRaceState.schopnosti.map((ability) => <AbilityCard key={ability._id} ability={ability}></AbilityCard>)}</div>
            </div>
        </div>)
    }



    function renderClassSelect() {
        if (props.selectedRaceState == false) {
            return ""
        } else {
            return (
                < details className='z-50' >
                    <summary className="btn btn-outline mt-4  w-full text-lg text-primary bg-secondary uppercase font-dm font-normal hover:bg-primary active:!bg-primary-200">
                        {props.selectedClassState != false ? props.selectedClassState.jmeno : "Vyberte třídu"}
                    </summary>
                    <ul className="bg-primary w-full rounded-none relative mt-5 !p-0">
                        {props.loadedClasses.map((trida, index) => <li key={trida.jmeno}><a key={trida.jmeno} onClick={() => props.selectClass(index)} className='text-primary text-lg bg-secondary font-dm font-normal flex text-center !justify-center border-b-2 border-primary select-none active:!bg-primary'>{trida.jmeno}</a></li>)}
                    </ul>
                </details >

            )
        }
    }

    const renderClassAbilities = () => {
        return (<div className="w-full mt-10 shadow-sm card card-xl bg-secondary">
            <div className="card-body">
                <h2 className="text-xl uppercase card-title text-primary">Schopnosti rasy</h2>
                <div className="mt-0 divider divider-warning"></div>
                <div className='grid grid-cols-3 '>{ props.selectedClassState.abilities.map((ability) => <AbilityCard key={ability._id} ability={ability}></AbilityCard>)}</div>
            </div>
        </div>)
    }

    function handleNextStep() {
        props.changeStep(1)
    }

    return (
        <div className="modal-box w-[90%] max-w-[90%]">

            <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
            <form method="dialog">
                <button className="absolute text-lg btn btn-sm btn-circle btn-ghost right-2 top-2 text-primary">✕</button>
            </form>

            <ul className="w-full steps steps-vertical lg:steps-horizontal">
                <li className="text-lg step step-warning text-primary ">Základ dobrodruha</li>
                <li className="text-lg step text-primary ">Atributy a předměty</li>
                <li className="text-lg step text-primary ">Příběh</li>
                <li className="text-lg step text-primary ">Shrnutí</li>
            </ul>
            <div className="divider divider-warning"></div>

            <fieldset className="fieldset">
                <legend className="mb-2 text-lg fieldset-legend text-primary">Křestní jméno</legend>
                <input type="text" value={props.adventurerState.name} onChange={(event) => props.setAdventurerState({ ...props.adventurerState, name: event.target.value })} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                <p className="label"></p>
            </fieldset>

            <fieldset className="fieldset">
                <legend className="mb-2 text-lg fieldset-legend text-primary">Přezdívka</legend>
                <input type="text" value={props.adventurerState.nickname} onChange={(event) => props.setAdventurerState({ ...props.adventurerState, nickname: event.target.value })} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                <p className="label"></p>
            </fieldset>

            <fieldset className="fieldset">
                <legend className="mb-2 text-lg fieldset-legend text-primary">Příjmení</legend>
                <input type="text" value={props.adventurerState.secondName} onChange={(event) => props.setAdventurerState({ ...props.adventurerState, secondName: event.target.value })} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                <p className="label"></p>
            </fieldset>

            {renderRaceSelect()}
            { props.selectedRaceState != false ? renderRaceAbilities():""}
            {renderClassSelect()}
            { props.selectedClassState != false ? renderClassAbilities():""}

            <div className="modal-action">
                <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { handleNextStep() }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateModalStepOne