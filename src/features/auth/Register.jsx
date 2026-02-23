import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { validateRegister } from '../../utils/validationSchemas';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((s) => s.auth);
    const [form, setForm] = useState({ name: '', mobile: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validateRegister(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const result = await dispatch(registerUser(form));
        if (registerUser.fulfilled.match(result)) navigate('/');
    };

    return (
        <div className="bh-auth-page">
            <div className="bh-auth-card">
                <div className="bh-auth-logo">
                    <span>🌱</span>
                    <h2>BigHaat</h2>
                </div>
                <h3 className="bh-auth-title">Join the Kisan Community</h3>
                <p className="bh-auth-sub">Create your farm account today</p>

                {error && <div className="bh-auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your full name" required />
                    <Input label="Mobile Number" name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} placeholder="10-digit mobile number" required />
                    <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="Create password" required />
                    <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Confirm password" required />
                    <Button type="submit" variant="primary" fullWidth disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="bh-auth-switch">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
