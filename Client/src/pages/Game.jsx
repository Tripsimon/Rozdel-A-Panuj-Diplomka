import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser, reduxReturnUser, reduxReturnUserAuthority } from '../store/userSlice';
import GameHudAdventurer from '../components/GameHudAdventurer'
import GameHudSlovotepec from '../components/GameHudSlovotepec'
import GameMap from "../components/GameMap"
import GameBattleLocality from "../components/GameBattleLocality"
import GameBattleSequencer from '../components/GameBattleSequencer'
import GameAdventurersDisplay from '../components/GameAdventurersDisplay'

import axios from 'axios'

function Game() {
    const loggedUser = useSelector(reduxReturnUser)

    let urlParams = new URLSearchParams(window.location.search)
    const sid = urlParams.get('sid')

    const [userIdentityState, setUserIdentityState] = useState('user')

    const [player1State, setPlayer1State] = useState({ owner: null, adventurer: null, adventurerID: null })
    const [player2State, setPlayer2State] = useState({ owner: null, adventurer: null, adventurerID: null })
    const [player3State, setPlayer3State] = useState({ owner: null, adventurer: null, adventurerID: null })


    const [gameModeState, setGameModeState] = useState('adventure')
    const [gameAdverureMapState, setGameAdventureMapState] = useState("mapa.jpg")
    const [gameFightLocalityState, setGameFightLocalityState] = useState({
        _id: "ObjectId('67eb1ac2b0f9c2966f359e18')",
        name: 'gfdgdfg',
        width: '10',
        height: '10',
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0,
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

    useEffect(() => {

        let urlParams = new URLSearchParams(window.location.search)
        const sid = urlParams.get('sid')

        axios.get(axios.defaults.baseURL + '/sessions/getIdentity', { params: { sid: sid, user: loggedUser.userID } })
            .then(response => {
                console.log(response)
                if (response.data == 'Session Lost') {
                    router.push({ path: '/pripojeni-do-hry' })
                    return
                }

                if (response.data == "Not In Session") {
                    router.push({ path: '/pripojeni-do-hry' })
                }

                if (response.data == "Is Owner") {
                    setUserIdentityState("Owner")
                    return
                }

                if (response.data != null) {
                    setUserIdentityState(response.data)
                }

                //socketsResyncPlayers();
                resyncPlayers();
            })
            .catch({})



    }, [])

    //Nejak prefaktorovat
    function resyncPlayers() {
        console.log("Proběhne resync hráčů")
        axios.get(axios.defaults.baseURL + '/sessions/sessionPlayers', { params: { sid: sid } })
            .then(response => {
                setPlayer1State({ ...player1State, owner: response.data[0].owner, adventurerID: response.data[0].adventurer })
                axios.get(axios.defaults.baseURL + '/character/sessionAdventurers', { params: { adventurer1: response.data[0].adventurer, adventurer2: response.data[1].adventurer, adventurer3: response.data[2].adventurer } })
                    .then(response => {
                        setPlayer1State({ ...player1State, adventurer: response.data[0] })
                        console.log(response)
                        setPlayer1State({ ...player1State, adventurer: response.data[0] })
                        setPlayer1State({ ...player1State, adventurer: response.data[0] })
                        //getLog()
                    })
            })
    }


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

            <GameAdventurersDisplay player1State={player1State} ></GameAdventurersDisplay>

            {renderHUD()}
        </div>
    )
}

export default Game