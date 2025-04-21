import React, { useEffect, useState } from 'react'
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';


function GameBattleSequencer(props) {
    const [battlefieldState, setBattleFieldState] = useState([])

    useEffect(() => {
        prepareBattlefieldRound()
    }, [])

    const prepareBattlefieldRound = () => {

        var prepareField = []
        props.adventurers.map((player) => {
            if (player.adventurer != null) {
                player.adventurer.iniciative = calculateadventurerIniciative(player.adventurer.atributy.houzevnatost)
                player.adventurer.typ = "adventurer"
                player.adventurer.active = true
                player.adventurer.selected = false

                prepareField.push(player.adventurer)
            }
        })

        console.log()

        props.activeMonstersState.map((monster) => {
            var monsterHolder = {...monster}
            monsterHolder.active = true
            monsterHolder.selected = false

            prepareField.push(monsterHolder)
        })

        prepareField.sort((a, b) => b.iniciative - a.iniciative);

        console.log(prepareField)

        setBattleFieldState(prepareField)

    }

    const selectEntry = (index) => {
        

        console.log(index)

        var holderarray = [...battlefieldState]

        holderarray.forEach(vec =>{
            vec.selected = false
        })

        holderarray[index].selected = true
        setBattleFieldState(holderarray)
    }

    const fatigueSelected = () => {
        var holderarray = [...battlefieldState]

        holderarray.forEach(vec =>{
            if (vec.selected) {
                vec.active = false 
            }
        })

        setBattleFieldState(holderarray)
    }


    const renderBattlefield = () => {
        return battlefieldState.map((entry, index) => <li onClick={() => selectEntry(index)} key={index}>
            <hr />
            <div className={`${entry.typ == "adventurer" ? "bg-green-600" : "bg-red-600"} ${entry.selected ? "border-2 border-primary  " : " "} text-secondary select-none  timeline-start timeline-box`}>{entry.typ == "adventurer" ? entry.krestniJmeno : entry.name}</div>
            <div className="timeline-middle">
                <Icon className={`${entry.active ? "text-green-600" : "text-yellow-600"}`} path={mdiCheckCircle} size={1} />
            </div>
            <hr />
        </li>)
    }

    const calculateadventurerIniciative = (houzevnatost) => {
        var vypocet = -3.33 * houzevnatost + 86.67

        if (vypocet < 20) {
            return 20
        }
        return (vypocet)
    }


    return (
        <div className=" shadow-xl mx-[5%] my-5 bg-secondary h-[90%] card card-compact bg-base-100">
            <div className="card-body ">
                <h2 className="justify-center card-title text-primary">Bojová vřava</h2>
                <ul className="justify-center timeline">
                    {renderBattlefield()}

                </ul>
                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={() => fatigueSelected()} className="gap-5 btn text-primary"> Vyčerpat</button>
                        <button onClick={() => prepareBattlefieldRound()} className="btn text-primary">Nové kolo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GameBattleSequencer