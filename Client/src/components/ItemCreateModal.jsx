import React, { useState } from 'react'
import AlertDriver from "./AlertDriver"
import axios from 'axios'

function ItemCreateModal() {

    const [typState, setTypState] = useState("item")
    const [itemNameState, setItemNameState] = useState("")
    const [itemDescriptionState, setItemDescriptionState] = useState("")
    const [itemWeightState, setItemWeightState] = useState()
    const [itemPierceState, setItemPierceState] = useState()
    const [itemDamageBaseState, setItemDamageBaseState] = useState()
    const [itemDamageCriticalState, setItemDamageCriticalState] = useState()

    const renderForm = () => {
        switch (typState) {
            case "weapon":
                return renderWeaponForm()

            case "armour":
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
            <select value={typState} onChange={(event) => { setTypState(event.target.value) }} className="w-full mb-5 input-bordered select">
                <option disabled={true}>Typ zbroje</option>
                <option>Zbroj</option>
                <option>Výbava</option>
                <option>Předmět</option>
            </select>
            <input type="number" placeholder="Zbroj" onChange={(event) => { setEmailState(event.target.value); }} className="w-full mb-5 input input-bordered " />

        </div>)
    }


    const handleSubmit = () => {
        switch (typState) {
            case "weapon":
                uploadWeapon()
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
                'name': chosenName.value,
                'type': chosenType.value,
                'description': chosenDescription.value,
                'abilities': chosenAbilities.value,
                'obrana': chosenArmor.value,
                'weight': chosenWeight.value
            })
            .then(queryResponse => {
                if (queryResponse.reponse == "Item Created") {
                    updateData()
                }
            })
    }

    /**
     * Odešle Předmět
     */
    function uploadItem() {

        axios.post(axios.defaults.baseURL + '/vybava/createItem',
            {
                'name': chosenName.value,
                'type': chosenType.value,
                'description': chosenDescription.value,
                'abilities': chosenAbilities.value,
                'weight': chosenWeight.value
            })
            .then(queryResponse => {
                if (queryResponse.reponse == "Item Created") {
                    updateData()
                    chosenType.value = null
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
                    <option value={"weapon"} >Zbraň</option>
                    <option value={"armor"}>Zbroj</option>
                    <option value={"consumable"}>Výbava</option>
                    <option value={"item"}>Předmět</option>
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