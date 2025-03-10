import React, { useEffect, useState } from 'react'
import axios from 'axios'

import AdventurerCreateStepTwo from './AdventurerCreateStepTwo';
import AdventurerCreateModalStepOne from './AdventurerCreateModalStepOne';

function AdventurerCreateModal() {


    const [stepState, setStepState] = useState(1);

    const [racesChoiceState, setRacesChoiceState] = useState([]);
    const [selectedRaceState, setSelectedRaceState] = useState([])

    const [loadedClasses, setLoadedClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState([])

    const [adventurerState, setNewAdventurerState] = useState({
        name: null,
        secondName: null,
        nickname: null,
        race: null,
        class: null,
        mainGear: null,
        secondaryGear: null,
        bonusGear: null,
        aligment: null,
        age: null,
        description: "Nezjištěno",
        story: "Nezjištěno",
      })

    const [atributesState, setAtributesState] = useState({
        free: 8,
        sila: 8,
        houzevnatost: 8,
        obratnostAtributes: 8,
        charismaAtributes: 8,
        inteligenceAtributes: 8,
        znalostAtributes: 8
    });

    useEffect(() => {
        loadRaces();
    }, []);

    const changeStep = (amount) => {

        setStepState(stepState + amount)
    }


    const loadRaces = () => {
        axios.get(axios.defaults.baseURL + '/rasy/dump')
            .then(responseQuery => {
                setRacesChoiceState(responseQuery.data);
            })
    }

    const selectRace = (index) => {
        setSelectedRaceState(racesChoiceState[index])
        loadClasses(racesChoiceState[index].dostupneTridy)
    }



    const loadClasses = (classes) => {
        axios.get(axios.defaults.baseURL + '/tridy/getMultipleByID', {
            params: {
                classes: classes
            }
        })
            .then(responseQuery => {
                setLoadedClasses(responseQuery.data)
            })
    }

    const selectClass = (event) => {
        setSelectedRaceState(loadedClasses[event.target.value])
    }



    function renderForm() {

        switch (stepState) {
            case 1:
                return renderFirstStep();

            case 2:
                return renderSecondStep();

            case 3:
                return renderThirdStep();

            case 4:
                return renderFourthStep();

            default:
                return "Vyskytla se chyba"
        }
    }




    function renderFirstStep() {
        return (
            <AdventurerCreateModalStepOne racesChoice={racesChoiceState} selectRace={selectRace} loadedClasses={loadedClasses} selectClass={selectClass} changeStep={changeStep} ></AdventurerCreateModalStepOne>
        )
    }

    function renderSecondStep() {
        return (
            <AdventurerCreateStepTwo atributesState={atributesState} setAtributesState={setAtributesState} changeStep={changeStep}></AdventurerCreateStepTwo>
        )
    }

    function renderThirdStep() {
        return (
            <div className="modal-box">

                <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
                <form method="dialog">
                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                </form>

                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">Základ dobrodruha</li>
                    <li className="step step-primary ">Atributy</li>
                    <li className="step step-primary">Příběh</li>
                    <li className="step">Shrnutí</li>
                </ul>

                <input type="text" placeholder="Křestní jméno" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Přezdívka" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Příjmení" className="w-full mb-5 input input-bordered " />

                <select className="w-full max-w-xs select select-bordered">
                    <option disabled selected> Rasa ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <select className="w-full max-w-xs select select-bordered">
                    <option disabled selected> Třída ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <div className="modal-action">
                    <button className="mx-5 btn text-primary" onClick={() => { changeStep(-1) }}>Předešlí krok</button>
                    <button className="btn text-primary" onClick={() => { changeStep(+1) }}>Další krok</button>
                </div>
            </div>
        )
    }

    function renderFourthStep() {
        return (
            <div className="modal-box">

                <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
                <form method="dialog">
                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                </form>

                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">Základ dobrodruha</li>
                    <li className="step step-primary">Atributy</li>
                    <li className="step step-primary">Příběh</li>
                    <li className="step step-primary">Shrnutí</li>
                </ul>

                <input type="text" placeholder="Křestní jméno" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Přezdívka" className="w-full mb-5 input input-bordered " />
                <input type="text" placeholder="Příjmení" className="w-full mb-5 input input-bordered " />

                <select className="w-full max-w-xs select select-bordered">
                    <option disabled selected> Rasa ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <select className="w-full max-w-xs select select-bordered">
                    <option disabled selected> Třída ?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <div className="modal-action">
                    <button className="mx-5 btn text-primary" onClick={() => { changeStep(-1) }}>Předešlí krok</button>
                    <button onClick={() => submitForm()} className="btn text-primary" >Vytvořit</button>
                </div>
            </div>
        )
    }


    const submitForm = () => {
        let obsah = ({
            "newAdventurer": adventurerState,
            "owner": 10,
            "atributes": atributesState,
        })

        axios.post(axios.defaults.baseURL + '/character/characterCreation', obsah)
            .then(router.push({ path: '/' }))
    }

    return (
        <dialog id="createAdventurerModal" className="modal">
            {renderForm()}
        </dialog>
    )
}

export default AdventurerCreateModal