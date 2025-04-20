import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { reduxReturnUser } from '../store/userSlice';
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
      <tr key={vec._id} className=" hover">
        <td>{vec.krestniJmeno}</td>
        <td>{vec.prijmeni}</td>
        <td>{vec.prezdivka}</td>
        <td>{vec.rasa}</td>
        <td>{vec.trida}</td>
        <td><button className="btn btn-outline btn-error" onClick={() => { smazDobrodruha(vec._id) }} >Smazat</button></td>
      </tr>)
  }

  /**
 * Smaže dobrodruha z databáze
 */
  function smazDobrodruha(id) {
    axios.delete(axios.defaults.baseURL + '/character/deleteAdventurer', { data: { adventurer: id } })
      .then(queryResponse => {
        if (queryResponse.data == 'Adventurer Deleted') {
          loadCharacters()
        }
      })
  }

  return (
    <div>
      <div className="card bg-secondary mt-10 text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="uppercase card-title text-primary"> Seznam dobrodruhů</h1>
          <div className="mb-10 divider divider-warning"></div>
          <div className="overflow-x-auto">
            {loadedCharactersState.length == 0 ? <h2 className='mb-10 text-error text-2lg'>Žádný dobrodruh není vytvořen. Prosím, vytvořte nového</h2> : <table className="table ">

              {/* head */}
              <thead className='text-center border-b-2 border-solid border-primary'>
                <tr>
                  <th className='text-primary'>Křestní jméno</th>
                  <th className='text-primary'>Příjmení</th>
                  <th className='text-primary'>Přezdívka</th>
                  <th className='text-primary'>Rasa</th>
                  <th className='text-primary'>Třída</th>
                  <th className='text-primary'>Akce</th>
                </tr>
              </thead>
              <tbody  >
                {renderAdventurersTable()}
              </tbody>

            </table>}
          </div>
          <div className="justify-end card-actions">
            <a onClick={() => document.getElementById('createAdventurerModal').showModal()} className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Vytvořit nového dobrodruha</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdventurerManagementChoice