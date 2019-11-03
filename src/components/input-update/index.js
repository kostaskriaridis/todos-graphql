import React, { useState, useRef, useEffect } from 'react';

const ETNER_KEY_CODE = 13;

export default function InputUpdate({ name, value, className, onChangeValue }) {
    const inputNode = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditing) {
            inputNode.current.focus();
            inputNode.current.setSelectionRange(0, inputNode.current.value.length);
        }
    }, [isEditing]);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleBlur() {
        const inputValue = inputNode.current.value.trim();

        if (inputNode && inputValue !== value) {
            onChangeValue({
                name,
                value: inputValue
            });
        }

        setIsEditing(false);
    }

    function handleKeyDown(event) {
        if (event.keyCode === ETNER_KEY_CODE) {
            handleBlur();
        }
    }

    if (isEditing) {
        return (
            <input
                ref={inputNode}
                type='text'
                name={name}
                defaultValue={value}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown} />
        );
    }

    return (
        <span className={className} onDoubleClick={handleEdit}>
            {value}
        </span>
    );
}
