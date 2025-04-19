import React, { useState } from 'react'
import Select from 'react-select';

function LexiconModal() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("")
    const [selectedText, setSelectedText] = useState("")
    const options = [
        { value: 'prehod', label: 'Přehod kostky' },
        { value: 'omraceni', label: 'Omračení' },
    ];

    const handleChangeText = (value) => {
        setSelectedTitle("")
        setSelectedText("")
        switch (value) {
            case "prehod":
                setSelectedTitle("Přehod kostky")
                setSelectedText("Akce přehození kostky znamená, že po hození kostky se hráč může rozhodnout kostkou hodit znovu. Předešlí výsledek je zapomenut a akce není povinná. Rozhodnutí může přijí až po prvním hodu. V žádněm případě není možné kostku přehodit dvakrá při jedné akci, i kdyby hráč měl víe zdrojů přehození.")
                break;

            default:
                break;
        }
    }

    return (
        <dialog id="lexiconModal" className="modal ">
            <div className="modal-box h-[90vh]">
                <h3 className="text-lg font-bold text-primary">Lexikon</h3>
                <div className="mb-10 divider divider-warning"></div>
                <Select
                    styles={{
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
                    }}
                    className='text-primary'
                    defaultValue={selectedOption}
                    onChange={(e) => { setSelectedOption(e.value); handleChangeText(e.value) }}
                    options={options}
                />
                {selectedTitle != "" ? <div className="w-full px-5 mt-10 shadow-sm bg-secondary card">
                    <div className="items-center text-center card-body">
                        <h2 className="text-2xl card-title text-primary">{selectedTitle}</h2>
                        <div className="mb-5 divider divider-warning"></div>
                        <p className='text-lg'>{selectedText}</p>
                    </div>
                </div>: ""}

                <div className="!relative !bottom-5 mt-10 modal-action">
                    <form method="dialog">
                    <button className="uppercase btn bg-secondary btn-outline hover:bg-primary hover:text-secondary hover:border-backdrop text-primary">Zavřít</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default LexiconModal