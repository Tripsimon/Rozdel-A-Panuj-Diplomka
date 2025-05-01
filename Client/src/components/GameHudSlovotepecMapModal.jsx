import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';

function GameHudSlovotepecMapModal(props) {
    const [loadedMapsState, setLoadedMapsState] = useState([])

    const [selectedState, setSelectedState] = useState("")

    useEffect(() => {
        loadMaps()
    }, [])

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#001D3D",
            color: "yellow",
            width: "100%"
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "#001D3D",

        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: "#b49306",

        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#b49306' : '#001D3D',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        dropdownindicatorSeparatorIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
    }

    const loadMaps = () => {
        axios.get(axios.defaults.baseURL + '/pozadi/dump')
            .then(response => {
                var holder = []
                response.data.forEach(element => {
                    holder.push({ value: element, label:element })
                });
                setLoadedMapsState(holder)
            })
    }

    const renderChooseOptions = () => {
        return loadedMapsState.map(map => <option key={map} value={map}>{map}</option>)
    }

    return (
        <dialog id="GameHudSlovotepecMapModal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold mb-7 text-primary">Slovotepec - Mapy</h3>

                <Select
                    styles={selectStyles}
                    className='text-primary'
                    defaultValue={selectedState}
                    onChange={(event) => { props.setGameState({ ...props.gameState, map:event.value}), setSelectedState(event.value), props.socketsResyncGameState() }}
                    options={loadedMapsState}
                    placeholder={"Mapa"}
                />


                <div className="modal-action">
                    <form method="dialog">
                        <button className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GameHudSlovotepecMapModal