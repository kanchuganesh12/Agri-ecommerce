import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/cart/CheckoutForm';
import CartSummary from '../components/cart/CartSummary';
import { placeOrder } from '../features/orders/orderSlice';
import { clearCart, selectCartItems, selectCartSubtotal } from '../features/cart/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);

    const handleOrder = async (formData) => {
        await dispatch(placeOrder({ items, total: subtotal, address: formData, paymentMethod: formData.paymentMethod }));
        dispatch(clearCart());
        navigate('/orders');
    };

    return (
        <div className="bh-container bh-checkout-layout">
            <div className="bh-checkout-form-section">
                <h2 className="bh-page-title">Checkout</h2>
                <CheckoutForm onSubmit={handleOrder} />
            </div>
            <div className="bh-checkout-summary-section">
                <CartSummary />
            </div>
        </div>
    );
};

export default Checkout;
