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
        setAdventurerState({...adventurerState, race: racesChoiceState[index].jmeno})
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
        setAdventurerState({...adventurerState, class: loadedClasses[index].jmeno})
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
                <div className="divider divider-primary"></div>

                <textarea value={adventurerState.description} onChange={(event) => setAdventurerState({...adventurerState, description: event.target.value})} className="textarea" placeholder="Popis"></textarea>
                <textarea value={adventurerState.story} onChange={(event) => setAdventurerState({...adventurerState, story: event.target.value})} className="textarea" placeholder="Příběh"></textarea>

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
                    <li className="step step-primary ">Atributy</li>
                    <li className="step step-primary">Příběh</li>
                    <li className="step">Shrnutí</li>
                </ul>
                <div className="divider divider-primary"></div>
               <h3>SOUHRN</h3>

                <div className="modal-action">
                    <button className="mx-5 btn text-primary" onClick={() => { changeStep(-1) }}>Předešlí krok</button>
                    <button onClick={() => submitForm()} className="btn text-primary" >Vytvořit</button>
                </div>
            </div>
        )
    }


    const submitForm = () => {
        console.log(adventurerState)
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