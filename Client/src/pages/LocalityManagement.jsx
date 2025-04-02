import React, { useEffect, useState } from 'react'
import axios from "axios"


function MapManagement() {
  const [loadedLocalitiesState, setLoadedLocalitiesState] = useState([])

  useEffect(() => {
    loadLocalities()
  }, [])

  const loadLocalities = () => {
    axios.get(axios.defaults.baseURL + '/locality/getLocalities')
      .then(response => {
        setLoadedLocalitiesState(response.data)
      })
  }

  const renderLocalitiesTable = () =>{
    return loadedLocalitiesState.map(locality =><tr key={locality.name} value={locality.name}><td>{locality.name}</td><td>{locality.height}</td><td>{locality.width}</td></tr>)
}

  return (
    <div>
      <div className="card bg-neutral text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="card-title text-primary"> Seznam vytvořených lokalit</h1>
          <div className="overflow-x-auto">

            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Jméno</th>
                  <th>Výška</th>
                  <th>Šířka</th>
                </tr>
              </thead>
              <tbody>
                {renderLocalitiesTable()}
              </tbody>
            </table>
          </div>
          <div className="justify-end card-actions">
            <a onClick={() => document.getElementById('createLocalityModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit novou mapu</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapManagement