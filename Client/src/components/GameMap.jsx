import React from 'react'

function GameMap() {
    return (
        <div className='mb-[10%]'>
            <div className=" shadow-xl px-[5%] bg-secondary h-[90%] card card-compact bg-base-100">
                <figure>
                    <img
                    className='w-[90%] h-[90%]'
                        src="../../public/mapa.png"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Ovládací panel</h2>
                    <p>//TODO, Bojové akce?</p>
                    <div className=" card-actions">
                        <button className="btn btn-error">Utéct z boje</button>
                        <button className="btn btn-warning">Začít boj</button>
                        <button className="btn btn-success">Akce 3</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameMap