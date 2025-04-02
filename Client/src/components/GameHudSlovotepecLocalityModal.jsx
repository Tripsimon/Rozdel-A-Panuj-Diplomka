import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GameHudSlovotepecLocalityModal() {
    const [loadedLocalitiesState, setLoadedLocalitiesState] = useState([])

    useEffect(() => {
        loadLocalities()
    }, [])

    const loadLocalities = () => {
        axios.get(axios.defaults.baseURL + '/locality/getLocalities')
            .then(response => {
                setLoadedLocalitiesState(response.data)
            })
    }

    const renderChooseOptions = () =>{
        return loadedLocalitiesState.map(locality =><option key={locality.name} value={locality.name}>{locality.name}</option>)
    }
    return (
        <dialog id="GameHudSlovotepecLocalityModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold mb-7 text-primary">Slovotepec - Lokality</h3>



                <select  defaultValue="Vyberte mapu" className="select">
                    <option disabled={true}>Pick a color</option>
                    {renderChooseOptions()}
                </select>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameHudSlovotepecLocalityModal