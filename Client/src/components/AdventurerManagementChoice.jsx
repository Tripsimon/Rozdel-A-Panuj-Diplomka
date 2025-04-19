import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser, reduxReturnUser, reduxReturnUserAuthority } from '../store/userSlice';
import axios from 'axios'

function AdventurerManagementChoice(props) {
      const loggedUser = useSelector(reduxReturnUser)

  const [loadedCharactersState, setLoadedCharactersState] = useState([])

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = () => {
    axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: loggedUser.userID } })
      .then(payload => {
        setLoadedCharactersState(payload.data)
      })
  }

  const renderAdventurersTable = () => {

      return loadedCharactersState.map((vec) =>
        <tr key={vec._id} className="hover">
          <td>{vec.krestniJmeno}</td>
          <td>{vec.prijmeni}</td>
          <td>{vec.prezdivka}</td>
          <td>{vec.rasa}</td>
          <td>{vec.trida}</td>
        </tr>)

    
  }

  return (
    <div>
      <div className="card bg-secondary mt-10 text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="card-title"> Seznam dobrodruhů</h1>
          <div className="overflow-x-auto">
          {loadedCharactersState.length == 0 ? <h2>žádný dobrodruh není vytvořen</h2> : <table className="table">

              {/* head */}
              <thead>
                <tr>
                  <th>Křestní jméno</th>
                  <th>Příjmení</th>
                  <th>Přezdívka</th>
                  <th>Rasa</th>
                  <th>Třída</th>
                </tr>
              </thead>
              <tbody>
                {renderAdventurersTable()}
              </tbody>

            </table>}
          </div>
          <div className="justify-end card-actions">
            <a onClick={() => document.getElementById('createAdventurerModal').showModal()} className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Vytvořit nového</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdventurerManagementChoice