import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('bighaat_cart')) || [];
    } catch {
        return [];
    }
};

const saveCart = (items) => {
    localStorage.setItem('bighaat_cart', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(),
        coupon: null,
        discount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id && i.size === product.size);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            saveCart(state.items);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(
                (i) => !(i.id === action.payload.id && i.size === action.payload.size)
            );
            saveCart(state.items);
        },
        updateQuantity(state, action) {
            const { id, size, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id && i.size === size);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
            saveCart(state.items);
        },
        clearCart(state) {
            state.items = [];
            state.coupon = null;
            state.discount = 0;
            localStorage.removeItem('bighaat_cart');
        },
        applyCoupon(state, action) {
            state.coupon = action.payload.code;
            state.discount = action.payload.discount;
        },
        removeCoupon(state) {
            state.coupon = null;
            state.discount = 0;
        },
    },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartTotal = (state) => {
    const subtotal = selectCartSubtotal(state);
    return subtotal - state.cart.discount;
};

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } = cartSlice.actions;
export default cartSlice.reducer;
