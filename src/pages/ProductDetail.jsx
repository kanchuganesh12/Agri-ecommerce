import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import ProductSpecifications from '../components/product/ProductSpecifications';
import Loader from '../components/common/Loader';
import { formatPrice } from '../utils/helpers';
import { FiShoppingCart, FiHeart, FiStar, FiDownload } from 'react-icons/fi';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading } = useSelector((s) => s.products);
    const [qty, setQty] = useState(1);
    const [addedMsg, setAddedMsg] = useState(false);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: qty }));
        setAddedMsg(true);
        setTimeout(() => setAddedMsg(false), 2500);
    };

    if (loading) return <Loader center size="lg" text="Loading product..." />;
    if (!product) return <div className="bh-container bh-not-found-msg">Product not found. <Link to="/products">Browse all</Link></div>;

    const discount = product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="bh-container bh-product-detail">
            {/* Breadcrumb */}
            <div className="bh-breadcrumb">
                <Link to="/">Home</Link> › <Link to="/products">Products</Link> › <span>{product.name?.slice(0, 30)}…</span>
            </div>

            <div className="bh-detail-layout">
                {/* Left: Image */}
                <div className="bh-detail-image-section">
                    <div className="bh-detail-img-wrap">
                        {discount > 0 && <div className="bh-card-discount" style={{ top: 16, left: 16 }}>{discount}% OFF</div>}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="bh-detail-img"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Product'; }}
                        />
                    </div>
                    <div className="bh-detail-actions-row">
                        <button className="bh-detail-wishlist"><FiHeart /> Wishlist</button>
                        <button className="bh-detail-pdf"><FiDownload /> Download PDF</button>
                    </div>
                </div>

                {/* Right: Info */}
                <div className="bh-detail-info">
                    <p className="bh-detail-brand">{product.brand}</p>
                    <h1 className="bh-detail-name">{product.name}</h1>

                    {/* Rating */}
                    <div className="bh-detail-rating">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar key={s} size={16} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                        ))}
                        <span className="bh-detail-rating-val">{product.rating}</span>
                        <span className="bh-detail-review-count">({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="bh-detail-price-section">
                        <span className="bh-detail-price">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="bh-detail-original">{formatPrice(product.originalPrice)}</span>
                                <span className="bh-detail-save-pct">({discount}% off)</span>
                            </>
                        )}
                    </div>
                    {product.originalPrice > product.price && (
                        <p className="bh-detail-savings">✅ You save: {formatPrice(product.originalPrice - product.price)}</p>
                    )}

                    {/* Size */}
                    <div className="bh-detail-size-row">
                        <label>Size:</label>
                        <select className="bh-card-size-select">
                            <option>{product.size}</option>
                        </select>
                    </div>

                    {/* Qty */}
                    <div className="bh-detail-qty-row">
                        <label>Quantity:</label>
                        <div className="bh-qty-control">
                            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    {addedMsg && <div className="bh-added-msg">✅ Added to cart!</div>}
                    <div className="bh-detail-cta-row">
                        <button className="bh-detail-add-btn" onClick={handleAddToCart}>
                            <FiShoppingCart /> Add to Cart
                        </button>
                        <Link to="/cart" className="bh-detail-buy-btn">Buy Now</Link>
                    </div>

                    {/* Delivery */}
                    <div className="bh-detail-delivery">
                        <p>🚚 <strong>Free delivery</strong> on orders above ₹499</p>
                        <p>⚡ Usually ships in 1–3 business days</p>
                    </div>
                </div>
            </div>

            {/* Tabs: Specs, Usage, Reviews */}
            <div className="bh-detail-tabs">
                <ProductSpecifications product={product} />
            </div>

            {/* Reviews placeholder */}
            <div className="bh-reviews-section">
                <h3>Farmer Reviews</h3>
                <div className="bh-review-card">
                    <div className="bh-review-header">
                        <div className="bh-review-avatar">R</div>
                        <div>
                            <p className="bh-review-name">Ramesh Kumar</p>
                            <div className="bh-card-rating" style={{ display: 'inline-flex' }}>
                                {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} size={12} fill={s <= 5 ? '#f59e0b' : 'none'} stroke="#f59e0b" />)}
                            </div>
                        </div>
                    </div>
                    <p className="bh-review-text">Excellent product! Saw visible results within 7 days of application. Highly recommended for rice farmers.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
