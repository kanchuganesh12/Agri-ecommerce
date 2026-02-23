import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartSubtotal } from '../features/cart/cartSlice';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
    const items = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);

    if (!items.length) {
        return (
            <div className="bh-container bh-empty-cart">
                <FiShoppingBag size={80} color="#d1d5db" />
                <h2>Your cart is empty</h2>
                <p>Add products to your cart and they'll show up here.</p>
                <Link to="/products" className="bh-hero-cta">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="bh-container bh-cart-layout">
            <div className="bh-cart-items-section">
                <h2 className="bh-page-title">My Cart ({items.length} items)</h2>
                {items.map((item) => (
                    <CartItem key={`${item.id}-${item.size}`} item={item} />
                ))}
            </div>
            <div className="bh-cart-summary-section">
                <CartSummary />
            </div>
        </div>
    );
};

export default Cart;
