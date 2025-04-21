import React from 'react'

function GameAdventurersDisplay(props) {

  console.log(props)

  const renderAdventurerCards = () => {
    if (props.player1State.adventurer != null) {
      return renderAdventurerCard(props.player1State.adventurer)
    }

    if (props.player2State.adventurer != null) {
      return render2AdventurerCard()
    }

    if (props.player3State.adventurer != null) {
      return render3AdventurerCard()
    }

  }

  function getAdventurerName(adventurer) {
    let name = adventurer.krestniJmeno
    if (adventurer.prezdivka != null) {
      name = name + ' "' + adventurer.prezdivka + '" '
    }
    name = name + adventurer.prijmeni
    return name
  }

  const renderAdventurerCard = (adventurer) => {
    return (
      <div className="card card-dash bg-secondary w-96">
        <div className="card-body">
          <h2 className="card-title text-primary">{getAdventurerName(adventurer)}</h2>
          <div className="divider divider-warning"></div>
          <div className='grid grid-cols-2 gap-5'>
            <h3>Životy: {adventurer.zivoty} / {adventurer.atributy.houzevnatost*10}</h3>
            <h3>Peníze: {adventurer.penize}</h3>
          </div>

          <div className='grid grid-cols-2 gap-5'>
          <p>Level: {adventurer.level}</p>
          <p>Zkušenosti: {adventurer.zkusenosti}</p>
          </div>
          <div className="divider divider-warning"></div>

          <div className="grid grid-cols-3 gap-2">
            <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => {document.getElementById('gameAdventurerInventoryModal').showModal(); props.setOpenedInventoryAdventurer(props.player1State.adventurer)}}>Inventář</button>
            <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => {document.getElementById('gameAdventurerAbilitiesModal').showModal(); props.setOpenedAbilitiesAdventurer(props.player1State.adventurer)}}>Schopnosti</button>
            <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => {document.getElementById('gameAdventurerStatsModal').showModal(); props.setOpenedStatsAdventurer(props.player1State.adventurer)}}>Vlastnosti</button>
          </div>
        </div>
      </div>
    )
  }

  const render2AdventurerCard = () => {
    return (
      <div className="card card-dash bg-secondary w-96">
        <div className="card-body">
          <h2 className="card-title ">{props.player2State.adventurer.krestniJmeno}</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Inventář</button>
            <button className="btn btn-primary">Schopnosti</button>
            <button className="btn btn-primary">Statistiky</button>
          </div>
        </div>
      </div>
    )
  }


  const render3AdventurerCard = () => {
    return (
      <div className="card card-dash bg-secondary w-96">
        <div className="card-body">
          <h2 className="card-title ">{props.player3State.adventurer.krestniJmeno}</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Inventář</button>
            <button className="btn btn-primary">Schopnosti</button>
            <button className="btn btn-primary">Statistiky</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='flex flex-row justify-around'>

      {renderAdventurerCards()}


    </div>
  )
}

export default GameAdventurersDisplay