import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';

function GameAdventurerInventoryModal(props) {
    const [inventoryWeight, setInventoryWeight] = useState(0)
    const [selectedItemType, setSelectedItemType] = useState('Weapon')
    const [weaponOptions, setWeaponOptions] = useState([])
    const [armorOptions, setArmorOptions] = useState([])
    const [itemOptions, setItemOptions] = useState([])
    const [loadedOptions, setLoadedOptions] = useState([])

    const [selectedItem, setSelectedItem] = useState(null)
    const [moneyChangeState, setMoneyChangeState] = useState(null)

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

    const weaponTypes = [
        { value: 'Weapon', label: 'Zbraň' },
        { value: 'Armor', label: 'Brnění' },
        { value: 'Item', label: 'Předmět' },
    ];


    useEffect(() => {
        calculateInventoryWeight()

        setWeaponOptions([])
        setArmorOptions([])
        setItemOptions([])

        axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Weapon' } })
            .then(queryResponse => {
                queryResponse.data.forEach(element => {
                    setWeaponOptions([...weaponOptions, { label: element.name, value: element._id }])
                });

                setLoadedOptions(weaponOptions)
            })


        axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Armor' } })
            .then(queryResponse => {
                console.log(queryResponse.data)
                queryResponse.data.forEach(element => {
                    setArmorOptions([...armorOptions, { label: element.name, value: element._id }])
                });
            })


        axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Item' } })
            .then(queryResponse => {
                queryResponse.data.forEach(element => {
                    setItemOptions([...itemOptions, { label: element.name, value: element._id }])
                });

            })
    }, [])


    const getOptions = (e) => {
        if (e == undefined) { return }
        switch (e.value) {
            case 'Weapon':
                setLoadedOptions(weaponOptions)
                break;
            case 'Armor':
                setLoadedOptions(armorOptions)
                break;
            case 'Item':
                setLoadedOptions(itemOptions)
                break;

            default:
                break;
        }
    }

    const renderInventoryContent = () => {
        if (props.openedInventoryAdventurer == null) { return }
        return props.openedInventoryAdventurer.inventar.map((item) =>
            <tr key={item._id} className="bg-base-200" >
                <th>{item.typ}</th>
                <td>{item.name}</td>
                <td>{item.pierce != undefined ? item.pierce : "-"}</td>
                <td>{item.damageBase != undefined ? item.damageBase : "-"}</td>
                <td>{item.damageSeverity != undefined ? item.damageSeverity : "-"}</td>
                <td>{item.armor != undefined ? item.armor : "-"}</td>
                <td>{item.weight != undefined ? item.weight : "-"}</td>
                {props.userIdentityState == "Owner" ? <td><button className="btn btn-outline btn-error" onClick={() => { removeItem(item._id) }} >Zahodit předmět</button></td> : ""}
            </tr>

        )
    }

    const calculateInventoryWeight = () => {
        if (props.openedInventoryAdventurer == null) { return }
        var holder = 0
        props.openedInventoryAdventurer.inventar.map((item) => holder += item.weight)
        setInventoryWeight(holder)
    }

    function getAdventurerName(adventurer) {
        if (props.openedInventoryAdventurer == null) { return }
        let name = adventurer.krestniJmeno
        if (adventurer.prezdivka != null) {
            name = name + ' "' + adventurer.prezdivka + '" '
        }
        name = name + adventurer.prijmeni
        return name
    }



    const removeItem = (item) => {
        axios.post(axios.defaults.baseURL + '/character/removeFromInventory', { "item": item, 'adventurer': props.openedInventoryAdventurer._id })
            .then(responseQuery => {
                if (responseQuery.data == "Item Removed") {
                    props.socketsResyncPlayers()
                }
            })

    }

    const addItem = () => {
        console.log(selectedItem)
        axios.post(axios.defaults.baseURL + '/character/putIntoInventory', { "item": selectedItem, 'adventurer': props.openedInventoryAdventurer._id })
            .then(responseQuery => {

                if (responseQuery.data == "Item Added") {
                    props.socketsResyncPlayers()
                }
            })

    }

    const changeMoney = () => {
        axios.post(axios.defaults.baseURL + '/character/changeMoney', { money: moneyChangeState, adventurer: props.openedInventoryAdventurer._id })
            .then(queryResponse => {
                props.socketsResyncPlayers()
            })

    }


    return (
        <dialog id="gameAdventurerInventoryModal" className="modal">
            {props.openedInventoryAdventurer == null ? "" : <div className="modal-box w-[90%] max-w-[90%]">
                <h3 className="text-lg font-bold text-center uppercase text-primary">{getAdventurerName(props.openedInventoryAdventurer) + "- Inventář"}</h3>
                <div className="mb-10 divider divider-warning"></div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='text-primary'></th>
                                <th className='text-primary'>Jméno</th>
                                <th className='text-primary'>Průraznost</th>
                                <th className='text-primary'>Základní poškození</th>
                                <th className='text-primary'>Kritické poškození</th>
                                <th className='text-primary'>Hodnota brnění</th>
                                <th className='text-primary'>Váha</th>

                                {props.userIdentityState == "Owner" ? <th className='text-primary'>Akce</th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {renderInventoryContent()}
                        </tbody>
                    </table>
                </div>

                <div className='grid grid-cols-3 gap-5 text-center'>
                    <div className='mt-5 border-2 rounded-lg bg-secondary border-primary'>
                        <p className={'text-lg text-primary' + (inventoryWeight > props.openedInventoryAdventurer.atributy.sila * 8 ? ' !text-red-500' : "")}>
                            {" Váha: " + inventoryWeight + " / " + props.openedInventoryAdventurer.atributy.sila * 8}
                        </p>
                    </div>
                    <div className='mt-5 border-2 rounded-lg bg-secondary border-primary'>
                        <p className={'text-lg text-primary' + (props.openedInventoryAdventurer.penize <= 0 ? ' !text-red-500' : "")}>
                            {" Peníze: " + props.openedInventoryAdventurer.penize}
                        </p>
                    </div>
                    <div className='mt-5 border-2 rounded-lg bg-secondary border-primary'>
                        <p className={'text-lg text-primary' + (props.openedInventoryAdventurer.penize <= 0 ? ' !text-red-500' : "")}>
                            {"Ash'Arii: " + "???"}
                        </p>
                    </div>
                </div>

                <h3 className="mt-10 text-lg font-bold text-primary">Menu slovotepce</h3>
                <div className="mb-10 divider divider-warning"></div>

                <fieldset className="fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Přidat předmět</legend>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <Select
                                styles={selectStyles}
                                className='text-primary'
                                defaultValue={selectedItemType}
                                onChange={(e) => { getOptions(e) }}
                                options={weaponTypes}
                                placeholder={"Typ předmětu"}
                            />
                        </div>
                        <div>
                            <Select
                                styles={selectStyles}
                                className='text-primary'
                                defaultValue={selectedItem}
                                onChange={(e) => { setSelectedItem(e.value) }}
                                options={loadedOptions}
                                placeholder={"Typ předmětu"}
                            />
                        </div>
                    </div>
                    { selectedItem != null ? <a onClick={() => {addItem(); }} className="w-full mt-5 uppercase btn bg-secondary btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop">Přidat předmět</a>:""}

                </fieldset>

                <fieldset className="mt-10 fieldset">
                    <legend className="mb-2 text-lg fieldset-legend text-primary">Peníze</legend>
                    <div className='grid'>
                        <input type="number" onChange={(event) => { setMoneyChangeState(event.target.value)}} className="w-full input input-bordered input-warning text-primary bg-secondary" />
                    </div>
                    { moneyChangeState != null ? <a onClick={() => {changeMoney(); }} className="w-full mt-5 uppercase btn bg-secondary btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-backdrop">Změnit peníze</a>:""}
                    <p className="label"></p>
                </fieldset>

                <div className="modal-action">
                    <form method="dialog">


                        <button className="mx-5 uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary" onClick={() => { prihlaseni() }}>Přihlásit</button>
                        <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>}
        </dialog>
    )
}

export default GameAdventurerInventoryModal