import React, { useState } from 'react'

function AdventurerCreateStepTwo(props) {



    return (
        <div className="modal-box">

            <h3 className="mb-10 text-lg font-bold text-primary">Tvorba dobrodruha</h3>
            <form method="dialog">
                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
            </form>


            <ul className="steps steps-vertical lg:steps-horizontal">
                <li className="step step-primary">Základ dobrodruha</li>
                <li className="step step-primary">Atributy</li>
                <li className="step">Příběh</li>
                <li className="step">Shrnutí</li>
            </ul>


            <div className='grid grid-cols-2'>
                <div className='grid grid-cols-3'>
                    <button onClick={() => { props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila-1, free: props.atributesState.free+1})}}>-</button>
                    <p>Síla: {props.atributesState.sila}</p>
                    <button onClick={() => { props.setAtributesState({ ...props.atributesState, sila: props.atributesState.sila+1, free: props.atributesState.free-1})}}>+</button>
                </div>

                <div className='grid grid-cols-3'>
                    <button onClick={() => { props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost-1, free: props.atributesState.free+1})}}>-</button>
                    <p>Houževnatost: {props.atributesState.houzevnatost}</p>
                    <button onClick={() => { props.setAtributesState({ ...props.atributesState, houzevnatost: props.atributesState.houzevnatost+1, free: props.atributesState.free-1})}}>+</button>
                </div>
            </div>



            <div className="modal-action">
                <button className="mx-5 btn text-primary" onClick={() => { props.changeStep(-1) }}>Předešlí krok</button>
                <button className="btn text-primary" onClick={() => { props.changeStep(+1) }}>Další krok</button>
            </div>
        </div>
    )
}

export default AdventurerCreateStepTwo