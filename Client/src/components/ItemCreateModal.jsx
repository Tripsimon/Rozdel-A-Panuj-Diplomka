import React, { useState } from 'react'
import AlertDriver from "./AlertDriver"
import axios from 'axios'

function ItemCreateModal() {

    const [typState, setTypState] = useState("Vyberte typ předmětu")
    const [itemNameState, setItemNameState] = useState("")
    const [itemDescriptionState, setItemDescriptionState] = useState("")
    const [itemWeightState, setItemWeightState] = useState("")
    const [itemPierceState, setItemPierceState] = useState()
    const [itemDamageBaseState, setItemDamageBaseState] = useState()
    const [itemDamageCriticalState, setItemDamageCriticalState] = useState()
    const [itemDefenceState, setItemDefenceState] = useState()

    const renderForm = () => {
        switch (typState) {
            case "Weapon":
                return renderWeaponForm()

            case "Armor":
                return renderArmor()

            default:
                break;
        }

    }

    const renderWeaponForm = () => {
        return (<div>
            <input type="number" placeholder="Průraznost" value={itemPierceState} onChange={(event) => { setItemPierceState(event.target.value); }} className="w-full mb-5 input input-bordered " />

            <div className='grid grid-cols-2 gap-5'>
                <input type="number" placeholder="Poškození" value={itemDamageBaseState} onChange={(event) => { setItemDamageBaseState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="number" placeholder="Závažné poškození" value={itemDamageCriticalState} onChange={(event) => { setItemDamageCriticalState(event.target.value); }} className="w-full mb-5 input input-bordered " />
            </div>
        </div>)
    }

    const renderArmor = () => {
        return (<div>
            <input type="number" placeholder="Zbroj" value={itemDefenceState} onChange={(event) => { setItemDefenceState(event.target.value); }} className="w-full mb-5 input input-bordered " />
        </div>)
    }


    const handleSubmit = () => {
        switch (typState) {
            case "Weapon":
                uploadWeapon()
                break;

            case "Armor":
                uploadArmor()
                break;

            case "Item":
                uploadItem()
                break;

            default:
                break;
        }
    }


    /**
 * Odešle Zbraň
 */
    function uploadWeapon() {
        axios.post(axios.defaults.baseURL + '/vybava/createWeapon',
            {
                'name': itemNameState,
                'type': typState,
                'description': itemDescriptionState,
                'weight': itemWeightState,
                'abilities': [],
                'pierce': itemPierceState,
                'damageBase': itemDamageBaseState,
                'damageSeverity': itemDamageCriticalState,

            })
            .then(queryResponse => {
                console.log(queryResponse.data)
                if (queryResponse.reponse == "Item Created") {
                }
            })
    }

    /**
     * Odešle Zbroj
     */
    function uploadArmor() {
        axios.post(axios.defaults.baseURL + '/vybava/createArmor',
            {
                'name': itemNameState,
                'type': typState,
                'description': itemDescriptionState,
                'abilities': [],
                'obrana': itemDefenceState,
                'weight': itemWeightState
            })
            .then(queryResponse => {
                console.log(queryResponse.data)
                if (queryResponse.reponse == "Item Created") {
                    
                }
            })
    }

    /**
     * Odešle Předmět
     */
    function uploadItem() {

        axios.post(axios.defaults.baseURL + '/vybava/createItem',
            {
                'name': itemNameState,
                'type': typState,
                'description': itemDescriptionState,
                'abilities': [],
                'weight': itemWeightState
            })
            .then(queryResponse => {
                if (queryResponse.reponse == "Item Created") {
                }
            })
    }

    return (
        <dialog id="itemCreateModal" className="modal">
            <div className="modal-box">
                <AlertDriver className="mb-5" show={false} type="error"></AlertDriver>
                <h3 className="text-lg font-bold mb-7 text-primary">Tvorba předmětu</h3>

                <input type="text" placeholder="Jméno předmětu" value={itemNameState} onChange={(event) => { setItemNameState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <input type="number" placeholder="Váha" value={itemWeightState} onChange={(event) => { setItemWeightState(event.target.value); }} className="w-full mb-5 input input-bordered" />
                <input type="text" placeholder="Popis" value={itemDescriptionState} onChange={(event) => { setItemDescriptionState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <select value={typState} onChange={(event) => { setTypState(event.target.value) }} className="w-full mb-5 input-bordered select">
                    <option disabled={true}>Vyberte typ předmětu</option>
                    <option value={"Weapon"} >Zbraň</option>
                    <option value={"Armor"}>Zbroj</option>
                    <option value={"Item"}>Předmět</option>
                    <option disabled={true} value={"consumable"}>Výbava</option>
                </select>

                {renderForm()}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary" onClick={() => { handleSubmit() }}>Vytvořit předmět</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ItemCreateModal