import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { formatPrice, calcDiscount } from '../../utils/helpers';
import Badge from '../common/Badge';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { id, name, brand, price, originalPrice, rating, reviewCount, image, discount, badge, size } = product;
    const pct = discount || calcDiscount(originalPrice, price);

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <Link to={`/product/${id}`} className="bh-product-card">
            {/* Discount Badge */}
            {pct > 0 && (
                <div className="bh-card-discount">{pct}% OFF</div>
            )}
            {/* Wishlist */}
            <button
                className="bh-card-wishlist"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                aria-label="Add to wishlist"
            >
                <FiHeart size={16} />
            </button>

            {/* High Demand badge */}
            {badge === 'High Demand' && (
                <div className="bh-card-high-demand">High Demand 🔴</div>
            )}

            {/* Product Image */}
            <div className="bh-card-img-wrap">
                <img
                    src={image}
                    alt={name}
                    className="bh-card-img"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Product'; }}
                />
            </div>

            {/* Rating */}
            <div className="bh-card-rating">
                <FiStar size={11} fill="#fff" stroke="#fff" />
                <span>{rating}</span>
                <span className="bh-card-review-count">| {reviewCount}</span>
            </div>

            {/* Name */}
            <div className="bh-card-body">
                <p className="bh-card-name">{name}</p>
                <p className="bh-card-brand">{brand}</p>

                {/* Price */}
                <div className="bh-card-price-row">
                    <span className="bh-card-price">{formatPrice(price)}</span>
                    {originalPrice && originalPrice > price && (
                        <span className="bh-card-original-price">{formatPrice(originalPrice)}</span>
                    )}
                </div>
                {originalPrice && originalPrice > price && (
                    <p className="bh-card-savings">✅ Save {formatPrice(originalPrice - price)}</p>
                )}

                {/* Size selector */}
                <div className="bh-card-size-row">
                    <span>Size</span>
                    <select
                        className="bh-card-size-select"
                        defaultValue={size}
                        onClick={(e) => e.preventDefault()}
                    >
                        <option>{size}</option>
                    </select>
                </div>

                {/* Add to cart */}
                <button className="bh-card-add-btn" onClick={handleAddToCart}>
                    <FiShoppingCart size={14} /> Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
