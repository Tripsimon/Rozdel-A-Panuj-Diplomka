import React, {useEffect} from 'react'
import axios from 'axios'

function AdventurerManagementChoice(props) {

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = () => {
    axios.get(axios.defaults.baseURL + '/character/getCharacters')
      .then(responseQuery => {
        console.log(responseQuery.data);
      })
  }

  const renderAdventurersTableEntry = () => {
    return (
      <tr className="hover">
        <th>1</th>
        <td>      {props.adventurers}</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
    )
  }

  return (
    <div>
      <div className="card bg-neutral text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="card-title"> Seznam dobrodruhů</h1>
          <div className="overflow-x-auto">
            { }
            <h2>žádný dobrodruh není vytvořen</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {renderAdventurersTableEntry()}
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