import React from 'react'
import Icon from '@mdi/react';
import { mdiSwapHorizontal, mdiMapLegend, mdiAlertCircleOutline } from '@mdi/js';
import GameHudSlovotepecMapModal from './GameHudSlovotepecMapModal';
import GameHudSlovotepecLocalityModal from './GameHudSlovotepecLocalityModal';

function GameHudSlovotepec(props) {
    return (
        <>
            <GameHudSlovotepecLocalityModal></GameHudSlovotepecLocalityModal>
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
                    <Icon path={mdiAlertCircleOutline} size={1} />
                    <span className="text-primary">Nepřátelé</span>
                </button>
                <button onClick={() => document.getElementById('GameHudSlovotepecMapModal').showModal()} >
                    <Icon path={mdiMapLegend} size={1} />
                    <span className="text-primary">Mapy</span>
                </button>
                <button onClick={() => document.getElementById('GameHudSlovotepecLocalityModal').showModal()} >
                    <Icon path={mdiMapLegend} size={1} />
                    <span className="text-primary">Lokality</span>
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