import React from 'react';

const ProductSpecifications = ({ product }) => {
    if (!product) return null;
    const specs = product.specifications || [
        { label: 'Technical Name', value: product.technicalName || 'Available in product description' },
        { label: 'Category', value: product.category || 'Agricultural Input' },
        { label: 'Brand', value: product.brand || '—' },
        { label: 'Dosage', value: product.dosage || '2ml per litre of water' },
        { label: 'Target Crop', value: product.crop || 'All crops' },
        { label: 'Target Pest/Disease', value: product.target || 'Multiple pests' },
        { label: 'Formulation', value: product.formulation || 'SC (Suspension Concentrate)' },
        { label: 'Available Sizes', value: product.size || '10ml, 100ml, 250ml, 500ml' },
    ];
    return (
        <div className="bh-specs">
            <h3 className="bh-specs-title">Product Specifications</h3>
            <table className="bh-specs-table">
                <tbody>
                    {specs.map((s) => (
                        <tr key={s.label}>
                            <td className="bh-spec-key">{s.label}</td>
                            <td className="bh-spec-val">{s.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductSpecifications;
