import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, selectFilters } from '../../features/products/productSlice';
import { CROPS, SORT_OPTIONS } from '../../utils/constants';

const BRANDS = ['All', 'Bayer', 'BASF', 'UPL', 'Syngenta', 'PI Industries', 'FMC', 'Katyayani', 'VNR', 'Tapas'];
const CATEGORIES = ['All', 'insecticides', 'fungicides', 'herbicides', 'nutrients', 'seeds', 'growth-promoters'];

const ProductFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const update = (key, val) => dispatch(setFilters({ [key]: val }));

    return (
        <div className="bh-filters">
            <div className="bh-filters-header">
                <h3>Filters</h3>
                <button className="bh-filters-clear" onClick={() => dispatch(clearFilters())}>Clear All</button>
            </div>

            {/* Sort */}
            <div className="bh-filter-group">
                <label className="bh-filter-label">Sort By</label>
                <select className="bh-filter-select" value={filters.sort} onChange={(e) => update('sort', e.target.value)}>
                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>

            {/* Crop */}
            <div className="bh-filter-group">
                <label className="bh-filter-label">Crop</label>
                <div className="bh-filter-crop-list">
                    <button
                        className={`bh-filter-crop-btn ${!filters.crop ? 'active' : ''}`}
                        onClick={() => update('crop', '')}
                    >All</button>
                    {CROPS.map((c) => (
                        <button
                            key={c.slug}
                            className={`bh-filter-crop-btn ${filters.crop === c.slug ? 'active' : ''}`}
                            onClick={() => update('crop', c.slug)}
                        >
                            {c.emoji} {c.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div className="bh-filter-group">
                <label className="bh-filter-label">Category</label>
                {CATEGORIES.map((cat) => (
                    <label key={cat} className="bh-filter-radio">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === (cat === 'All' ? '' : cat)}
                            onChange={() => update('category', cat === 'All' ? '' : cat)}
                        />
                        <span>{cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}</span>
                    </label>
                ))}
            </div>

            {/* Brand */}
            <div className="bh-filter-group">
                <label className="bh-filter-label">Brand</label>
                {BRANDS.map((b) => (
                    <label key={b} className="bh-filter-radio">
                        <input
                            type="radio"
                            name="brand"
                            checked={filters.brand === (b === 'All' ? '' : b)}
                            onChange={() => update('brand', b === 'All' ? '' : b)}
                        />
                        <span>{b}</span>
                    </label>
                ))}
            </div>

            {/* Price Range */}
            <div className="bh-filter-group">
                <label className="bh-filter-label">Price Range: ₹{filters.priceMin} – ₹{filters.priceMax}</label>
                <input
                    type="range"
                    min={0}
                    max={10000}
                    step={50}
                    value={filters.priceMax}
                    onChange={(e) => update('priceMax', Number(e.target.value))}
                    className="bh-price-slider"
                />
            </div>
        </div>
    );
};

export default ProductFilters;
