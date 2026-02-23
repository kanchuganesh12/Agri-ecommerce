import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import API from '../../services/apiEndpoints';

const MOCK_ORDERS = [
    { id: 'BH20240101', date: '2024-01-15', status: 'Delivered', total: 1249, items: [{ name: 'Coragen Insecticide', qty: 2, price: 129 }, { name: 'Saaf Fungicide', qty: 5, price: 89 }] },
    { id: 'BH20240215', date: '2024-02-08', status: 'Shipped', total: 770, items: [{ name: 'Janatha Amino Pro', qty: 1, price: 770 }] },
    { id: 'BH20240320', date: '2024-03-02', status: 'Processing', total: 449, items: [{ name: 'TAPAS VitaInject', qty: 1, price: 449 }] },
];

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(API.ORDERS);
        return data;
    } catch {
        return MOCK_ORDERS;
    }
});

export const placeOrder = createAsyncThunk('orders/place', async (orderData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(API.PLACE_ORDER, orderData);
        return data;
    } catch (err) {
        // Simulate success
        return {
            id: `BH${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
            total: orderData.total,
            items: orderData.items,
        };
    }
});

const STATUS_COLORS = { Delivered: '#22c55e', Shipped: '#3b82f6', Processing: '#f59e0b', Cancelled: '#ef4444' };

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        selectedOrder: null,
        loading: false,
        error: null,
        lastPlacedOrder: null,
    },
    reducers: {
        selectOrder(state, action) { state.selectedOrder = action.payload; },
        clearLastOrder(state) { state.lastPlacedOrder = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(placeOrder.fulfilled, (state, action) => { state.items.unshift(action.payload); state.lastPlacedOrder = action.payload; });
    },
});

export const { selectOrder, clearLastOrder } = orderSlice.actions;
export { STATUS_COLORS };
export default orderSlice.reducer;
