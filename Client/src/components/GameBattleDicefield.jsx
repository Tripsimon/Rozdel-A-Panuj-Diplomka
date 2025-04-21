import React, { useEffect, useState } from 'react'
import Select from 'react-select';

import dice1 from './../assets/images/dice/dice1.jpg'
import dice2 from './../assets/images/dice/dice2.jpg'
import dice3 from './../assets/images/dice/dice3.jpg'
import dice4 from './../assets/images/dice/dice4.jpg'
import dice5 from './../assets/images/dice/dice5.jpg'
import dice6 from './../assets/images/dice/dice6.jpg'

function GameBattleDicefield(props) {
    const [diceState, setDiceState] = useState(null)
    var dice = [dice1, dice2, dice3, dice4, dice5, dice6]

    const [selectedAdventurer, setSelectedAdventurer] = useState(null)
    const [adventurersOptionsState, setAdventurersOptionsState] = useState(null)

    const [selectedMonster, setSelectedMonster] = useState(null)
    const [monsterOptionsState, setMonstersOptionsState] = useState(null)

    const [selectedThrowTypeState, setSelectedThrowTypeState] = useState("Volný hod")
    const throwType = [
        { label: 'Volný hod', value: 'Volný hod' },
        { label: 'Atributy', value: 'Atributy' },
        { label: 'Zásah', value: 'Zásah' },
        { label: 'Průraz', value: 'Průraz' },
        { label: 'Steč', value: 'Steč' },
        { label: 'Uhyb', value: 'Uhyb' },
        { label: 'Blokace', value: 'Blokace' },
        { label: 'Výdrž', value: 'Výdrž' }
    ]

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#001D3D",
            color: "yellow",
            width: "100%"
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "#001D3D",

        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: "#b49306",

        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#b49306' : '#001D3D',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        dropdownindicatorSeparatorIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
    }

    useEffect(() => {
        var loader = []
        if (props.adventurers == null) { return }
        props.adventurers.forEach(element => {
            if (element.adventurer == null) { return }
            loader.push({ label: getAdventurerName(element.adventurer), value: element.adventurer })
        });
        setAdventurersOptionsState(loader)
    }, [props.adventurer])

    useEffect(() => {
        var loader = []
        if (props.activeMonstersState == null) { return }
        props.activeMonstersState.forEach(element => {
            if (element == null) { return }
            loader.push({ label: element.name, value: element })
        });
        console.log(props.activeMonstersState)
        console.log(loader)
        setMonstersOptionsState(loader)
    }, [props.activeMonstersState])

    function getAdventurerName(adventurer) {
        let name = adventurer.krestniJmeno
        if (adventurer.prezdivka != null) {
            name = name + ' "' + adventurer.prezdivka + '" '
        }
        name = name + adventurer.prijmeni
        return name
    }

    const renderAdventurerInfo = () => {
        switch (selectedThrowTypeState) {
            case 'Volný hod':
                break;

            case 'Atributy':
                if (selectedAdventurer == null) { return }
                return (<div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Síla: <br></br>{selectedAdventurer.atributy.sila}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Houževnatost: <br></br>{selectedAdventurer.atributy.houzevnatost}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Obratnost: <br></br>{selectedAdventurer.atributy.obratnost}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Charisma: <br></br>{selectedAdventurer.atributy.charisma}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Inteligence: <br></br>{selectedAdventurer.atributy.inteligence}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Znalost: <br></br>{selectedAdventurer.atributy.znalost}</p>
                        </div>
                    </div>
                </div>)
                break;

            case 'Zásah':
                return (
                    <div className='mx-10 mt-10 border-2 border-primary bg-secondary rounded-xl'>
                        <p className='text-lg font-bold text-center text-primary' >Obratnost: <br></br>{selectedAdventurer.atributy.obratnost}</p>
                    </div>)
                break;

            default:
                break;
        }
    }

    const renderMonsterInfo = () => {
        switch (selectedThrowTypeState) {
            case 'Volný hod':
                break;

            case 'Atributy':
                if (selectedAdventurer == null) { return }
                return (<div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Síla: <br></br>{selectedAdventurer.atributy.sila}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Houževnatost: <br></br>{selectedAdventurer.atributy.houzevnatost}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Obratnost: <br></br>{selectedAdventurer.atributy.obratnost}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Charisma: <br></br>{selectedAdventurer.atributy.charisma}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Inteligence: <br></br>{selectedAdventurer.atributy.inteligence}</p>
                        </div>
                        <div className=' border-primary bg-secondary rounded-xl'>
                            <p className='text-lg font-bold text-center text-primary' >Znalost: <br></br>{selectedAdventurer.atributy.znalost}</p>
                        </div>
                    </div>
                </div>)
                break;

            case 'Zásah':
                console.log(selectedMonster.value)
                return (
                    <div className='mx-10 mt-10 border-2 border-primary bg-secondary rounded-xl'>
                        <p className='text-lg font-bold text-center text-primary' >Obratnost: <br></br>{selectedMonster.agility}</p>
                    </div>)
                break;

            default:
                break;
        }
    }

    const renderDiceResult = () => {
        return (
            <div className=' border-primary bg-secondary rounded-xl'>
                <p className='text-lg font-bold text-center text-primary' >Dobrodruh vyhrává !</p>
            </div>)
    }

    const throwDice = () => {
        var number = Math.floor((Math.random() * 6))
        setDiceState(dice[number])
    }


    return (
        <div>
            <div className=' bg-secondary mb-10 mx-[5%] card'>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='justify-center '>
                        <h3 className='text-2xl text-center text-primary'>Dobrodruh</h3>
                        <div className="divider divider-warning"></div>
                        <Select
                            styles={selectStyles}
                            className='text-primary'
                            defaultValue={selectedAdventurer}
                            onChange={(e) => { setSelectedAdventurer(e.value) }}
                            options={adventurersOptionsState}
                            placeholder={"Vybraný dobrodruh"}
                        />
                        {renderAdventurerInfo()}
                    </div>

                    <div>
                        <h3 className='text-2xl text-center text-primary'>Druh hodu</h3>
                        <div className="divider divider-warning"></div>
                        <Select
                            styles={selectStyles}
                            className='text-primary'
                            defaultValue={selectedThrowTypeState}
                            onChange={(e) => { setSelectedThrowTypeState(e.value) }}
                            options={throwType}
                            placeholder={"Druh hodu"}
                        />
                        {diceState != null ?
                            <div className='flex justify-center'>
                                <img className='w-[200px] h-[250px]' src={diceState}></img>
                    

                            </div> : ""}
                            {renderDiceResult()}

                    </div>
                    <div className='justify-center '>
                        <h3 className='text-2xl text-center text-primary' >Nepřítel</h3>
                        <div className="divider divider-warning"></div>
                        <Select
                            styles={selectStyles}
                            className='text-primary'
                            defaultValue={monsterOptionsState}
                            onChange={(e) => { setSelectedMonster(e.value) }}
                            options={monsterOptionsState}
                            placeholder={"Vybraný nepřítel"}
                        />
                        {renderMonsterInfo()}
                    </div>
                </div>

                <div className='grid grid-cols-3'>
                    <div>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Odebrat život</button>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Přidat život</button>
                    </div>
                    <div>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Tajný hod kostkou</button>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Hodit kostkou</button>
                    </div>
                    <div>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Odebrat život</button>
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop" onClick={() => throwDice()}>Přidat život</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameBattleDicefield