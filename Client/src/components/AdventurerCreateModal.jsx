import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { reduxReturnUser } from '../store/userSlice';
import { useSelector } from 'react-redux';


//Tato část tvorby je složitá, proto je definovaná ve svých komponentách
//TODOO: Ostatní 2 kroky taky
import AdventurerCreateStepTwo from './AdventurerCreateStepTwo';
import AdventurerCreateModalStepOne from './AdventurerCreateModalStepOne';

// Komponenta pro tvorbu nového dobrodruha
function AdventurerCreateModal() {
    //Ziskani uzivatele pro navazani dobrodruha
    const loggedUser = useSelector(reduxReturnUser)

    //Navigace v routeru
    const navigate = useNavigate();
    const handleNavigation = (destination) => {
        navigate(destination);
    }

    // Krok tvorby (navigace)
    const [stepState, setStepState] = useState(1);

    //Vyber rasy. Potreba ze serveru
    const [racesChoiceState, setRacesChoiceState] = useState([]);
    const [selectedRaceState, setSelectedRaceState] = useState(false)

    // Vyber classy. Potreba ze serveru
    const [loadedClasses, setLoadedClasses] = useState([]);
    const [selectedClassState, setSelectedClassState] = useState(false)

    // Vybrana vybaba -> Jsou i classy
    const [selectedMainEquipment, setSelectedMainEquipment] = useState(null);
    const [selectedArmorEquipment, setSelectedArmorEquipment] = useState(null);
    const [selectedBonusEquipment, setSelectedBonusEquipment] = useState(null)

    // Data dobrodruha
    const [adventurerState, setAdventurerState] = useState({
        name: "",
        secondName: "",
        nickname: "",
        race: null,
        class: null,
        mainEquipment: null,
        armorEquipment: null,
        bonusEquipment: null,
        abilities: [],
        aligment: null,
        age: null,
        description: "Nezjištěno",
        story: "Nezjištěno",
    })

    // Staty dobrodruha
    const [atributesState, setAtributesState] = useState({
        free: 8,
        sila: 8,
        houzevnatost: 8,
        obratnost: 8,
        charisma: 8,
        inteligence: 8,
        znalost: 8
    });

    // Pri loadu komponenty potreba nahrat rasy
    useEffect(() => {
        loadRaces();
    }, []);

    /**
     * Ziskani ras ze servery
     */
    const loadRaces = () => {
        axios.get(axios.defaults.baseURL + '/rasy/dump')
            .then(responseQuery => {
                setRacesChoiceState(responseQuery.data);
            })
    }

    /**
     * Ovladani navigace
     * @param {int} amount - o kolik se ma pohnout formular. Zaporna hodnota je navrat
     */
    const changeStep = (amount) => {
        setStepState(stepState + amount)
    }

    /**
     * Vybere rasu pro tvorbu dobrodruha
     * @param {int} index - pozice vybrane rasy v poly dostupnych ras
     */
    const selectRace = (index) => {
        setSelectedRaceState(racesChoiceState[index])
        loadClasses(racesChoiceState[index].dostupneTridy)
        setAdventurerState({ ...adventurerState, race: racesChoiceState[index].jmeno })
    }

    /**
     * Nacteni trid po zvolení rasy
     * @param {*} classes - Id v poly 
     */
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

    /**
     * Vyber classy
     * @param {*} index - id v poly
     */
    const selectClass = (index) => {
        setSelectedClassState(loadedClasses[index])
        setAdventurerState({ ...adventurerState, class: loadedClasses[index].jmeno })
    }

    /**
     * Funkce vlastniho vykresleni formu
     * @returns vrati co se ma vykreslit popropade error
     */
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

    /**
     * Vykreslení prvního kroku
     * @returns - komponenta kroku
     */
    function renderFirstStep() {
        return (
            <AdventurerCreateModalStepOne adventurerState={adventurerState} setAdventurerState={setAdventurerState} racesChoiceState={racesChoiceState} selectedRaceState={selectedRaceState} selectRace={selectRace} loadedClasses={loadedClasses} selectedClassState={selectedClassState} selectClass={selectClass} changeStep={changeStep} ></AdventurerCreateModalStepOne>
        )
    }

    /**
     * Vykreslení druhého kroku
     * @returns - komponenta kroku
     */
    function renderSecondStep() {
        return (
            <AdventurerCreateStepTwo atributesState={atributesState} setAtributesState={setAtributesState} selectedClassState={selectedClassState} selectedMainEquipment={selectedMainEquipment} setSelectedMainEquipment={setSelectedMainEquipment} selectedArmorEquipment={selectedArmorEquipment} setSelectedArmorEquipment={setSelectedArmorEquipment} selectedBonusEquipment={selectedBonusEquipment} setSelectedBonusEquipment={setSelectedBonusEquipment} changeStep={changeStep}></AdventurerCreateStepTwo>
        )
    }

    /**
     * Vykreslení třetího kroku
     * @returns - komponenta kroku
     */
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

    /**
     * Vykreslení posledního kroku
     * @returns - komponenta kroku
     */
    //TODOO - Opravit funkci
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

    /**
     * Odeslani pozadavku
     */
    const submitForm = () => {
        let obsah = ({
            "newAdventurer": adventurerState,
            "owner": loggedUser.userID,
            "atributes": atributesState,
        })

        obsah.newAdventurer.mainEquipment = selectedMainEquipment;
        obsah.newAdventurer.armorEquipment = selectedArmorEquipment;
        obsah.newAdventurer.bonusEquipment = selectedBonusEquipment;
        obsah.newAdventurer.abilities = obsah.newAdventurer.abilities.concat(selectedRaceState.schopnosti)
        obsah.newAdventurer.abilities = obsah.newAdventurer.abilities.concat(selectedClassState.abilities)

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