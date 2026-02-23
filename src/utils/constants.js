// App Constants
export const APP_NAME = 'Agri-pesticides';
export const CURRENCY = '₹';

export const CATEGORIES = [
    { id: 1, name: 'Seeds', slug: 'seeds', icon: '🌱', color: '#22c55e' },
    { id: 2, name: 'Insecticides', slug: 'insecticides', icon: '🔬', color: '#ef4444' },
    { id: 3, name: 'Nutrients', slug: 'nutrients', icon: '💊', color: '#3b82f6' },
    { id: 4, name: 'Fungicides', slug: 'fungicides', icon: '🍄', color: '#8b5cf6' },
    { id: 5, name: 'Vegetable & Fruit Seeds', slug: 'veg-fruit-seeds', icon: '🥦', color: '#10b981' },
    { id: 6, name: 'Herbicides', slug: 'herbicides', icon: '🌿', color: '#f59e0b' },
    { id: 7, name: 'Growth Promoters', slug: 'growth-promoters', icon: '📈', color: '#06b6d4' },
    { id: 8, name: 'Farm Machinery', slug: 'farm-machinery', icon: '🚜', color: '#64748b' },
    { id: 9, name: 'Flower Seeds', slug: 'flower-seeds', icon: '🌸', color: '#ec4899' },
    { id: 10, name: 'Organic Farming', slug: 'organic', icon: '🌾', color: '#84cc16' },
    { id: 11, name: 'Animal Husbandry', slug: 'animal-husbandry', icon: '🐄', color: '#f97316' },
    { id: 12, name: 'New Arrivals', slug: 'new-arrivals', icon: '✨', color: '#a855f7' },
];

export const NAV_CATEGORIES = [
    { name: 'PESTICIDES', slug: 'crop-protection', megaMenu: false },
    { name: 'SEEDS', slug: 'seeds', megaMenu: false },
    { name: 'SERVICES', slug: 'services', megaMenu: false },
];

export const CROPS = [
    { name: 'Tomato', emoji: '🍅', slug: 'tomato' },
    { name: 'Rice', emoji: '🌾', slug: 'rice' },
    { name: 'Cotton', emoji: '☁️', slug: 'cotton' },
    { name: 'Wheat', emoji: '🌿', slug: 'wheat' },
    { name: 'Onion', emoji: '🧅', slug: 'onion' },
    { name: 'Maize', emoji: '🌽', slug: 'maize' },
    { name: 'Chilli', emoji: '🌶️', slug: 'chilli' },
    { name: 'Pulses', emoji: '🟤', slug: 'pulses' },
];

export const GROWTH_STAGES = ['Germination', 'Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest'];

export const PAYMENT_METHODS = [
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
];

export const STATS = [
    { value: '400+', label: 'Brands' },
    { value: '30M+', label: 'Farmers Served' },
    { value: '9K+', label: 'Products' },
    { value: '95%+', label: 'Pincodes Served' },
];

export const SORT_OPTIONS = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Top Rated' },
];
