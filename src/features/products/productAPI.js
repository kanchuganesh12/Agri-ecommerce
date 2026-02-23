import axiosInstance from '../../services/axiosInstance';
import API from '../../services/apiEndpoints';

export const fetchProducts = async (params) => {
    const { data } = await axiosInstance.get(API.PRODUCTS, { params });
    return data;
};

export const fetchProductById = async (id) => {
    const { data } = await axiosInstance.get(API.PRODUCT_DETAIL(id));
    return data;
};

export const fetchTrendingProducts = async () => {
    const { data } = await axiosInstance.get(API.TRENDING_PRODUCTS);
    return data;
};

export const fetchFeaturedProducts = async () => {
    const { data } = await axiosInstance.get(API.FEATURED_PRODUCTS);
    return data;
};

export const fetchProductReviews = async (id) => {
    const { data } = await axiosInstance.get(API.PRODUCT_REVIEWS(id));
    return data;
};
