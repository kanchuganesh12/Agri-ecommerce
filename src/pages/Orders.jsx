import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../features/orders/orderSlice';
import Loader from '../components/common/Loader';
import { formatPrice } from '../utils/helpers';
import { STATUS_COLORS } from '../features/orders/orderSlice';
import { FiPackage, FiDownload, FiRefreshCw } from 'react-icons/fi';

const Orders = () => {
    const dispatch = useDispatch();
    const { items: orders, loading } = useSelector((s) => s.orders);

    useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

    if (loading) return <Loader center size="lg" text="Loading orders..." />;

    if (!orders.length) {
        return (
            <div className="bh-container bh-empty-cart">
                <FiPackage size={72} color="#d1d5db" />
                <h2>No orders yet</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/products" className="bh-hero-cta">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="bh-container bh-orders-page">
            <h2 className="bh-page-title">My Orders</h2>
            <div className="bh-orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="bh-order-card">
                        <div className="bh-order-header">
                            <div>
                                <p className="bh-order-id">Order #{order.id}</p>
                                <p className="bh-order-date">{order.date}</p>
                            </div>
                            <div className="bh-order-status" style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>
                                {order.status}
                            </div>
                        </div>
                        <div className="bh-order-items">
                            {order.items?.map((item, i) => (
                                <div key={i} className="bh-order-item-row">
                                    <span>{item.name}</span>
                                    <span>× {item.qty}</span>
                                    <span>{formatPrice(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bh-order-footer">
                            <span className="bh-order-total">Total: <strong>{formatPrice(order.total)}</strong></span>
                            <div className="bh-order-actions">
                                <button className="bh-order-action-btn"><FiRefreshCw size={14} /> Reorder</button>
                                <button className="bh-order-action-btn"><FiDownload size={14} /> Invoice</button>
                                {order.status === 'Shipped' && (
                                    <button className="bh-order-action-btn bh-track-btn">Track Order</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
