import React, { useState } from 'react'
import GameHud from '../components/GameHud'
import GameMap from "../components/GameMap"
import GameBattleLocality  from "../components/GameBattleLocality"
import GameBattleSequencer from '../components/GameBattleSequencer'

function Game() {

    const [gameModeState, setGameModeState] = useState('adventure')

    const swapGameMode = () =>{
        switch (gameModeState) {
            case 'fight':
                setGameModeState('adventure')
                break;
        
            case 'adventure':
                setGameModeState('fight')
                break;
        
            default:
                break;
        }
    }

    const renderGameMode = () =>{
        switch (gameModeState) {
            case 'fight':
                return(<><GameBattleSequencer></GameBattleSequencer><GameBattleLocality></GameBattleLocality></>)
        
            case 'adventure':
                return(<><GameMap></GameMap></>)
        
            default:
                break;
        }
    }

    return (
        <div>
                        <button onClick={() =>swapGameMode()}>swap</button>
            {renderGameMode()}

            <GameHud></GameHud>
        </div>
    )
}

export default Game