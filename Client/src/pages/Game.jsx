import React from 'react'
import GameHud from '../components/GameHud'
import GameMap from "../components/GameMap"
import GameBattleSequencer from '../components/GameBattleSequencer'

function Game() {
    return (
        <div>
            <GameBattleSequencer></GameBattleSequencer>
            
            <GameMap></GameMap>

            <GameHud></GameHud>
        </div>
    )
}

export default Game