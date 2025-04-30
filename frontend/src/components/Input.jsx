import React, { useState } from 'react';
import SocialIcon from './SocialIcon';

const Input = ({ type, name, value, onChange, placeholder, icon, error }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className="w-full">
            <div className={`border flex items-center gap-2 border-gray-400 p-2 rounded-lg shadow-md transition-all
                 ${error ? 'border-red-500' : 'border-gray-400 '}`}>
                {icon && (
                    <SocialIcon
                        icon={'ri-' + icon + '-fill'}
                    />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent focus:outline-none placeholder:text-gray-300"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    required
                />
            </div>
            {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
            )}
        </div>
    );
};

export default Input;
