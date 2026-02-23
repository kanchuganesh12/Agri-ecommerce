import React from 'react';

const Loader = ({ size = 'md', text = '', center = false }) => {
    const sizes = { sm: 20, md: 36, lg: 56 };
    const px = sizes[size];

    return (
        <div className={`bh-loader-wrap ${center ? 'bh-loader-center' : ''}`}>
            <div
                className="bh-loader-spinner"
                style={{ width: px, height: px, borderWidth: size === 'sm' ? 2 : 3 }}
            />
            {text && <p className="bh-loader-text">{text}</p>}
        </div>
    );
};

export default Loader;
