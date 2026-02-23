import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    FiSearch, FiShoppingCart, FiHeart, FiUser, FiPackage,
    FiChevronDown, FiMenu, FiX, FiPhone
} from 'react-icons/fi';
import { selectCartCount } from '../../features/cart/cartSlice';
import { logout } from '../../features/auth/authSlice';
import { setSearch } from '../../features/products/productSlice';
import { NAV_CATEGORIES, APP_NAME } from '../../utils/constants';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartCount = useSelector(selectCartCount);
    const { isAuthenticated, user } = useSelector((s) => s.auth);
    const [searchVal, setSearchVal] = useState('');
    const [activeMega, setActiveMega] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const megaRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchVal));
        navigate(`/products?q=${encodeURIComponent(searchVal)}`);
    };

    useEffect(() => {
        const handler = (e) => {
            if (megaRef.current && !megaRef.current.contains(e.target)) setActiveMega(null);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className="bh-header">
            {/* Top Bar */}
            <div className="bh-topbar">
                <div className="bh-container bh-topbar-inner">
                    <div className="bh-topbar-links">
                        <a href="#">Sell on {APP_NAME}</a>
                        <span>|</span>
                        <a href="#">Bulk Order Inquiries</a>
                        <span>|</span>
                        <a href="#">Corporate Site</a>
                    </div>
                    <a href="tel:18003002434" className="bh-topbar-call">
                        <FiPhone size={12} /> Missed Call To Order: 1800-3000-2434
                    </a>
                </div>
            </div>

            {/* Main Header */}
            <div className="bh-header-main">
                <div className="bh-container bh-header-inner">
                    {/* Logo */}
                    <Link to="/" className="bh-logo">
                        <span className="bh-logo-leaf">🌱</span>
                        <span className="bh-logo-text">{APP_NAME}</span>
                    </Link>

                    {/* Search */}
                    <form className="bh-search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="bh-search-input"
                            placeholder="Search products..."
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                        />
                        <button type="submit" className="bh-search-btn">
                            <FiSearch size={18} />
                        </button>
                    </form>

                    {/* Actions */}
                    <div className="bh-header-actions">
                        <Link to="/products" className="bh-action-item" title="Track Order">
                            <FiPackage size={20} />
                            <span>Track Order</span>
                        </Link>
                        <Link to="/wishlist" className="bh-action-item" title="Wishlist">
                            <FiHeart size={20} />
                            <span>Wishlist</span>
                        </Link>

                        {/* User Menu */}
                        <div className="bh-action-item bh-user-menu-wrap" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                            <FiUser size={20} />
                            <span>{isAuthenticated ? user?.name?.split(' ')[0] || 'Account' : 'Login'}</span>
                            {userMenuOpen && (
                                <div className="bh-user-dropdown">
                                    {isAuthenticated ? (
                                        <>
                                            <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}>My Dashboard</Link>
                                            <Link to="/orders" onClick={() => setUserMenuOpen(false)}>My Orders</Link>
                                            <button onClick={() => { dispatch(logout()); setUserMenuOpen(false); navigate('/'); }}>Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" onClick={() => setUserMenuOpen(false)}>Login</Link>
                                            <Link to="/register" onClick={() => setUserMenuOpen(false)}>Register</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="bh-action-item bh-cart-action">
                            <div className="bh-cart-icon-wrap">
                                <FiShoppingCart size={20} />
                                {cartCount > 0 && <span className="bh-cart-badge">{cartCount}</span>}
                            </div>
                            <span>Cart</span>
                        </Link>

                        {/* Mobile toggle */}
                        <button className="bh-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Nav Bar */}
            <nav className="bh-navbar" ref={megaRef}>
                <div className="bh-container">
                    <ul className={`bh-nav-list ${mobileOpen ? 'mobile-open' : ''}`}>
                        {NAV_CATEGORIES.map((cat) => (
                            <li
                                key={cat.name}
                                className="bh-nav-item"
                                onMouseEnter={() => cat.megaMenu && setActiveMega(cat.slug)}
                                onMouseLeave={() => setActiveMega(null)}
                            >
                                <Link
                                    to={`/products?category=${cat.slug}`}
                                    className={`bh-nav-link ${activeMega === cat.slug ? 'active' : ''}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {cat.name}
                                    {cat.megaMenu && <FiChevronDown size={12} />}
                                </Link>

                                {cat.megaMenu && activeMega === cat.slug && (
                                    <div className="bh-mega-menu">
                                        <div className="bh-container bh-mega-inner">
                                            {cat.columns?.map((col) => (
                                                <div key={col.title} className="bh-mega-col">
                                                    <h4 className="bh-mega-col-title">{col.title}</h4>
                                                    <ul>
                                                        {col.items.map((item) => (
                                                            <li key={item}>
                                                                <Link
                                                                    to={`/products?category=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    className="bh-mega-link"
                                                                    onClick={() => setActiveMega(null)}
                                                                >
                                                                    {item}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
