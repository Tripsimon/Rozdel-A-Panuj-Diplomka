import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { reduxReturnUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import GameHudAdventurer from '../components/GameHudAdventurer'
import GameHudSlovotepec from '../components/GameHudSlovotepec'
import GameMap from "../components/GameMap"
import GameBattleLocality from "../components/GameBattleLocality"
import GameBattleSequencer from '../components/GameBattleSequencer'
import GameAdventurersDisplay from '../components/GameAdventurersDisplay'

import { io } from "socket.io-client";

import axios from 'axios'
import GameLogModal from '../components/GameLogModal';
import GameActiveEnemiesDisplay from '../components/GameActiveEnemiesDisplay';
import GameBattleDicefield from '../components/GameBattleDicefield';

function Game() {
    const loggedUser = useSelector(reduxReturnUser)
    const navigate = useNavigate();

    let urlParams = new URLSearchParams(window.location.search)
    const sid = urlParams.get('sid')
    const [userIdentityState, setUserIdentityState] = useState('user')

    const webSocket = io("http://localhost:3001/");

    const [player1State, setPlayer1State] = useState({ owner: null, adventurer: null, adventurerID: null })
    const [player2State, setPlayer2State] = useState({ owner: null, adventurer: null, adventurerID: null })
    const [player3State, setPlayer3State] = useState({ owner: null, adventurer: null, adventurerID: null })
    const [activeMonstersState, setActiveMonstersState] = useState([])

    const [sessionLogState, setSessionLogState] = useState("")


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

        socketsJoinRoom()

        let urlParams = new URLSearchParams(window.location.search)
        const sid = urlParams.get('sid')

        axios.get(axios.defaults.baseURL + '/sessions/getIdentity', { params: { sid: sid, user: loggedUser.userID } })
            .then(response => {
                if (response.data == 'Session Lost') {
                    navigate("/")
                    return
                }

                if (response.data == "Not In Session") {
                    navigate("/")
                    return
                }

                if (response.data == "Is Owner") {
                    setUserIdentityState("Owner")
                    resyncPlayers()
                    return
                }

                if (response.data != null) {
                    setUserIdentityState(response.data)
                    resyncPlayers()
                    return
                }



            }).catch((err) => { console.log("Chyba při získání identity:", err) })


        webSocket.on('connect', () => {
            console.log('Websocket servis připojen')
            socketsJoinRoom()
        })

        //Připojení hráče
        webSocket.on('resyncPlayers', () => {
            resyncPlayers();
            getLog()
        })

        webSocket.on('disconnectedUser', (identity) => {
            if (identity == "Owner") {
                router.push({ path: '/' })
                return
            }
            if (identity != undefined && userIdentityState == "Owner") {
                writeToLog("Odpojil se hráč: " + identity)
                getLog()
            }

            resyncPlayers()
        })

        webSocket.on('connectedUser', () => {
            if (userIdentityState == "Owner") {
                writeToLog("Připojil se nový hráč: ")
                getLog()
            }
            resyncPlayers()
        })

        //Změna herního modu
        webSocket.on('resyncGamemode', (mode) => {
            battleModeSwitch.value = mode;
            getLog()
        })

        webSocket.on('resyncBattle', (data) => {
            dataBoje.value = data
            instance?.proxy?.$forceUpdate();
            getLog()
        })



    }, [])

    function socketsJoinRoom() {
        webSocket.emit('joinRoom', sid, loggedUser.userID)
    }

    /**
 * Resync připojených hráčů a jejich dobrodruhů v dané místnosti
 * 
 */
    function socketsResyncPlayers() {
        webSocket.emit('resyncPlayers', sid.value)
        getLog()
        resyncPlayers()
    }

    //Nejak prefaktorovat
    function resyncPlayers() {
        console.log("Proběhne resync hráčů")
        axios.get(axios.defaults.baseURL + '/sessions/sessionPlayers', { params: { sid: sid } })
            .then(response => {
                setPlayer1State({ ...player1State, owner: response.data[0].owner, adventurerID: response.data[0].adventurer })
                axios.get(axios.defaults.baseURL + '/character/sessionAdventurers', { params: { adventurer1: response.data[0].adventurer, adventurer2: response.data[1].adventurer, adventurer3: response.data[2].adventurer } })
                    .then(response => {
                        setPlayer1State({ ...player1State, adventurer: response.data[0] })
                        setPlayer2State({ ...player2State, adventurer: response.data[1] })
                        setPlayer3State({ ...player3State, adventurer: response.data[2] })
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
                return (<><GameBattleSequencer adventurers={[player1State, player2State, player3State]} activeMonstersState={activeMonstersState}></GameBattleSequencer><GameBattleDicefield adventurers={[player1State, player2State, player3State]} activeMonstersState={activeMonstersState}></GameBattleDicefield><GameBattleLocality gameFightLocalityState={gameFightLocalityState}></GameBattleLocality></>)

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
                return (<GameHudSlovotepec activeMonstersState={activeMonstersState} setActiveMonstersState={setActiveMonstersState} setGameAdventureMapState={setGameAdventureMapState} swapGameMode={swapGameMode}></GameHudSlovotepec>)
                break;
            default:
                break;
        }
    }

    /**
    * Získání session logu
    */
    function getLog() {
        axios.get(axios.defaults.baseURL + '/sessions/getLog', { params: { 'sessionID': sid } })
            .then(queryResponse => {
                setSessionLogState(queryResponse.data)
            })
            .catch()
    }

    return (
        <>
            <GameLogModal sessionLogState={sessionLogState} ></GameLogModal>
            <div className='pb-[5%]'>
                <GameAdventurersDisplay player1State={player1State} player2State={player2State} player3State={player3State} ></GameAdventurersDisplay>
                { activeMonstersState.length > 0 ? <GameActiveEnemiesDisplay activeMonstersState={activeMonstersState}></GameActiveEnemiesDisplay>:""}
                {renderGameMode()}



                {renderHUD()}
            </div>
        </>
    )
}

export default Game