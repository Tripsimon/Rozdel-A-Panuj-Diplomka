import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdventurerManagementChoice(props) {

  const [loadedCharactersState, setLoadedCharactersState] = useState([])

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = () => {
    axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: 10 } })
      .then(payload => {
        setLoadedCharactersState(payload.data)
        console.log(payload.data)
      })
  }

  const renderAdventurersTable = () => {
    if (loadedCharactersState.length == 0) {
      return (<h2>žádný dobrodruh není vytvořen</h2>)
    } else {
      return loadedCharactersState.map((vec) =>
        <tr key={vec._id} className="hover">
          <td>{vec.majitel}</td>
          <td>{props.adventurers}</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>)

    }
  }

  return (
    <div>
      <div className="card bg-neutral text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="card-title"> Seznam dobrodruhů</h1>
          <div className="overflow-x-auto">

            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>dsa</th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {renderAdventurersTable()}
              </tbody>
            </table>
          </div>
          <div className="justify-end card-actions">
            <a onClick={() => document.getElementById('createAdventurerModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit nového</a>
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Deny</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdventurerManagementChoice