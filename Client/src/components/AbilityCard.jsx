import React from 'react'

function AbilityCard(props) {
    return (
        <div className="card card-border bg-base-100 w-96">
            <div className="card-body">
                <div className='flex' >
                    <h2 className="text-xl card-title text-primary">{props.ability.name} - {props.ability.abilityTyp}</h2>
                </div>
                <p>{props.ability.descriptionAbility}</p>
                <br></br>
                { props.ability.abilityTyp == "Active" ?<div className='grid grid-cols-2'><p className='uppercase text-primary'>Doba obnovy:    {props.ability.cd}</p></div>:""}
            </div>
        </div>
    )
}

export default AbilityCard