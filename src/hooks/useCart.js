import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart, selectCartItems, selectCartCount, selectCartSubtotal } from '../features/cart/cartSlice';

const useCart = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const count = useSelector(selectCartCount);
    const subtotal = useSelector(selectCartSubtotal);

    const isInCart = (id, size) => items.some((i) => i.id === id && i.size === size);

    return {
        items, count, subtotal,
        isInCart,
        addItem: (product) => dispatch(addToCart(product)),
        removeItem: (id, size) => dispatch(removeFromCart({ id, size })),
        updateQty: (id, size, quantity) => dispatch(updateQuantity({ id, size, quantity })),
        clearAll: () => dispatch(clearCart()),
    };
};

export default useCart;
