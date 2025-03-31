import React, { useEffect, useState } from 'react'
import { use } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {reduxReturnUser } from '../store/userSlice';

function LocalityCreateModal() {
  const loggedUser = useSelector(reduxReturnUser)
    
  const [localityName, setLocalityName] = useState("")
  const [localityWidthState, setLocalityWidthState] = useState(10)
  const [localityHeightState, setLocalityHeightState] = useState(10)
  const [squaresState, setSquaresState] = useState([[1], [1]]);
  const [localityClickState, setLocalityClickState] = useState(1)

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    createBoard()
  }, [localityWidthState])

  useEffect(() => {
    createBoard()
  }, [localityHeightState])

  const createBoard = () => {
    var stateSquares = [];
    for (let i = 0; i < localityHeightState; i++) {
      const stateRow = []
      for (let j = 0; j < localityWidthState; j++) {
        stateRow.push(0)
      }
      stateSquares.push(stateRow)
    }

    setSquaresState(stateSquares)
  }

  const displayBoard = () => {
    const squares = [];
    squaresState.forEach((heightItem, indexi) => {
      const row = [];
      heightItem.forEach((rowItem, indexj) => {
        row.push(<div key={`${indexi}-${indexj}`} id={"place-" + indexi + "-" + indexj} onClick={() => localityClick(indexi, indexj)} className={`${returnLocalityColor(rowItem)} w-[25px] h-[25px] m-0.5`} ></div>);
      })
      squares.push(
        <div key={indexi} className='flex'>
          {row}
        </div>
      );
    });

    return squares;
  }

  const returnLocalityColor = (key) => {
    switch (key) {
      case 1:
        return 'bg-black'

      case 2:
        return 'bg-yellow-700'

      case 3:
        return 'bg-blue-700'

      default:
        return 'bg-white'
    }
  }

  const localityClick = (i, j) => {
    const newData = squaresState.slice(0);
    if (newData[i][j] == localityClickState) {
      newData[i][j] = 0
    } else {
      newData[i][j] = localityClickState
    }
    setSquaresState(newData)
  }

  const changeLocalityClickType = (chosenType) => {
    setLocalityClickState(chosenType)
  }

  const submitForm = () =>{
    let obsah = ({
      "localityName": localityName,
      "localityHeight": localityHeightState,
      "localityWidth": localityHeightState,
      "locality": squaresState,
      "owner": loggedUser.userID

  })

  axios.post(axios.defaults.baseURL + '/locality/createLocality', obsah)
      .then()
  }

  return (
    <dialog id="createLocalityModal" className="modal">
      <div className="modal-box w-[90%] max-w-[90%]">
        <h1 className="mb-10 text-lg font-bold text-primary">Tvorba lokality</h1>
        <h2 className='text-lg text-primary'> Nastavení:</h2>
        <input type="text" placeholder="Jméno lokality" value={localityName} onChange={(event) => { setLocalityName(event.target.value); }} className="w-full mb-5 input input-bordered " />
        <input type="number" placeholder="Výška lokality" value={localityHeightState} onChange={(event) => { setLocalityHeightState(event.target.value); }} className="w-full mb-5 input input-bordered " />
        <input type="number" placeholder="Šířka lokality" value={localityWidthState} onChange={(event) => { setLocalityWidthState(event.target.value); createBoard() }} className="w-full mb-5 input input-bordered" />

        <h2 className='text-lg text-primary'> Lokalita:</h2>
        <div className='overflow-auto border-2 w-fit border-primary'>
          {displayBoard()}
        </div>
        <h2 className='text-lg text-primary'> Vyplnění lokality:</h2>
        <div>
          <button onClick={() => changeLocalityClickType(1)} className="btn text-primary">Neprůchodná Stěna</button>
          <button onClick={() => changeLocalityClickType(2)} className="btn text-primary">Barikáda</button>
          <button onClick={() => changeLocalityClickType(3)} className="btn text-primary">Voda</button>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => { submitForm() }} className="mx-5 btn text-primary">Uložit lokalitu</button>
            <button className="btn text-primary">Zavřít</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default LocalityCreateModal