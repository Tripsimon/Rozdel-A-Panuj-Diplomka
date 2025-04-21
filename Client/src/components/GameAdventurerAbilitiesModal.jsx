import React from 'react'
import AbilityCard from './AbilityCard'

function GameAdventurerAbilitiesModal(props) {

    function getAdventurerName(adventurer) {
        if (props.openedAbilitiesAdventurer == null) { return }
        let name = adventurer.krestniJmeno
        if (adventurer.prezdivka != null) {
            name = name + ' "' + adventurer.prezdivka + '" '
        }
        name = name + adventurer.prijmeni
        return name
    }

    const renderAbilities = () => {
        if(props.openedAbilitiesAdventurer == null){return}
        return (<div className='grid grid-cols-1 m-10'>{props.openedAbilitiesAdventurer.abilities.map((ability) => <AbilityCard key={ability._id} ability={ability}></AbilityCard>)}</div>)
    }

    return (
        <dialog id="gameAdventurerAbilitiesModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary">{getAdventurerName(props.openedAbilitiesAdventurer) + "- Schopnosti"}</h3>
                <div className="mb-10 divider divider-warning"></div>

                {renderAbilities()}

                <div className="modal-action">
                    <form method="dialog">
                        <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameAdventurerAbilitiesModal