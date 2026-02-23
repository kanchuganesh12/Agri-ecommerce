import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/helpers';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { id, name, brand, price, originalPrice, image, quantity, size } = item;

    const onRemove = () => dispatch(removeFromCart({ id, size }));
    const onInc = () => dispatch(updateQuantity({ id, size, quantity: quantity + 1 }));
    const onDec = () => {
        if (quantity > 1) dispatch(updateQuantity({ id, size, quantity: quantity - 1 }));
        else onRemove();
    };

    return (
        <div className="bh-cart-item">
            <img src={image} alt={name} className="bh-cart-item-img"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} />
            <div className="bh-cart-item-info">
                <p className="bh-cart-item-name">{name}</p>
                <p className="bh-cart-item-brand">{brand}</p>
                <p className="bh-cart-item-size">Size: {size}</p>
                <div className="bh-cart-item-price-row">
                    <span className="bh-cart-item-price">{formatPrice(price)}</span>
                    {originalPrice && originalPrice > price && (
                        <span className="bh-cart-item-original">{formatPrice(originalPrice)}</span>
                    )}
                </div>
            </div>
            <div className="bh-cart-item-actions">
                <div className="bh-qty-control">
                    <button onClick={onDec}><FiMinus size={13} /></button>
                    <span>{quantity}</span>
                    <button onClick={onInc}><FiPlus size={13} /></button>
                </div>
                <p className="bh-cart-item-subtotal">{formatPrice(price * quantity)}</p>
                <button className="bh-cart-item-remove" onClick={onRemove} aria-label="Remove">
                    <FiTrash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
