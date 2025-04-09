import React from 'react'


function GameActiveEnemiesDisplay(props) {

    const selectMonster = () => {

    }

    const renderActiveMonsters = () =>{
        return props.activeMonstersState.map((monster) =><div className='bg-red-400' onClick={() => selectMonster()} key={monster.uid} >{monster.name}</div>
            
        )
    }
    
    return (
        <div className="w-fill mx-[5%] card bg-secondary">
          <div className=" card-body">
            <h2 className="card-title text-primary">Aktivní nepřátelé:</h2>
            <div className="divider divider-primary"></div>
            <div className='grid grid-cols-4 gap-5'>
                {renderActiveMonsters()}
            </div>
  

          </div>
        </div>
      )
}

export default GameActiveEnemiesDisplay