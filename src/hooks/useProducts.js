import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchTrending, fetchFeatured, setFilters, clearFilters, selectAllProducts, selectTrending, selectFeatured, selectProductsLoading, selectFilters } from '../features/products/productSlice';

const useProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const trending = useSelector(selectTrending);
    const featured = useSelector(selectFeatured);
    const loading = useSelector(selectProductsLoading);
    const filters = useSelector(selectFilters);

    const loadProducts = (params) => dispatch(fetchProducts(params));
    const loadTrending = () => dispatch(fetchTrending());
    const loadFeatured = () => dispatch(fetchFeatured());
    const updateFilters = (newFilters) => dispatch(setFilters(newFilters));
    const resetFilters = () => dispatch(clearFilters());

    return { products, trending, featured, loading, filters, loadProducts, loadTrending, loadFeatured, updateFilters, resetFilters };
};

export default useProducts;
