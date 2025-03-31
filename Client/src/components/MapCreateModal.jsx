import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {reduxReturnUser } from '../store/userSlice';
import { use } from 'react';

function MapCreateModal() {
  const loggedUser = useSelector(reduxReturnUser)
    
  const [mapName, setMapName] = useState("")
  const [uploadImageState, setUploadImageState] = useState(false)
  const [uploadImagePreviewState, setUploadImagePreviewState] = useState(false)


  const choseFile = (event) =>{
    if (event.target.files && event.target.files[0]) {
      setUploadImagePreviewState(URL.createObjectURL(event.target.files[0]));
      setUploadImageState(event.target.files[0])
    }

  }

  const submitForm = () =>{
    const formData = new FormData();
    formData.append('image', uploadImageState, mapName)
    formData.append('imageName', mapName)
    axios.post(axios.defaults.baseURL + '/pozadi/nahraniSouboru', formData)
      .then(queryResponse => {
        if (queryResponse.data == 'File Uploaded') {
          //Reload
        }
      })
  }

  return (
    <dialog id="createMapModal" className="modal">
      <div className="modal-box w-[90%] max-w-[90%]">
        <h1 className="mb-10 text-lg font-bold text-primary">Tvorba mapy</h1>
        <h2 className='text-lg text-primary'> Nastavení:</h2>
        <input type="text" placeholder="Jméno lokality" value={mapName} onChange={(event) => { setMapName(event.target.value); }} className="w-full mb-5 input input-bordered " />
        <input onChange={(event) =>{ choseFile(event)}} type="file" className="file-input" />
        {uploadImagePreviewState ? <img className='m-2 border-green-500 border-4 placeholder:text-primary-200 outline-none focus:border-green-500 text-primary-200 w-[200px] h-[200px]' src={uploadImagePreviewState}></img> : ""}



        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => { submitForm() }} className="mx-5 btn text-primary">Uložit mapu</button>
            <button className="btn text-primary">Zavřít</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default MapCreateModal