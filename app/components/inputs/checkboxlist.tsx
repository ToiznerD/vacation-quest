'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';


interface Props {
    id: string;
    label: string;
    disabled?: boolean;
    onUpdate: (value: any) => void;
    value?: { value: string; label: string }[];
    list?: {value: string, label: string}[];
}

const MultiSelectInput = ({ id, label, disabled, onUpdate, value = [], list }: Props) => {
    const [options, setOptions] = useState(list);
    const [selectedOptions, setSelectedOptions] = useState(value);


    const handleChange = (selected: any) => {
        setSelectedOptions(selected || []);
        onUpdate(selected.map((s: any) => s.value) || []);
    };

    useEffect(() => {
        setOptions(list);
    }, [list])

    return (
        <div className="relative w-full">
            <Select
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={options}
                isDisabled={disabled}
                placeholder={label}
                className="mt-1 z-50"
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                menuPlacement="auto"  // Automatically adjust the placement
                menuPortalTarget={document.body}  // Render the dropdown menu in the body
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),  // Ensure the menu is above other components
                    control: (base) => ({ ...base, zIndex: 1 }),  // Ensure the control (input box) is above other components
                }}
            />
        </div>
    );
};

export default MultiSelectInput;
