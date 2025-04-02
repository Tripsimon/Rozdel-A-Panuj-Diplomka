import React from 'react'

function GameMap(props) {

    const renderLocality = () => {

    }

    const displayBoard = () => {
        const squares = [];
        props.gameFightLocalityState.map.forEach((heightItem, indexi) => {
            const row = [];
            heightItem.forEach((rowItem, indexj) => {
                row.push(<div key={`${indexi}-${indexj}`} id={"place-" + indexi + "-" + indexj} className={`${returnLocalityColor(rowItem)} w-[25px] h-[25px] m-0.5`} ></div>);
            })
            squares.push(
                <div key={indexi} className='flex'>
                    {row}
                </div>
            );
        });

        return squares;
    }

    const returnLocalityColor = (key) => {
        switch (key) {
            case 1:
                return 'bg-black'

            case 2:
                return 'bg-yellow-700'

            case 3:
                return 'bg-blue-700'

            default:
                return 'bg-white'
        }
    }
    return (
        <div className='mb-[10%]'>
            <div className=" flex shadow-xl px-[5%] bg-secondary h-[90%] card card-compact bg-base-100">
                <div className='justify-center'>                {displayBoard()}</div>

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