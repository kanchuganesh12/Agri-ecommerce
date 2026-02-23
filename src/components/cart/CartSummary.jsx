import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartSubtotal, selectCartCount, applyCoupon, removeCoupon } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/helpers';

const COUPONS = { KISAN10: 50, AGRO20: 100, BIGHAAT: 75 };

const CartSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subtotal = useSelector(selectCartSubtotal);
    const count = useSelector(selectCartCount);
    const { coupon, discount } = useSelector((s) => s.cart);
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');

    const shipping = subtotal > 499 ? 0 : 40;
    const total = subtotal - discount + shipping;

    const handleCoupon = () => {
        const code = couponInput.trim().toUpperCase();
        if (COUPONS[code]) {
            dispatch(applyCoupon({ code, discount: COUPONS[code] }));
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
        }
    };

    return (
        <div className="bh-cart-summary">
            <h3 className="bh-cart-summary-title">Order Summary</h3>
            <div className="bh-summary-row">
                <span>Subtotal ({count} items)</span>
                <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
                <div className="bh-summary-row bh-summary-discount">
                    <span>Coupon Discount ({coupon})</span>
                    <span>−{formatPrice(discount)}</span>
                </div>
            )}
            <div className="bh-summary-row">
                <span>Delivery</span>
                <span className={shipping === 0 ? 'bh-free-ship' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            {subtotal < 499 && (
                <p className="bh-ship-nudge">Add {formatPrice(499 - subtotal)} more for free delivery!</p>
            )}
            <div className="bh-summary-divider" />
            <div className="bh-summary-row bh-summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
            </div>

            {/* Coupon */}
            {!coupon ? (
                <div className="bh-coupon-wrap">
                    <input
                        className="bh-coupon-input"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                    />
                    <button className="bh-coupon-btn" onClick={handleCoupon}>Apply</button>
                    {couponError && <p className="bh-coupon-err">{couponError}</p>}
                    <p className="bh-coupon-hint">Try: KISAN10, AGRO20, BIGHAAT</p>
                </div>
            ) : (
                <div className="bh-coupon-applied">
                    <span>✅ {coupon} applied</span>
                    <button onClick={() => dispatch(removeCoupon())}>Remove</button>
                </div>
            )}

            <button
                className="bh-checkout-btn"
                onClick={() => navigate('/checkout')}
                disabled={count === 0}
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary;
