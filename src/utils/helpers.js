import { CURRENCY } from './constants';

// Format price in Indian Rupees
export const formatPrice = (price) => `${CURRENCY}${Number(price).toLocaleString('en-IN')}`;

// Calculate discount percentage
export const calcDiscount = (original, current) =>
    Math.round(((original - current) / original) * 100);

// Calculate savings
export const calcSavings = (original, current) => original - current;

// Truncate text
export const truncate = (str, maxLen = 50) =>
    str?.length > maxLen ? str.slice(0, maxLen) + '…' : str;

// Debounce
export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

// Get initials from name
export const getInitials = (name = '') =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

// Generate star rating display
export const starRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= Math.round(rating) ? '★' : '☆');
    }
    return stars.join('');
};

// Capitalize
export const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

// Check if token is valid
export const isTokenValid = () => {
    const token = localStorage.getItem('bighaat_token');
    return !!token;
};

// Group array by key
export const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
        const group = item[key];
        acc[group] = acc[group] ? [...acc[group], item] : [item];
        return acc;
    }, {});

// Deep clone
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
