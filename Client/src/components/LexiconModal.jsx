import React, { useState } from 'react'
import Select from 'react-select';

function LexiconModal() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'prehod', label: 'Přehod kostky' },
    ];

    return (
        <dialog id="lexiconModal" className="modal ">
            <div className="modal-box h-[90vh]">
                <h3 className="text-lg font-bold text-primary">Lexikon</h3>
                <div className="divider divider-warning"></div>
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
                        })
                    }}
                    className='text-primary'
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />

                
            </div>
        </dialog>
    )
}

export default LexiconModal