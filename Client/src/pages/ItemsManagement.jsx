import React, { useEffect, useState } from 'react'
import ItemCreateModal from '../components/ItemCreateModal'
import axios from 'axios';

function ItemsManagement() {
  const [loadedItemsState, setLoadedItemsState] = useState([])

    useEffect(() => {
      loadItems();
    }, []);

  function loadItems() {
    axios.get(axios.defaults.baseURL + '/vybava/allType' ,{params: { type: "weapon" }})
        .then(response => {
          console.log(response)
          setLoadedItemsState( response.data)
        })
}

const renderItemsTable = () =>{
  return loadedItemsState.map((item) =><tr key={item._id}><td>{item.name}</td><td>{item.typ}</td><td>{item.description}</td><td>{item.weight}</td></tr>)
}

  return (
    <>
    <ItemCreateModal></ItemCreateModal>
      <div>
        <div className="card bg-secondary mt-10 text-neutral-content w-[90%] ml-[5%]">
          <div className="items-center text-center card-body">
            <h1 className="card-title text-primary"> Seznam předmětů</h1>
            <div className="overflow-x-auto">

              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Jméno předmětu</th>
                    <th>Typ</th>
                    <th>Popis</th>
                    <th>Váha</th>
                  </tr>
                </thead>
                <tbody>
                  {renderItemsTable()}
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