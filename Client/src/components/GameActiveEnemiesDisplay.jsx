import React from 'react'


function GameActiveEnemiesDisplay(props) {
  
    const renderActiveMonsters = () =>{
        return props.activeMonstersState.map((monster) =><div className='text-center border-2 border-red-700 rounded-lg text-primary bg-secondary' onClick={() => selectMonster()} key={monster.uid}>
          <p>{monster.name}</p>
          <p>{monster.activeLife + " / " + monster.life}</p>
          </div>
            
        )
    }
    
    return (
        <div className="w-fill mt-10 mx-[5%] card bg-secondary">
          <div className=" card-body">
            <h2 className="text-2xl card-title text-primary">Aktivní nepřátelé:</h2>
            <div className="divider divider-warning"></div>
            <div className='grid grid-cols-4 gap-5'>
                {renderActiveMonsters()}
            </div>
  

          </div>
        </div>
      )
}

export default GameActiveEnemiesDisplay