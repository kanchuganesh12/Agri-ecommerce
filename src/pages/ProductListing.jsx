import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters, selectAllProducts, selectProductsLoading, selectFilters } from '../features/products/productSlice';
import ProductFilters from '../components/product/ProductFilters';
import ProductGrid from '../components/product/ProductGrid';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const products = useSelector(selectAllProducts);
    const loading = useSelector(selectProductsLoading);
    const filters = useSelector(selectFilters);

    useEffect(() => {
        const crop = searchParams.get('crop') || '';
        const category = searchParams.get('category') || '';
        const q = searchParams.get('q') || '';
        if (crop || category) dispatch(setFilters({ crop, category }));
        dispatch(fetchProducts({ crop, category, q }));
    }, [searchParams, dispatch]);

    // Apply client-side filters
    const filtered = products.filter((p) => {
        if (filters.brand && p.brand !== filters.brand) return false;
        if (filters.priceMax && p.price > filters.priceMax) return false;
        return true;
    });

    return (
        <div className="bh-container bh-listing-layout">
            <aside className="bh-listing-sidebar">
                <ProductFilters />
            </aside>
            <main className="bh-listing-main">
                <div className="bh-listing-header">
                    <h2 className="bh-listing-title">
                        {searchParams.get('category')
                            ? searchParams.get('category').replace(/-/g, ' ').toUpperCase()
                            : searchParams.get('crop')
                                ? `${searchParams.get('crop').toUpperCase()} Products`
                                : 'All Products'}
                    </h2>
                    <p className="bh-listing-count">{filtered.length} products found</p>
                </div>
                <ProductGrid products={filtered} loading={loading} />
            </main>
        </div>
    );
};

export default ProductListing;
