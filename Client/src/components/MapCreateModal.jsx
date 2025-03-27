import React from 'react'

function MapCreateModal() {
  return (
    <dialog id="createMapModal" className="modal">
    <div className="modal-box">
        <h3 className="mb-10 text-lg font-bold text-primary">Registrace</h3>
        <input type="email" onChange={(event) => { setEmailState(event.target.value); }} placeholder="Email" className="w-full mb-5 input input-bordered " />
        <input type="text" placeholder="Přezdívka" onChange={(event) => { setPrezdivkaState(event.target.value); }} className="w-full mb-5 input input-bordered" />
        <input type="password" placeholder="Heslo" onChange={(event) => { setHesloState(event.target.value); }} className="w-full mb-5 input input-bordered " />
        <input type="password" placeholder="Opakovat heslo" className="w-full mb-5 input input-bordered" />
        <div className="modal-action">
            <form method="dialog">
                <button onClick={() => { register() }} className="mx-5 btn text-primary">Registrovat</button>
                <button className="btn text-primary">Zavřít</button>
            </form>
        </div>
    </div>
</dialog>
  )
}

export default MapCreateModal