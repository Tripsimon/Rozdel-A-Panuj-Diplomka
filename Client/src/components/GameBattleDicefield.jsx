import React, { useState } from 'react'

import dice1 from './../assets/images/dice/dice1.jpg'
import dice2 from './../assets/images/dice/dice2.jpg'
import dice3 from './../assets/images/dice/dice3.jpg'
import dice4 from './../assets/images/dice/dice4.jpg'
import dice5 from './../assets/images/dice/dice5.jpg'
import dice6 from './../assets/images/dice/dice6.jpg'

function GameBattleDicefield(props) {
    const [diceState, setDiceState] = useState(1)

    var dice = [dice1, dice2, dice3, dice4, dice5, dice6]

    const throwDice = () =>{
        setDiceState(Math.floor((Math.random() *6)+1))
    }

    const renderAdventurersChoice = () =>{
        console.log(props)
        return props.adventurers.map((player) =><div className='bg-red-400' >AAA</div>

            
        )
    }

    const renderActiveMonstersChoice = () =>{
        return props.activeMonstersState.map((monster) =><div className='bg-red-400'  key={monster.uid} >{monster.name}</div>
            
        )
    }

    return (
        <div className='grid grid-cols-3 bg-secondary mx-[5%] card'>
            <div className='flex justify-center'>
                <h3 className='text-primary'>Dobrodruh</h3>
                {renderAdventurersChoice()}
            </div>
            <div className='flex justify-center'>
                <h3 className='text-primary'>Kostka</h3>
                <img className='w-[200px] h-[250px]'  src={dice[diceState]}></img>
            </div>
            <div className='flex justify-center'>
                <h3 className='text-primary' >Nepřítel</h3>
                {renderActiveMonstersChoice()}
            </div>
            <div>
                <button onClick={() => throwDice()}>Hodit kostkou</button>
            </div>
        </div>
    )
}

export default GameBattleDicefield