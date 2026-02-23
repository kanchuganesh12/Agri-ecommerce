import React from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products = [], loading = false, emptyMessage = 'No products found.' }) => {
    if (loading) return <Loader size="lg" center text="Loading products..." />;
    if (!products.length) {
        return (
            <div className="bh-empty-state">
                <div className="bh-empty-icon">🌾</div>
                <h3>{emptyMessage}</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        );
    }
    return (
        <div className="bh-product-grid">
            {products.map((product) => (
                <ProductCard key={`${product.id}-${product.size}`} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
