import React from 'react'

// Komponenta, která zobrazí jednu schopnost. Je jedno jestli schopnost hrdiny nebo nepřítele.
function AbilityCard(props) {
    return (
        <div className="mx-5 card card-border bg-base-100 w-fill">
            <div className="card-body">
                <div className='flex' >
                    <h2 className="text-xl card-title text-primary">{props.ability.name} - {props.ability.abilityTyp}</h2>
                </div>
                <p>{props.ability.descriptionAbility}</p>
                <br></br>
                { props.ability.abilityTyp == "Active" ?<div className='grid grid-cols-2'><p className='uppercase text-primary'>Doba obnovy:</p><p>{props.ability.cd}</p></div>:""}
            </div>
        </div>
    )
}

export default AbilityCard