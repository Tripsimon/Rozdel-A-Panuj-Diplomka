import React, { useEffect, useState } from 'react'
import GameBrowserCreateRoomModal from '../components/GameBrowserCreateRoomModal'
import axios from 'axios'
import GameBrowserJoinModal from '../components/GameBrowserJoinModal'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reduxIsLoggedIn, logoutUser, reduxReturnUser, reduxReturnUserAuthority } from '../store/userSlice';

function GameBrowser() {
    const [loadedSessionsState, setLoadedSessionsState] = useState([])
    const [loadedAdventurersState, setLoadedAdventurersState] = useState([])
    const [selectedSessionState, setSelectedSessionState] = useState(false)

    const loggedUser = useSelector(reduxReturnUser)
    const navigate = useNavigate();


    useEffect(() => {
        findSessions()
        getAdventurers()
    }, [])



    const renderSessionsTable = () => {
        return loadedSessionsState.map((session) => <tr key={session._id}><td>{session.sessionName}</td><td>{session.slots}</td><td><button onClick={() => { document.getElementById('gameBrowserJoinModal').showModal(); setSelectedSessionState(session._id) }} >Připojit</button></td></tr>)
    }

    const getAdventurers = () => {

        axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: loggedUser.userID } })
            .then((response) => {
                setLoadedAdventurersState(response.data)
            })

    }

    function findSessions() {
        axios.get(axios.defaults.baseURL + '/sessions/openSessions')
            .then((queryResponse) => {
                setLoadedSessionsState(queryResponse.data)
            })
    }

    const joinSession = (adventurerID, password) => {
        let body = {
            "sessionID": selectedSessionState,
            "password": password,

            "adventurer": adventurerID,
            "player": loggedUser.userID
        }


        axios.post(axios.defaults.baseURL + '/sessions/joinSession', body)
            .then(queryResponse => {
                if (queryResponse.data == 'Session Joined') {
                    navigate("/game?sid="+ selectedSessionState)
                    router.push({ path: '/RaPSession', query: { sid: id } })
                } else if (queryResponse.data == "Name Taken") {

                } else {

                    console.log("Problém při připojení")
                }
            })
    }

    return (
        <>
            <GameBrowserCreateRoomModal></GameBrowserCreateRoomModal>
            <GameBrowserJoinModal loadedAdventurersState={loadedAdventurersState} joinSession={joinSession} ></GameBrowserJoinModal>
            <div>
                <div className="card bg-neutral text-neutral-content w-[90%] ml-[5%]">
                    <div className="items-center text-center card-body">
                        <h1 className="card-title text-primary"> Seznam aktivních her</h1>
                        <div className="overflow-x-auto">

                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Jméno</th>
                                        <th>Počet místo</th>
                                        <th>Akce</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderSessionsTable()}
                                </tbody>
                            </table>
                        </div>
                        <div className="justify-end card-actions">
                            <a onClick={() => document.getElementById('gameBrowserCreateRoomModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit herní místnost</a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default GameBrowser