import React, { useState } from 'react'
import Select from 'react-select';
import AlertDriver from './AlertDriver'

function AdventurerCreateStepTwo(props) {

    //Upozorneni
    const [alertState, setAlertState] = useState({
        showAlert: false,
        alertTyp: "",
        alertText: ""
    })

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

    var mainEquipmentOptions = []
    var mainArmorOptions = []
    var mainBonusOptions = []

    if (props.selectedClassState != null) {
        props.selectedClassState.mainEquipment.map((item) => { mainEquipmentOptions.push({ value: item, label: item.name }) })
        props.selectedClassState.armorEquipment.map((item) => { mainArmorOptions.push({ value: item, label: item.name }) })
        props.selectedClassState.bonusEquipment.map((item) => { mainBonusOptions.push({ value: item, label: item.name }) })
        //mainEquipmentOptions
    }

    const options = [
        { value: 'prehod', label: 'Přehod kostky' },
        { value: 'omraceni', label: 'Omračení' },
    ];


    function handleNextStep() {

        if (props.selectedMainEquipment == null || props.selectedArmorEquipment == null || props.selectedBonusEquipment == null) {
            setAlertState({
                showAlert: true,
                alertTyp: "error",
                alertText: "Všechna pole musí být vyplněna"
            })
            return
        }
        props.changeStep(1)

    }


    return (
        <div className="modal-box w-[90%] h-[90vh] max-w-[90%]">

            <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
            <form method="dialog">
                <button className="absolute text-lg btn btn-sm btn-circle btn-ghost right-2 top-2 text-primary">✕</button>
            </form>


            <ul className="w-full steps steps-vertical lg:steps-horizontal">
                <li className="text-lg step step-warning text-primary ">Základ dobrodruha</li>
                <li className="text-lg step step-warning text-primary ">Atributy a předměty</li>
                <li className="text-lg step text-primary ">Příběh</li>
                <li className="text-lg step text-primary ">Shrnutí</li>
            </ul>
            <div className="divider divider-warning"></div>

            {alertState.showAlert ? <AlertDriver alertState={alertState}></AlertDriver> : ""}
            <div className='flex justify-center w-full'>
                <h3 className='px-5 text-xl font-bold uppercase border-2 text-primary border-primary bg-secondary rounded-xl'>Dostupné atributy: {props.atributesState.free}</h3>
            </div>


            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.sila > 0) ? props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='font-bold text-center text-primary' >Síla: {props.atributesState.sila}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>

                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.houzevnatost > 0) ? props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='font-bold text-center text-primary' >Houževnatost: {props.atributesState.houzevnatost}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.obratnost > 0) ? props.setAtributesState({ ...props.atributesState, obratnost: props.atributesState.obratnost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='text-lg font-bold text-center text-primary' >Obratnost: {props.atributesState.obratnost}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, obratnost: props.atributesState.obratnost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>


                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.charisma > 0) ? props.setAtributesState({ ...props.atributesState, charisma: props.atributesState.charisma - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='text-lg font-bold text-center text-primary' >Charisma: {props.atributesState.charisma}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, charisma: props.atributesState.charisma + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.inteligence > 0) ? props.setAtributesState({ ...props.atributesState, inteligence: props.atributesState.inteligence - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='text-lg font-bold text-center text-primary' >Inteligence: {props.atributesState.inteligence}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, inteligence: props.atributesState.inteligence + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>

                <div className='grid items-center justify-center grid-cols-3 border-2 border-primary bg-secondary rounded-xl '>
                    <button className='pr-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.znalost > 0) ? props.setAtributesState({ ...props.atributesState, znalost: props.atributesState.znalost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='text-lg font-bold text-center text-primary' >Znalost: {props.atributesState.znalost}</p>
                    <button className='pl-5 text-lg font-bold select-none text-primary' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, znalost: props.atributesState.znalost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
            </div>



            <div className='grid grid-cols-3 gap-5 mt-5'>

                <Select
                    styles={selectStyles}
                    className='text-primary'
                    defaultValue={props.selectedMainEquipment}
                    onChange={(e) => { props.setSelectedMainEquipment(e.value) }}
                    options={mainEquipmentOptions}
                />

                <Select
                    styles={selectStyles}
                    className='text-primary'
                    defaultValue={props.selectedArmorEquipment}
                    onChange={(e) => { props.setSelectedArmorEquipment(e.value) }}
                    options={mainArmorOptions}
                />

                <Select
                    styles={selectStyles}
                    className='text-primary'
                    defaultValue={props.selectedBonusEquipment}
                    onChange={(e) => { props.setSelectedBonusEquipment(e.value) }}
                    options={mainBonusOptions}
                />

            </div>





            <div className="modal-action">
                <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { props.changeStep(-1) }}>Předešlý krok</button>
                <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { handleNextStep(+1) }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateStepTwo