import React, { useState } from 'react';

const Input = ({ type, name, value, onChange, placeholder, icon, error }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className="w-full">
            <div className={`border flex items-center gap-2 border-gray-400 p-2 bg-gray-100 rounded-lg shadow-md transition-all
                ${isFocus ? 'ring-2 ring-yellow-400' : ''}`}>
                {icon && (
                    <i className={`ri-${icon}-fill text-gray-500 text-lg`}></i>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent focus:outline-none text-gray-700"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                />
            </div>
            {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
            )}
        </div>
    );
};

export default Input;
