import React from 'react'
import Icon from '@mdi/react';
import { mdiSwapHorizontal, mdiMapLegend, mdiAlertCircleOutline, mdiPostOutline } from '@mdi/js';
import GameHudSlovotepecMapModal from './GameHudSlovotepecMapModal';
import GameHudSlovotepecLocalityModal from './GameHudSlovotepecLocalityModal';

function GameHudSlovotepec(props) {
    return (
        <>
            <GameHudSlovotepecLocalityModal></GameHudSlovotepecLocalityModal>
            <GameHudSlovotepecMapModal setGameAdventureMapState={props.setGameAdventureMapState}></GameHudSlovotepecMapModal>
            <div className="fixed bottom-0 flex w-[100%] flex-row-nav justify-around bg-secondary ">


                <button onClick={() => document.getElementById('GameLogModal').showModal()} className="justify-center active">
                    <Icon path={mdiPostOutline} size={1} />
                    <span className="btm-nav-label">Log</span>
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