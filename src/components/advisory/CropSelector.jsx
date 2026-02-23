import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCrop } from '../../features/advisory/advisorySlice';
import { CROPS } from '../../utils/constants';

const CropSelector = () => {
    const dispatch = useDispatch();
    const selectedCrop = useSelector((s) => s.advisory.selectedCrop);

    return (
        <div className="bh-crop-selector">
            <h3 className="bh-crop-selector-title">Select Your Crop</h3>
            <div className="bh-crop-grid">
                {CROPS.map((crop) => (
                    <button
                        key={crop.slug}
                        className={`bh-crop-btn ${selectedCrop === crop.slug ? 'active' : ''}`}
                        onClick={() => dispatch(setCrop(crop.slug))}
                    >
                        <span className="bh-crop-emoji">{crop.emoji}</span>
                        <span className="bh-crop-name">{crop.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CropSelector;
