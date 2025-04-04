import React from 'react'
import ItemCreateModal from '../components/ItemCreateModal'

function ItemsManagement() {
  return (
    <>
    <ItemCreateModal></ItemCreateModal>
      <div>
        <div className="card bg-neutral text-neutral-content w-[90%] ml-[5%]">
          <div className="items-center text-center card-body">
            <h1 className="card-title"> Seznam předmětů</h1>
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
              <a onClick={() => document.getElementById('itemCreateModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit novou mapu</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemsManagement