import React, { useState } from 'react';
import { validateAddress } from '../../utils/validationSchemas';
import { PAYMENT_METHODS } from '../../utils/constants';
import Input from '../common/Input';

const STATES = ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Gujarat', 'West Bengal', 'Punjab', 'Haryana', 'Bihar'];

const CheckoutForm = ({ onSubmit }) => {
    const [form, setForm] = useState({ fullName: '', address: '', city: '', state: '', pincode: '', phone: '', paymentMethod: 'upi' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validateAddress(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onSubmit(form);
    };

    return (
        <form className="bh-checkout-form" onSubmit={handleSubmit}>
            <div className="bh-checkout-section">
                <h3>Delivery Address</h3>
                <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
                <Input label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                <Input label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} required />
                <div className="bh-form-row">
                    <Input label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} required />
                    <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} error={errors.pincode} required />
                </div>
                <div className="bh-input-wrapper">
                    <label className="bh-input-label">State <span className="text-red">*</span></label>
                    <select name="state" value={form.state} onChange={handleChange} className="bh-input">
                        <option value="">Select State</option>
                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="bh-input-err-msg">{errors.state}</p>}
                </div>
            </div>

            <div className="bh-checkout-section">
                <h3>Payment Method</h3>
                <div className="bh-payment-methods">
                    {PAYMENT_METHODS.map((pm) => (
                        <label key={pm.id} className={`bh-payment-opt ${form.paymentMethod === pm.id ? 'active' : ''}`}>
                            <input type="radio" name="paymentMethod" value={pm.id} checked={form.paymentMethod === pm.id} onChange={handleChange} />
                            <span className="bh-payment-icon">{pm.icon}</span>
                            <span>{pm.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="bh-checkout-btn bh-place-order-btn">
                Place Order
            </button>
        </form>
    );
};

export default CheckoutForm;
