import React from 'react'

function GameMap(props) {

    const generateMapLink = () =>{
        return "http://localhost:3001/backgrounds/"+props.gameState.map
    }

    return (
        <div className='z-0 p-8'>
            <div className=" shadow-xl px-[5%] py-5 bg-secondary h-[90%] card card-compact bg-base-100">
                <figure>
                    <img
                    className='w-[90%] h-[90%]'
                        src={generateMapLink()}
                        alt="Herní mapa" />
                </figure>

            </div>
        </div>
    )
}

export default GameMap