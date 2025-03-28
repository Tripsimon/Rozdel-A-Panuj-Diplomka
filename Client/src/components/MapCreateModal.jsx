import React, { useEffect, useState } from 'react'

function MapCreateModal() {

  const [localityWidthState, setLocalityWidthState] = useState(10)
  const [localityHeightState, setLocalityHeightState] = useState(10)
  const [squaresState, setSquaresState] = useState([[1], [1]]);

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
        row.push(<div key={`${indexi}-${indexj}`} id={"place-" + indexi + "-" + indexj} onClick={() => localityClick(indexi, indexj)} className={`${rowItem == 1 ? 'bg-red-500' : 'bg-blue-500'} w-[25px] h-[25px] m-0.5`} ></div>);
      })
      squares.push(
        <div key={indexi} className='flex'>
          {row}
        </div>
      );
    });


    const localityClick = (i, j) => {
      const newData = squaresState.slice(0);
      newData[i][j] = 1
      setSquaresState(newData)
    }

    return squares;
  }

  return (
    <dialog id="createMapModal" className="modal">
      <div className="modal-box w-[90%] max-w-[90%]">
        <h1 className="mb-10 text-lg font-bold text-primary">Tvorba lokality</h1>
        <h2 className='text-lg text-primary'> Nastavení:</h2>
        <input type="number" placeholder="Výška lokality" value={localityHeightState} onChange={(event) => { setLocalityHeightState(event.target.value); }} className="w-full mb-5 input input-bordered " />
        <input type="number" placeholder="Šířka lokality" value={localityWidthState} onChange={(event) => { setLocalityWidthState(event.target.value); createBoard() }} className="w-full mb-5 input input-bordered" />

        <h2 className='text-lg text-primary'> Lokalita:</h2>
        <div className='overflow-auto border-2 w-fit border-primary'>
          {displayBoard()}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => { register() }} className="mx-5 btn text-primary">Registrovat</button>
            <button className="btn text-primary">Zavřít</button>
          </form>
        </div>
      </div>

      <h2 className='text-lg text-primary'> Vyplnění lokality:</h2>
    </dialog>
  )
}

export default MapCreateModal