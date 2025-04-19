import React, { useEffect, useState } from 'react'
import axios from 'axios'

import AdventurerCreateStepTwo from './AdventurerCreateStepTwo';
import AdventurerCreateModalStepOne from './AdventurerCreateModalStepOne';

import { reduxReturnUser } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';

function AdventurerCreateModal() {
    const loggedUser = useSelector(reduxReturnUser)

    const [stepState, setStepState] = useState(1);

    const [racesChoiceState, setRacesChoiceState] = useState([]);
    const [selectedRaceState, setSelectedRaceState] = useState(false)

    const [loadedClasses, setLoadedClasses] = useState([]);
    const [selectedClassState, setSelectedClassState] = useState(false)

    const [adventurerState, setAdventurerState] = useState({
        name: "",
        secondName: "",
        nickname: "",
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
        obratnost: 8,
        charisma: 8,
        inteligence: 8,
        znalost: 8
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
        setAdventurerState({ ...adventurerState, race: racesChoiceState[index].jmeno })
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

    const selectClass = (index) => {
        setSelectedClassState(loadedClasses[index])
        setAdventurerState({ ...adventurerState, class: loadedClasses[index].jmeno })
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
            <AdventurerCreateModalStepOne adventurerState={adventurerState} setAdventurerState={setAdventurerState} racesChoiceState={racesChoiceState} selectedRaceState={selectedRaceState} selectRace={selectRace} loadedClasses={loadedClasses} selectedClassState={selectedClassState} selectClass={selectClass} changeStep={changeStep} ></AdventurerCreateModalStepOne>
        )
    }

    function renderSecondStep() {
        return (
            <AdventurerCreateStepTwo atributesState={atributesState} setAtributesState={setAtributesState} changeStep={changeStep}></AdventurerCreateStepTwo>
        )
    }

    function renderThirdStep() {
        return (
            <div className="w-[90%] max-w-[90%] modal-box">

                <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
                <form method="dialog">
                    <button className="absolute text-lg btn btn-sm btn-circle btn-ghost right-2 top-2 text-primary">✕</button>
                </form>

                <ul className="w-full steps steps-vertical lg:steps-horizontal">
                    <li className="text-lg step step-warning text-primary ">Základ dobrodruha</li>
                    <li className="text-lg step step-warning text-primary ">Atributy a předměty</li>
                    <li className="text-lg step step-warning text-primary ">Příběh</li>
                    <li className="text-lg step text-primary ">Shrnutí</li>
                </ul>
                <div className="divider divider-warning"></div>

                <textarea value={adventurerState.description} onChange={(event) => setAdventurerState({ ...adventurerState, description: event.target.value })} className="textarea" placeholder="Popis"></textarea>
                <textarea value={adventurerState.story} onChange={(event) => setAdventurerState({ ...adventurerState, story: event.target.value })} className="textarea" placeholder="Příběh"></textarea>

                <div className="modal-action">
                    <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { changeStep(-1) }}>Předešlý krok</button>
                    <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { changeStep(+1) }}>Další krok</button>
                </div>
            </div>
        )
    }

    function renderFourthStep() {
        return (
            <div className="modal-box w-[90%] max-w-[90%]">

                <h3 className="w-full mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
                <form method="dialog">
                    <button className="absolute text-lg btn btn-sm btn-circle btn-ghost right-2 top-2 text-primary">✕</button>
                </form>

                <ul className="w-full steps steps-vertical lg:steps-horizontal">
                    <li className="text-lg step step-warning text-primary ">Základ dobrodruha</li>
                    <li className="text-lg step step-warning text-primary ">Atributy a předměty</li>
                    <li className="text-lg step step-warning text-primary ">Příběh</li>
                    <li className="text-lg step step-warning text-primary ">Shrnutí</li>
                </ul>
                <div className="divider divider-warning"></div>
                <h3>SOUHRN</h3>

                <div className="modal-action">
                    <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { changeStep(-1) }}>Předešlý krok</button>
                    <button onClick={() => submitForm()} className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" >Vytvořit</button>
                </div>
            </div>
        )
    }


    const submitForm = () => {
        let obsah = ({
            "newAdventurer": adventurerState,
            "owner": loggedUser.userID,
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