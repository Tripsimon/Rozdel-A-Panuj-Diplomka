import React from 'react'

function GameAdventurersDisplay() {
  return (
    <div className='flex flex-row justify-around'>
      <div className="card card-dash bg-secondary w-96">
        <div className="card-body">
          <h2 className="card-title ">Dobrodruh 1</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Inventář</button>
            <button className="btn btn-primary">Schopnosti</button>
            <button className="btn btn-primary">Statistiky</button>
          </div>
        </div>
      </div>
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Dobrodruh 2</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Inventář</button>
            <button className="btn btn-primary">Schopnosti</button>
            <button className="btn btn-primary">Statistiky</button>
          </div>
        </div>
      </div>      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Dobrodruh 3</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Inventář</button>
            <button className="btn btn-primary">Schopnosti</button>
            <button className="btn btn-primary">Statistiky</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameAdventurersDisplay