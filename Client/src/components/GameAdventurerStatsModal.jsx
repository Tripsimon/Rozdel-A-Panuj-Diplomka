import React from 'react'

function GameAdventurerStatsModal(props) {

    function getAdventurerName(adventurer) {
        if (props.openedStatsAdventurer == null) { return }
        let name = adventurer.krestniJmeno
        if (adventurer.prezdivka != null) {
            name = name + ' "' + adventurer.prezdivka + '" '
        }
        name = name + adventurer.prijmeni
        return name
    }

    const renderStats = () => {
        if (props.openedStatsAdventurer == null) { return }
        return (<div>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Síla: <br></br>{props.openedStatsAdventurer.atributy.sila}</p>
                </div>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Houževnatost: <br></br>{props.openedStatsAdventurer.atributy.houzevnatost}</p>
                </div>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Obratnost: <br></br>{props.openedStatsAdventurer.atributy.obratnost}</p>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Charisma: <br></br>{props.openedStatsAdventurer.atributy.charisma}</p>
                </div>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Inteligence: <br></br>{props.openedStatsAdventurer.atributy.inteligence}</p>
                </div>
                <div className=' border-primary bg-secondary rounded-xl'>
                    <p className='text-lg font-bold text-center text-primary' >Znalost: <br></br>{props.openedStatsAdventurer.atributy.znalost}</p>
                </div>
            </div>
        </div>)
    }

    return (
        <dialog id="gameAdventurerStatsModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-primary">{getAdventurerName(props.openedStatsAdventurer) + "- Vlastnosti"}</h3>
                <div className="mb-10 divider divider-warning"></div>

                {renderStats()}

                <div className="modal-action">
                    <form method="dialog">
                        <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameAdventurerStatsModal