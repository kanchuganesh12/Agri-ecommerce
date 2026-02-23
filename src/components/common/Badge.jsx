import React from 'react';

const Badge = ({ children, variant = 'green', size = 'sm', className = '' }) => {
    const variants = {
        green: 'bh-badge-green',
        orange: 'bh-badge-orange',
        red: 'bh-badge-red',
        blue: 'bh-badge-blue',
        yellow: 'bh-badge-yellow',
        gray: 'bh-badge-gray',
    };
    return (
        <span className={`bh-badge ${variants[variant]} bh-badge-${size} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
