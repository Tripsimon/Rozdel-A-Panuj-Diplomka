import React, { useState } from 'react'

function AdventurerCreateStepTwo(props) {



    return (
        <div className="modal-box">

            <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
            <form method="dialog">
                <button className="absolute text-lg btn btn-sm btn-circle btn-ghost right-2 top-2 text-primary">✕</button>
            </form>


            <ul className="steps steps-vertical lg:steps-horizontal">
                <li className="text-lg step step-warning text-primary ">Základ dobrodruha</li>
                <li className="text-lg step step-warning text-primary ">Atributy</li>
                <li className="text-lg step text-primary ">Příběh</li>
                <li className="text-lg step text-primary ">Shrnutí</li>
            </ul>
            <div className="divider divider-warning"></div>


            <div className='flex justify-center w-full'>
                <h3 className='text-xl font-bold text-primary'>Dostupné atributy: {props.atributesState.free}</h3>
            </div>


            <div className='grid grid-cols-2 mt-5'>
                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.sila > 0) ? props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Síla: {props.atributesState.sila}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>

                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.houzevnatost > 0) ? props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Houževnatost: {props.atributesState.houzevnatost}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-5'>
                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.obratnost > 0) ? props.setAtributesState({ ...props.atributesState, obratnost: props.atributesState.obratnost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Obratnost: {props.atributesState.obratnost}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, obratnost: props.atributesState.obratnost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>

                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.charisma > 0) ? props.setAtributesState({ ...props.atributesState, charisma: props.atributesState.charisma - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Charisma: {props.atributesState.charisma}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, charisma: props.atributesState.charisma + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-5'>
                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.inteligence > 0) ? props.setAtributesState({ ...props.atributesState, inteligence: props.atributesState.inteligence - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Inteligence: {props.atributesState.inteligence}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, inteligence: props.atributesState.inteligence + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>

                <div className='flex items-center justify-center border-2 border-primary rounded-xl '>
                    <button className='text-primary select-none font-bold text-lg pr-[15%]' onClick={() => { (props.atributesState.znalost > 0) ? props.setAtributesState({ ...props.atributesState, znalost: props.atributesState.znalost - 1, free: props.atributesState.free + 1 }) : "" }}>-</button>
                    <p className='justify-center text-lg font-bold text-primary' >Znalost: {props.atributesState.znalost}</p>
                    <button className='text-primary select-none font-bold text-lg pl-[15%]' onClick={() => { (props.atributesState.free > 0) ? props.setAtributesState({ ...props.atributesState, znalost: props.atributesState.znalost + 1, free: props.atributesState.free - 1 }) : "" }}>+</button>
                </div>
            </div>





            <div className="modal-action">
                <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { props.changeStep(-1) }}>Předešlý krok</button>
                <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { props.changeStep(+1) }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateStepTwo