import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="bh-container bh-not-found">
        <div className="bh-not-found-emoji">🌾</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="bh-hero-cta">Go to Home</Link>
    </div>
);

export default NotFound;
