import React, { useState } from 'react'
import axios from "axios"
function MonsterCreateModal() {
    const [monsterNameState, setMonsterNameState] = useState("")
    const [monsterTypeState, setMonsterTypeState] = useState("")
    const [monsterSizeClassState, setMonsterSizeClassState] = useState("Vyberte velikostní třídu")
    const [monsterDescriptionState, setMonsterDescriptionState] = useState("")

    const [monsterStrengthState, setMonsterStrengthState] = useState(8)
    const [monsterConstitutionState, setMonsterConstitutionState] = useState(8)
    const [monsterAgilityState, setMonsterAgilityState] = useState(8)
    const [monsterCharismaState, setMonsterCharismaState] = useState(8)
    const [monsterInteligenceState, setMonsterInteligenceState] = useState(8)
    const [monsterKnowledgeState, setMonsterKnowledgeState] = useState(8)

    const [monsterAbilitiesState, setMonsterAbilitiesState] = useState([])

    const [monsterArmourState, setMonsterArmourState] = useState(false)
    const [monsterLifeState, setMonsterLifeState] = useState(false)

    const [monsterPierceState, setMonsterPierceState] = useState(false)
    const [monsterDamageBase, setMonsterDamageBase] = useState(false)
    const [monsterDamageSeverity, setMonsterDamageSeverity] = useState(false)

    const [monsterIniciative, setMonsterIniciative] = useState(false)

    const addAbility = () => {
        setMonsterAbilitiesState(monsterAbilitiesState => [...monsterAbilitiesState, {}])
    }

    function updateObj(index, key, value) {
        setMonsterAbilitiesState(s => [...s.slice(0, index), { ...s[index], [key]: value }, ...s.slice(index + 1),])
    }

    const renderAbilities = () => {
        return monsterAbilitiesState.map((ability, index) => <div key={index} className="shadow-sm card w-96 bg-secondary card-sm">
            <div className="card-body">
                <h2 className="card-title">Schopnost {index}</h2>
                <input type="text" value={ability.name} onChange={(event) => { updateObj(index, "name", event.target.value) }} placeholder="Jméno:" className="w-full mb-5 input input-bordered " />
                <input type="text" value={ability.ability} onChange={(event) => { updateObj(index, "effect", event.target.value) }} placeholder="Efekt:" className="w-full mb-5 input input-bordered " />
                <select value={ability.type} onChange={(event) => { updateObj(index, "typ", event.target.value); }} className="w-full mb-5 input-bordered select">
                    <option disabled={true}>Vyberte typ Schopnosti</option>
                    <option>Pasivní</option>
                    <option>Aktivní</option>
                </select>
                {ability.type == "Aktivní" ?                 <input type="number" value={ability.cooldown} onChange={(event) => { updateObj(index, "cooldown", event.target.value) }} placeholder="Doba nabití:" className="w-full mb-5 input input-bordered " /> : ""}
                <div className="justify-end card-actions">
                    <button onClick={() => {var array = [...monsterAbilitiesState]; array.splice(index,1); setMonsterAbilitiesState(array)}} className="btn btn-primary">Vymazat</button>
                </div>
            </div>
        </div>)
    }

    const submitForm = () => {
        console.log(monsterAbilitiesState)
        axios.post(axios.defaults.baseURL + '/monster/createMonster',
            {
                'name': monsterNameState,
                'description': monsterDescriptionState,
                'sizeGroup': monsterSizeClassState,
                'type': monsterTypeState,


                'abilities': monsterAbilitiesState,

                'strength': monsterStrengthState,
                'constitution': monsterConstitutionState,
                'agility': monsterAgilityState,
                'charisma': monsterCharismaState,
                'inteligence': monsterInteligenceState,
                'knowledge': monsterKnowledgeState,

                'armor': monsterArmourState,
                'life': monsterLifeState,


                'pierce': monsterPierceState,
                'damageBase': monsterDamageBase,
                'damageSeverity': monsterDamageSeverity,

                'iniciative' : monsterIniciative

            }
        ).then(response => { console.log(response) })
    }

    return (
        <dialog id="MonsterCreateModal" className="modal">
            <div className="modal-box w-[90%] max-w-[90%]">
                <h3 className="text-xl font-bold mb-7 text-primary">Tvorba monstra</h3>
                <div className="divider divider-primary"></div>

                <h3 className='text-lg text-primary'>Informace:</h3>
                <input type="text" placeholder="Jméno" value={monsterNameState} onChange={(event) => { setMonsterNameState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <select value={monsterTypeState} onChange={(event) => { setMonsterTypeState(event.target.value); }} className="w-full mb-5 input-bordered select">
                    <option disabled={true}>Vyberte typ monstra</option>
                    <option>Lidský</option>
                    <option>Bestie</option>
                    <option>Nemrtví</option>
                    <option>Stín</option>
                </select>
                <select value={monsterSizeClassState} onChange={(event) => { setMonsterSizeClassState(event.target.value); }} className="w-full mb-5 input-bordered select">
                    <option disabled={true}>Vyberte velikostní třídu</option>
                    <option>Maličký</option>
                    <option>Pulčík</option>
                    <option>Lidský</option>
                    <option>Obří</option>
                    <option>Gigantický</option>
                </select>
                <input type="text" placeholder="POpis monstra" value={monsterDescriptionState} onChange={(event) => { setMonsterDescriptionState(event.target.value); }} className="w-full mb-5 input input-bordered " />


                <h3 className='text-lg text-primary'>Schopnosti:</h3>
                <button onClick={() => { addAbility() }} className="btn text-primary">Přidat schopnost</button>
                <div className='grid grid-cols-2'>
                    {renderAbilities()}
                </div>

                <h3 className='text-lg text-primary'>Atributy:</h3>
                <input type="number" placeholder="Životy" onChange={(event) => { setMonsterLifeState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                <div className='grid grid-cols-2 gap-4'>
                    <input type="number" placeholder="Síla" onChange={(event) => { setMonsterStrengthState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                    <input type="number" placeholder="Houževnatost" onChange={(event) => { setMonsterConstitutionState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <input type="number" placeholder="Obratnost" onChange={(event) => { setMonsterAgilityState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                    <input type="number" placeholder="Charisma" onChange={(event) => { setMonsterCharismaState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <input type="number" placeholder="Inteligence" onChange={(event) => { setMonsterInteligenceState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                    <input type="number" placeholder="Znalost" onChange={(event) => { setMonsterKnowledgeState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <input type="number" placeholder="Zbroj" onChange={(event) => { setMonsterArmourState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                    <input type="number" placeholder="Průraznost" onChange={(event) => { setMonsterPierceState(event.target.value); }} className="w-full mb-5 input input-bordered " />
                </div>

                <input type="number" placeholder="Iniciativa" value={monsterIniciative} onChange={(event) => { setMonsterIniciative(event.target.value); }} className="w-full mb-5 input input-bordered " />

                <div className="modal-action">
                    <form method="dialog">
                        <button className="mx-5 btn text-primary" onClick={() => { submitForm() }}>Vytvořit</button>
                        <button className="btn text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default MonsterCreateModal