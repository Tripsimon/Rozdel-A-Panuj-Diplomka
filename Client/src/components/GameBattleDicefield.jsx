import React from 'react'

function GameBattleDicefield() {
    return (
        <div className='grid grid-cols-3 bg-secondary mx-[5%] card'>
            <div className='flex justify-center'>
                <h3 className='text-primary'>Dobrodruh</h3>
            </div>
            <div className='flex justify-center'>
                <h3 className='text-primary'>Kostka</h3>
            </div>
            <div className='flex justify-center'>
                <h3 className='text-primary' >Nepřítel</h3>
            </div>
        </div>
    )
}

export default GameBattleDicefield