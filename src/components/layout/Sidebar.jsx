import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiShoppingCart, FiBarChart2, FiPackage, FiUser, FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const MENU = [
    { label: 'Home', path: '/', icon: <FiHome /> },
    { label: 'Products', path: '/products', icon: <FiGrid /> },
    { label: 'Cart', path: '/cart', icon: <FiShoppingCart /> },
    { label: 'Crop Advisory', path: '/dashboard', icon: <FiBarChart2 /> },
    { label: 'My Orders', path: '/orders', icon: <FiPackage /> },
];

const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((s) => s.auth);

    return (
        <aside className="bh-sidebar">
            <div className="bh-sidebar-user">
                <div className="bh-sidebar-avatar"><FiUser /></div>
                <p className="bh-sidebar-name">{isAuthenticated ? user?.name || 'Farmer' : 'Guest'}</p>
            </div>
            <nav className="bh-sidebar-nav">
                {MENU.map((m) => (
                    <Link key={m.path} to={m.path} className={`bh-sidebar-link ${location.pathname === m.path ? 'active' : ''}`}>
                        {m.icon} <span>{m.label}</span>
                    </Link>
                ))}
                {isAuthenticated && (
                    <button className="bh-sidebar-link" onClick={() => dispatch(logout())}>
                        <FiLogOut /> <span>Logout</span>
                    </button>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
