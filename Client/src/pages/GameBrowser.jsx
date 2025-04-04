import React from 'react'
import GameBrowserCreateRoomModal from '../components/GameBrowserCreateRoomModal'

function GameBrowser() {

    const renderRoomsTable = () =>{
        
    }

    return (
        <>
        <GameBrowserCreateRoomModal></GameBrowserCreateRoomModal>
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
                                        <th>Popis</th>
                                        <th>Typ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRoomsTable()}
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