const API = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',

    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id) => `/products/${id}`,
    PRODUCT_REVIEWS: (id) => `/products/${id}/reviews`,
    FEATURED_PRODUCTS: '/products/featured',
    TRENDING_PRODUCTS: '/products/trending',

    // Categories
    CATEGORIES: '/categories',

    // Cart
    CART: '/cart',
    ADD_TO_CART: '/cart/add',
    REMOVE_FROM_CART: (id) => `/cart/remove/${id}`,
    UPDATE_CART: (id) => `/cart/update/${id}`,
    CLEAR_CART: '/cart/clear',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id) => `/orders/${id}`,
    PLACE_ORDER: '/orders/place',

    // Advisory
    ADVISORY: '/advisory',
    CROP_STAGES: (crop) => `/advisory/stages/${crop}`,
    PEST_ALERTS: (crop) => `/advisory/pests/${crop}`,
    SPRAY_SCHEDULE: '/advisory/spray-schedule',

    // Wishlist
    WISHLIST: '/wishlist',
    ADD_WISHLIST: '/wishlist/add',
    REMOVE_WISHLIST: (id) => `/wishlist/remove/${id}`,
};

export default API;
