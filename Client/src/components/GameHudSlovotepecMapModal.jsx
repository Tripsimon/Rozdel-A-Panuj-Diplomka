import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GameHudSlovotepecMapModal(props) {
    const [loadedMapsState, setLoadedMapsState] = useState([])

    useEffect(() => {
        loadMaps()
    }, [])

    const loadMaps = () => {
        axios.get(axios.defaults.baseURL + '/pozadi/dump')
            .then(response => {
                setLoadedMapsState(response.data)
            })
    }

    const renderChooseOptions = () =>{
        return loadedMapsState.map(map =><option key={map} value={map}>{map}</option>)
    }

    return (
        <dialog id="GameHudSlovotepecMapModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold mb-7 text-primary">Slovotepec - Mapy</h3>



                <select onChange={(event) =>{props.setGameAdventureMapState(event.target.value)}} defaultValue="Vyberte mapu" className="select">
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

export default GameHudSlovotepecMapModal