import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios'

function GameMap(props) {
    const [selectedLocality, setSelectedLocality] = useState(null)
    const [loadedLocalitiesState, setLoadedLocalitiesState] = useState([])

    const [loadedPlaceEntries, setLoadedPlaceEntriesState] = useState([])
    const [selectedPlaceEntry, setSelectedPlaceEntry] = useState(null)


    useEffect(() => {
        loadLocalities()
        loadPlaceEntries()
    }, [])

    useEffect(() => {
        loadLocalities()
        loadPlaceEntries()
    }, [props.activeMonstersState])


    const loadLocalities = () => {
        axios.get(axios.defaults.baseURL + '/locality/getLocalities')
            .then(queryResponse => {
                var loader = []
                if (queryResponse.data == null) { return }
                queryResponse.data.forEach(element => {
                    if (element == null) { return }
                    loader.push({ label: element.name, value: element })
                });
                setLoadedLocalitiesState(loader)
            })
    }

    const loadPlaceEntries = () => {
        var loader = []
        if (props.adventurers == null) {
        } else {


            props.adventurers.forEach((element, index) => {
                if (element.adventurer == null) { return }
                var item = element.adventurer;
                item.symbol = "A-" + (index + 1)
                loader.push({ label: getAdventurerName(element.adventurer), value: item })
            });
        }
        if (props.activeMonstersState == null) {
        } else {
            props.activeMonstersState.forEach((element, index) => {
                if (element == null) { return }
                var item = element;
                item.symbol = "E-"+(index + 1)
                loader.push({ label: element.name, value: element })
            });
        }

        setLoadedPlaceEntriesState(loader)

    }

    function getAdventurerName(adventurer) {
        let name = adventurer.krestniJmeno
        if (adventurer.prezdivka != null) {
            name = name + ' "' + adventurer.prezdivka + '" '
        }
        name = name + adventurer.prijmeni
        return name
    }



    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#001D3D",
            color: "yellow",
            width: "100%"
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "#001D3D",

        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: "#b49306",

        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#b49306' : '#001D3D',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
        dropdownindicatorSeparatorIndicator: (provided, state) => ({
            ...provided,
            color: '#b49306',
        }),
    }

    const handleSquareClick = (i,j) =>{
        if (selectedPlaceEntry == null) { return }
        var loader = selectedLocality

        for(var ii = 0; ii < loader.map.length; ii++){
            for(var jj = 0; jj < loader.map[ii].length; jj++){
                if(loader.map[ii][jj] == selectedPlaceEntry.symbol){
                    loader.map[ii][jj] = 0;
                }
            }
        }
        loader.map[i][j] = selectedPlaceEntry.symbol
        setSelectedLocality({...loader})
    }

    const displayBoard = () => {
        if (selectedLocality == null) { return }
        const squares = [];
        selectedLocality.map.forEach((heightItem, indexi) => {
            const row = [];
            heightItem.forEach((rowItem, indexj) => {
                row.push(renderDisplayPixel(rowItem ,indexi,indexj));
            })
            squares.push(
                <div key={indexi} className='flex'>
                    {row}
                </div>
            );
        });

        return squares;
    }

    const renderDisplayPixel = (rowItem ,indexi, indexj) =>{
        if (rowItem == null) {return}
        if (!isNaN( rowItem )) {
            return( <div onClick={() => handleSquareClick(indexi,indexj)} key={`${indexi}-${indexj}`} id={"place-" + indexi + "-" + indexj} className={`${returnLocalityColor(rowItem)} w-[25px] h-[25px] m-0.5`} ></div>)
        }
        else{
            var type = rowItem.split("-");
            console.log(type)
            return(<div className={"w-[25px] select-none h-[25px] rounded-xl m-0.5 " + (type[0] == "A"? "bg-green-700": "bg-red-700")}><p className='text-xl text-center text-primary'>{type[1]}</p></div>)
        }
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
        <div className='bg-secondary mb-10 mx-[5%] card'>

            <div className="card-body">
                <h2 className="text-2xl card-title text-primary">Bojové pole</h2>
                <div className="divider divider-warning"></div>
                <Select
                    styles={selectStyles}
                    className='text-primary'
                    defaultValue={selectedLocality}
                    onChange={(e) => { setSelectedLocality(e.value)}}
                    options={loadedLocalitiesState}
                    placeholder={"Výběr lokality"}
                />
                <div className='flex justify-center '>

                    <div className='border-2 border-primary'>
                        {displayBoard()}
                    </div>
                </div>

            </div>


            <Select
                styles={selectStyles}
                className='w-fill text-primary'
                defaultValue={selectedLocality}
                onChange={(e) => { setSelectedPlaceEntry(e.value)}}
                options={loadedPlaceEntries}
                placeholder={"Výběr jedince na umístění"}
            />
        </div>
    )
}

export default GameMap