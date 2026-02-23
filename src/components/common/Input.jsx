import React from 'react';

const Input = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    icon,
    className = '',
}) => {
    return (
        <div className={`bh-input-wrapper ${className}`}>
            {label && (
                <label htmlFor={name} className="bh-input-label">
                    {label} {required && <span className="text-red">*</span>}
                </label>
            )}
            <div className="bh-input-field-wrap">
                {icon && <span className="bh-input-icon">{icon}</span>}
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`bh-input ${icon ? 'with-icon' : ''} ${error ? 'bh-input-error' : ''}`}
                />
            </div>
            {error && <p className="bh-input-err-msg">{error}</p>}
        </div>
    );
};

export default Input;
