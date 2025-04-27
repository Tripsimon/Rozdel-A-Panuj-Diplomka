import React, { useEffect, useState } from 'react'
import MonsterCreateModal from '../components/MonsterCreateModal'
import axios from "axios"

function MonsterManagement() {
  const [loadedMonstersState, setLoadedMonstersState] = useState([])

  useEffect(() => {
    getMonsters()
  }, [])


  function getMonsters() {
    axios.get(axios.defaults.baseURL + '/monster/dump')
      .then(queryResponse => setLoadedMonstersState(queryResponse.data))
  }

  const renderMonstersTable = () =>{
    return loadedMonstersState.map((monster) =><tr key={monster._id}><td>{monster.name}</td><td>{monster.description}</td><td>{monster.typ}</td></tr>)
  }

  return (
    <>
      <MonsterCreateModal></MonsterCreateModal>
      <div>
        <div className="card bg-secondary mt-10 text-neutral-content w-[90%] ml-[5%]">
          <div className="items-center text-center card-body">
            <h1 className="card-title text-primary"> Seznam vytvořených monster</h1>
            <div className="overflow-x-auto">

              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Jméno</th>
                    <th>Popis</th>
                    <th>Typ</th>
                  </tr>
                </thead>
                <tbody>
                  {renderMonstersTable()}
                </tbody>
              </table>
            </div>
            <div className="justify-end card-actions">
              <a onClick={() => document.getElementById('MonsterCreateModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit nové monstrum</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MonsterManagement