import React from 'react'
import Icon from '@mdi/react';
import { mdiSwapHorizontal, mdiMapLegend } from '@mdi/js';
import GameHudSlovotepecMapModal from './GameHudSlovotepecMapModal';

function GameHudSlovotepec(props) {
    return (
        <>
        <GameHudSlovotepecMapModal setGameAdventureMapState={props.setGameAdventureMapState}></GameHudSlovotepecMapModal>
            <div className="fixed bottom-0 flex w-[100%] flex-row-nav justify-around bg-secondary ">


                <button className="justify-center active">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex justify-center w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="btm-nav-label">Nepřátelé</span>
                </button>

                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="btm-nav-label">Inventář</span>
                </button>
                <button onClick={() => document.getElementById('GameHudSlovotepecMapModal').showModal()} >
                    <Icon path={mdiMapLegend} size={1} />
                    <span  className="text-primary">Mapy</span>
                </button>
                <button onClick={() => props.swapGameMode()}>
                    <Icon path={mdiSwapHorizontal} size={1} />
                    <span className='text-primary'>Změna herního módu</span>
                </button>
            </div>
        </>
    )
}

export default GameHudSlovotepec