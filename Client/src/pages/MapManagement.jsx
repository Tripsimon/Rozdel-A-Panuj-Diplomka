import React from 'react'

function MapManagement() {
  return (
    <div>
      <div className="card bg-secondary mt-10 text-neutral-content w-[90%] ml-[5%]">
        <div className="items-center text-center card-body">
          <h1 className="card-title text-primary"> Seznam map</h1>
          <div className="overflow-x-auto">

            <table className="table">
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
              </tbody>
            </table>
          </div>
          <div className="justify-end card-actions">
            <a onClick={() => document.getElementById('createMapModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit novou mapu</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapManagement