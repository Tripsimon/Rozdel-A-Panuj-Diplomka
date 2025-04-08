import axios from 'axios'
import React, { useState } from 'react'


function GameHudSlovotepecMonsterModal(props) {

    const [selectedMonsterTypeState, setSelectedMonsterTypeState] = useState("Vyberte typ monstra")
    const [selectedMonsterState, setSelectedMonsterState] = useState("Vyber monstrum")
    const [loadedMonstersState, setLoadedMonstersState] = useState([])

    const loadEnemies = () => {
        axios.get(axios.defaults.baseURL + '/monster/byType', { params: { typ: selectedMonsterTypeState } })
            .then(queryResponse => {
                setLoadedMonstersState(queryResponse.data)
            })
    }

    const addEnemyAsActive = () =>{
        var enemyToAdd = loadedMonstersState[selectedMonsterState]
        enemyToAdd.activeLife = enemyToAdd.life

        props.setActiveMonstersState([...props.activeMonstersState, enemyToAdd]); 
        console.log(props.activeMonstersState) 
    }

    const renderChooseOptions = () => {
        return loadedMonstersState.map((monster, index) => <option value={index}>{monster.name}</option>)
    }

    const renderActiveMonsters = () => {
        return props.activeMonstersState.map((monster) =>
            <tr key={monster._id} className="hover">
              <td>{monster.name}</td>
            </tr>)

    }

    return (
        <dialog id="GameHudSlovotepecMonsterModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold mb-7 text-primary">Nepřátelé</h3>


                <div className='grid grid-cols-2 gap-5 mb-5'>

                    <select onChange={(event) => { setSelectedMonsterTypeState(event.target.value); loadEnemies() }} value={selectedMonsterTypeState} className="select select-bordered">
                        <option disabled={true}>Vyberte typ monstra</option>
                        <option>Lidský</option>
                        <option>Bestie</option>
                        <option>Nemrtví</option>
                        <option>Stín</option>
                    </select>

                    {selectedMonsterTypeState != "Vyberte typ monstra" ?
                        <select onChange={(event) => { setSelectedMonsterState(event.target.value); loadEnemies() }} value={selectedMonsterState} className="select select-bordered">
                            <option disabled={true}>Vyber monstrum</option>
                            {renderChooseOptions()}
                        </select> : ""}

                </div>

                {selectedMonsterState != "Vyber monstrum" ? <button onClick={() => {addEnemyAsActive()}} className='w-full btn btn-success'>Přidat do bojové vřavy</button> : ""}

                <div className="divider divider-primary"></div>
                <h2>Aktivní monstra:
                    <div className="overflow-x-auto">

                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Jméno</th>

                                </tr>
                            </thead>
                            <tbody>
                                {renderActiveMonsters()}
                            </tbody>
                        </table>
                    </div>
                </h2>

            </div>
        </dialog>
    )
}

export default GameHudSlovotepecMonsterModal