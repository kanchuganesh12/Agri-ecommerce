import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = false,
    icon,
    className = '',
}) => {
    const base = 'bh-btn';
    const variants = {
        primary: 'bh-btn-primary',
        secondary: 'bh-btn-secondary',
        outline: 'bh-btn-outline',
        ghost: 'bh-btn-ghost',
        danger: 'bh-btn-danger',
        orange: 'bh-btn-orange',
    };
    const sizes = { sm: 'bh-btn-sm', md: 'bh-btn-md', lg: 'bh-btn-lg' };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'bh-btn-full' : ''} ${className}`}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
