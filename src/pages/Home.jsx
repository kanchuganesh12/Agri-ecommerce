import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrending, fetchFeatured } from '../features/products/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import { CATEGORIES, CROPS } from '../utils/constants';

const BANNERS = [
    { id: 1, title: 'Made with liquid gypsum and beneficial microbes for better growth', subtitle: 'MicroGyp® Forte', cta: 'Buy Now', bg: 'linear-gradient(135deg, #1a4a1a 0%, #2d7d2d 50%, #1a4a1a 100%)', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&h=400&fit=crop' },
    { id: 2, title: 'Monsoon Ready Seeds — Up to 30% Off', subtitle: 'Protect your yield with our certified monsoon varieties', cta: 'Shop Now', bg: 'linear-gradient(135deg, #0f4c0f 0%, #1e7b1e 50%, #2d963c 100%)', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop' },
    { id: 3, title: 'With Our New Arrivals!', subtitle: 'Explore the latest in crop protection and nutrition', cta: 'Shop Now', bg: 'linear-gradient(135deg, #e65c00 0%, #f9d423 100%)', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop' },
];

const KISAN_ARTICLES = [
    { id: 1, title: 'Managing Pink Bollworm in Cotton: A Guide for Farmers', img: 'https://images.unsplash.com/photo-1508467543463-4c6b4e93a09a?w=120&h=80&fit=crop', readTime: '4 min read' },
    { id: 2, title: '5 Secret Irrigation Tips to Save Water and Increase Yield', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=80&fit=crop', readTime: '6 min read' },
];

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bannerIdx, setBannerIdx] = useState(0);
    const { trending, featured, loading } = useSelector((s) => s.products);

    useEffect(() => {
        dispatch(fetchTrending());
        dispatch(fetchFeatured());
    }, [dispatch]);

    // Auto-slide banner
    useEffect(() => {
        const timer = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
        return () => clearInterval(timer);
    }, []);

    const banner = BANNERS[bannerIdx];

    return (
        <div className="bh-home">
            {/* Hero Banner */}
            <div className="bh-hero" style={{ background: banner.bg }}>
                <div className="bh-container bh-hero-inner">
                    <div className="bh-hero-text">
                        <h1 className="bh-hero-title">{banner.title}</h1>
                        <p className="bh-hero-sub">{banner.subtitle}</p>
                        <Link to="/products" className="bh-hero-cta">{banner.cta}</Link>
                    </div>
                    <div className="bh-hero-img">
                        <img src={banner.img} alt={banner.title} />
                    </div>
                </div>
                {/* Dots */}
                <div className="bh-banner-dots">
                    {BANNERS.map((_, i) => (
                        <button
                            key={i}
                            className={`bh-banner-dot ${i === bannerIdx ? 'active' : ''}`}
                            onClick={() => setBannerIdx(i)}
                        />
                    ))}
                </div>

                {/* Trust badges */}
                <div className="bh-trust-badges">
                    <div className="bh-container bh-trust-inner">
                        {['100% Original Products', 'Pan-India Delivery', 'Expert Agri-Advice', 'Easy COD Available'].map((b) => (
                            <div key={b} className="bh-trust-item">✅ {b}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shop by Category */}
            <section className="bh-section">
                <div className="bh-container">
                    <div className="bh-section-header">
                        <h2 className="bh-section-title">Categories</h2>
                    </div>
                    <div className="bh-categories-grid">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                className="bh-cat-item"
                                onClick={() => navigate(`/products?category=${cat.slug}`)}
                            >
                                <div className="bh-cat-circle" style={{ background: `${cat.color}22`, borderColor: `${cat.color}44` }}>
                                    <span className="bh-cat-icon">{cat.icon}</span>
                                </div>
                                <p className="bh-cat-name">{cat.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Crop */}
            <section className="bh-section bh-bg-light">
                <div className="bh-container">
                    <div className="bh-section-header">
                        <h2 className="bh-section-title">Shop by Crop</h2>
                        <Link to="/products" className="bh-view-all">View All</Link>
                    </div>
                    <div className="bh-crop-row">
                        {CROPS.map((crop) => (
                            <button
                                key={crop.slug}
                                className="bh-crop-pill"
                                onClick={() => navigate(`/products?crop=${crop.slug}`)}
                            >
                                <span className="bh-crop-pill-emoji">{crop.emoji}</span>
                                <span>{crop.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Today's Offers */}
            <section className="bh-section">
                <div className="bh-container">
                    <div className="bh-section-header">
                        <div>
                            <h2 className="bh-section-title">Today's Offer ⚡</h2>
                            <p className="bh-section-sub">Best prices available today.</p>
                        </div>
                        <Link to="/products?sort=discount" className="bh-view-all">View All</Link>
                    </div>
                    {loading ? <Loader center /> : (
                        <div className="bh-product-row">
                            {featured.slice(0, 5).map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* Best Selling */}
            <section className="bh-section bh-bg-light">
                <div className="bh-container">
                    <div className="bh-section-header">
                        <div>
                            <h2 className="bh-section-title">Best Selling</h2>
                            <p className="bh-section-sub">Best prices available today.</p>
                        </div>
                        <Link to="/products?sort=popularity" className="bh-view-all">View All</Link>
                    </div>
                    {loading ? <Loader center /> : (
                        <div className="bh-product-row">
                            {trending.slice(0, 5).map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* Trending Products */}
            <section className="bh-section">
                <div className="bh-container">
                    <div className="bh-section-header">
                        <div>
                            <h2 className="bh-section-title">Trending Products 🔥</h2>
                            <p className="bh-section-sub">Farmer favorites this week.</p>
                        </div>
                        <Link to="/products" className="bh-view-all">View All</Link>
                    </div>
                    {loading ? <Loader center /> : (
                        <div className="bh-product-row">
                            {trending.slice(0, 5).map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* Trusted Brands */}
            <section className="bh-section">
                <div className="bh-container">
                    <h2 className="bh-section-title" style={{ textAlign: 'center', marginBottom: 32 }}>Trusted Brand Partners</h2>
                    <div className="bh-brands-row">
                        {['Bayer', 'BASF', 'UPL', 'Syngenta', 'PI Industries', 'FMC', 'Katyayani', 'VNR'].map((b) => (
                            <div key={b} className="bh-brand-logo-card">{b}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kisan Vedika */}
            <section className="bh-section bh-bg-light">
                <div className="bh-container bh-kisan-grid">
                    {/* Articles */}
                    <div>
                        <div className="bh-section-header">
                            <h2 className="bh-section-title">Kisan Vedika: Expert Articles</h2>
                            <Link to="#" className="bh-view-all" style={{ color: '#f59e0b', borderColor: '#f59e0b' }}>Read More</Link>
                        </div>
                        <div className="bh-article-list">
                            {KISAN_ARTICLES.map((a) => (
                                <div key={a.id} className="bh-article-card">
                                    <img src={a.img} alt={a.title} className="bh-article-img" />
                                    <div>
                                        <p className="bh-article-title">{a.title}</p>
                                        <p className="bh-article-meta">{a.readTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Expert Video */}
                    <div>
                        <h2 className="bh-section-title">Featured Video</h2>
                        <div className="bh-video-main-card">
                            <div className="bh-video-thumb-wrap" style={{ height: 180 }}>
                                <img
                                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=480&h=270&fit=crop"
                                    alt="Expert Video"
                                    className="bh-video-thumb"
                                />
                                <div className="bh-video-play-btn">▶</div>
                            </div>
                            <p className="bh-video-title" style={{ padding: '8px 0', fontWeight: 600 }}>
                                Profitability tips for quality farm produce
                            </p>
                        </div>
                        {/* Agri Expert Bot */}
                        <div className="bh-expert-bot">
                            <p>🤖 <strong>Agri Expert Bot</strong></p>
                            <p style={{ fontSize: 13, margin: '6px 0 10px' }}>Not sure what to buy? Our experts can help you out!</p>
                            <Link to="/dashboard" className="bh-hero-cta" style={{ fontSize: 14, padding: '8px 16px' }}>Ask a Question</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
