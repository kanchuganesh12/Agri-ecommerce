import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productAPI from './productAPI';

// Mock data for offline development
const MOCK_PRODUCTS = [
    { id: 1, name: 'TAPAS VitaInject Plant Growth Regulator', brand: 'Tapas', price: 449, originalPrice: 700, rating: 4.7, reviewCount: 104, discount: 36, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop', category: 'growth-promoters', crop: 'all', size: '10 ml', badge: 'High Demand' },
    { id: 2, name: 'Biovita Liquid BioFertilizer | Feed Your Soil Today', brand: 'PI Industries', price: 250, originalPrice: 390, rating: 4.4, reviewCount: 668, discount: 36, image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=300&h=300&fit=crop', category: 'nutrients', crop: 'rice', size: '250 ml' },
    { id: 3, name: 'Saaf Fungicide | Stop Fungal Diseases Before They Spread', brand: 'UPL', price: 89, originalPrice: 111, rating: 4.4, reviewCount: 512, discount: 20, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', category: 'fungicides', crop: 'tomato', size: '100 gms' },
    { id: 4, name: 'Janatha Amino Pro – Marine-Based Amino Acid Growth', brand: 'JANATHA AGRO PRODUCTS', price: 770, originalPrice: 950, rating: 4.4, reviewCount: 12, discount: 19, image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&h=300&fit=crop', category: 'nutrients', crop: 'cotton', size: '1 ltr' },
    { id: 5, name: 'Coragen Insecticide – Chlorantraniliprole 18.5% SC', brand: 'FMC', price: 129, originalPrice: 220, rating: 4.4, reviewCount: 388, discount: 41, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop', category: 'insecticides', crop: 'rice', size: '10 ml' },
    { id: 6, name: 'Nativo 75 WG Fungicide (Tebuconazole 50%)', brand: 'Bayer', price: 129, originalPrice: 180, rating: 4.4, reviewCount: 252, discount: 28, image: 'https://images.unsplash.com/photo-1583912372583-b5fc11cd3c11?w=300&h=300&fit=crop', category: 'fungicides', crop: 'wheat', size: '10 gms' },
    { id: 7, name: 'Exponus Insecticide – Broflanilide 300 G/L SC', brand: 'BASF', price: 529, originalPrice: 731, rating: 4.4, reviewCount: 222, discount: 28, image: 'https://images.unsplash.com/photo-1615671524827-bb5ab70f5e2e?w=300&h=300&fit=crop', category: 'insecticides', crop: 'cotton', size: '8.5 ml' },
    { id: 8, name: 'Katyayani Activated Humic Acid and Fulvic Acid 98%', brand: 'Katyayani Organics', price: 760, originalPrice: 1880, rating: 4.4, reviewCount: 470, discount: 60, image: 'https://images.unsplash.com/photo-1602513445165-d7c56e67dae0?w=300&h=300&fit=crop', category: 'nutrients', crop: 'all', size: '1600 gms' },
    { id: 9, name: 'Acrobat Fungicide | Stop Late Blight & Downy Mildew', brand: 'BASF', price: 599, originalPrice: 849, rating: 4.3, reviewCount: 91, discount: 29, image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=300&h=300&fit=crop', category: 'fungicides', crop: 'tomato', size: '100 gms' },
    { id: 10, name: 'Krish F1 Hybrid Cucumber Seeds – High Yield', brand: 'VNR', price: 359, originalPrice: 480, rating: 4.4, reviewCount: 111, discount: 25, image: 'https://images.unsplash.com/photo-1508467543463-4c6b4e93a09a?w=300&h=300&fit=crop', category: 'seeds', crop: 'all', size: '10 gms' },
];

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params, { rejectWithValue }) => {
    try {
        const data = await productAPI.fetchProducts(params);
        return data;
    } catch {
        // Return mock data for development
        let filtered = MOCK_PRODUCTS;
        if (params?.crop && params.crop !== 'all') {
            filtered = MOCK_PRODUCTS.filter(p => p.crop === params.crop || p.crop === 'all');
        }
        if (params?.category) {
            filtered = filtered.filter(p => p.category === params.category);
        }
        return { products: filtered, total: filtered.length };
    }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
    try {
        const data = await productAPI.fetchProductById(id);
        return data;
    } catch {
        return MOCK_PRODUCTS.find(p => p.id === Number(id)) || rejectWithValue('Product not found');
    }
});

export const fetchTrending = createAsyncThunk('products/trending', async (_, { rejectWithValue }) => {
    try {
        return await productAPI.fetchTrendingProducts();
    } catch {
        return MOCK_PRODUCTS.slice(0, 5);
    }
});

export const fetchFeatured = createAsyncThunk('products/featured', async (_, { rejectWithValue }) => {
    try {
        return await productAPI.fetchFeaturedProducts();
    } catch {
        return MOCK_PRODUCTS.slice(5, 10);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        trending: [],
        featured: [],
        selectedProduct: null,
        total: 0,
        loading: false,
        error: null,
        filters: { crop: '', category: '', brand: '', priceMin: 0, priceMax: 10000, sort: 'popularity' },
        searchQuery: '',
    },
    reducers: {
        setFilters(state, action) { state.filters = { ...state.filters, ...action.payload }; },
        setSearch(state, action) { state.searchQuery = action.payload; },
        clearFilters(state) { state.filters = { crop: '', category: '', brand: '', priceMin: 0, priceMax: 10000, sort: 'popularity' }; },
        clearSelected(state) { state.selectedProduct = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.products || action.payload; state.total = action.payload.total || action.payload.length; })
            .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchProductById.pending, (state) => { state.loading = true; })
            .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.selectedProduct = action.payload; })
            .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchTrending.fulfilled, (state, action) => { state.trending = action.payload; })
            .addCase(fetchFeatured.fulfilled, (state, action) => { state.featured = action.payload; });
    },
});

export const { setFilters, setSearch, clearFilters, clearSelected } = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectTrending = (state) => state.products.trending;
export const selectFeatured = (state) => state.products.featured;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectFilters = (state) => state.products.filters;

export default productSlice.reducer;
