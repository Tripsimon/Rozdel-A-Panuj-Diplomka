import React, { useState } from 'react'
import GameHudAdventurer from '../components/GameHudAdventurer'
import GameHudSlovotepec from '../components/GameHudSlovotepec'
import GameMap from "../components/GameMap"
import GameBattleLocality from "../components/GameBattleLocality"
import GameBattleSequencer from '../components/GameBattleSequencer'
import GameAdventurersDisplay from '../components/GameAdventurersDisplay'

function Game() {

    const [gameModeState, setGameModeState] = useState('adventure')
    const [gameAdverureMapState, setGameAdventureMapState] = useState("mapa.jpg")
    const [gameFightLocalityState, setGameFightLocalityState] = useState({
        _id: "ObjectId('67eb1ac2b0f9c2966f359e18')",
        name: 'gfdgdfg',
        width: '10',
        height: '10',
        map: [
            [ 0,0,0,0,0,0,0,0,0,0],
            [0,0,0,
                0,
                0,
                0,
                0,
                0,
                0,
                0],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        ],
        owner: '67e579ea55fccebfe36b140b',
        __v: 0
    })

    const swapGameMode = () => {
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

    const renderGameMode = () => {
        switch (gameModeState) {
            case 'fight':
                return (<><GameBattleSequencer></GameBattleSequencer><GameBattleLocality gameFightLocalityState={gameFightLocalityState}></GameBattleLocality></>)

            case 'adventure':
                return (<><GameMap gameAdverureMapState={gameAdverureMapState}></GameMap></>)

            default:
                break;
        }
    }

    const renderHUD = () => {
        switch (false) {
            case true:
                return (<GameHudAdventurer></GameHudAdventurer>)
                break;

            case false:
                return (<GameHudSlovotepec setGameAdventureMapState={setGameAdventureMapState} swapGameMode={swapGameMode}></GameHudSlovotepec>)
                break;
            default:
                break;
        }
    }

    return (
        <div className='pb-[5%]'>

            {renderGameMode()}

            <GameAdventurersDisplay></GameAdventurersDisplay>

            {renderHUD()}
        </div>
    )
}

export default Game