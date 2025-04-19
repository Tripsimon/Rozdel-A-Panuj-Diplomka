import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import AdventurerCreateStepTwo from './AdventurerCreateStepTwo';
import AdventurerCreateModalStepOne from './AdventurerCreateModalStepOne';

import { reduxReturnUser } from '../store/userSlice';
import { useSelector } from 'react-redux';

function AdventurerCreateModal() {
    const navigate = useNavigate();

    const handleNavigation = (destination) => {
        navigate(destination);
    }
    const loggedUser = useSelector(reduxReturnUser)

    const [stepState, setStepState] = useState(1);

    const [racesChoiceState, setRacesChoiceState] = useState([]);
    const [selectedRaceState, setSelectedRaceState] = useState(false)

    const [loadedClasses, setLoadedClasses] = useState([]);
    const [selectedClassState, setSelectedClassState] = useState(false)

    const [selectedMainEquipment, setSelectedMainEquipment] = useState(null);
    const [selectedArmorEquipment, setSelectedArmorEquipment] = useState(null);
    const [selectedBonusEquipment, setSelectedBonusEquipment] = useState(null)

    const [adventurerState, setAdventurerState] = useState({
        name: "",
        secondName: "",
        nickname: "",
        race: null,
        class: null,
        mainEquipment: null,
        armorEquipment: null,
        bonusEquipment: null,
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
            <AdventurerCreateStepTwo atributesState={atributesState} setAtributesState={setAtributesState} selectedClassState={selectedClassState} selectedMainEquipment={selectedMainEquipment} setSelectedMainEquipment={setSelectedMainEquipment} selectedArmorEquipment={selectedArmorEquipment} setSelectedArmorEquipment={setSelectedArmorEquipment} selectedBonusEquipment={selectedBonusEquipment} setSelectedBonusEquipment={setSelectedBonusEquipment} changeStep={changeStep}></AdventurerCreateStepTwo>
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

                <div className='grid grid-cols-2 gap-5'>
                    <fieldset className="fieldset">
                        <legend className="mb-2 text-lg fieldset-legend text-primary">Popis dobrodruha</legend>
                        <textarea value={adventurerState.description} onChange={(event) => setAdventurerState({ ...adventurerState, description: event.target.value })} className="w-full h-32 textarea text-primary textarea-warning bg-secondary" placeholder="Popis"></textarea>
                        <p className="label"></p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="mb-2 text-lg fieldset-legend text-primary">Příběh</legend>
                        <textarea value={adventurerState.story} onChange={(event) => setAdventurerState({ ...adventurerState, story: event.target.value })} className="w-full h-32 text-primary textarea textarea-warning bg-secondary" placeholder="Příběh"></textarea>
                        <p className="label"></p>
                    </fieldset>

                </div>
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

        obsah.newAdventurer.mainEquipment = selectedMainEquipment;
        obsah.newAdventurer.armorEquipment = selectedArmorEquipment;
        obsah.newAdventurer.bonusEquipment = selectedBonusEquipment;

        axios.post(axios.defaults.baseURL + '/character/characterCreation', obsah)
            .then(() => {
                navigate(0)
                document.getElementById('createAdventurerModal').close()
            })
    }

    return (
        <dialog id="createAdventurerModal" className="modal">
            {renderForm()}
        </dialog>
    )
}

export default AdventurerCreateModal