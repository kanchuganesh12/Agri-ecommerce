import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { validateLogin } from '../../utils/validationSchemas';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((s) => s.auth);
    const [form, setForm] = useState({ mobile: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validateLogin(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const result = await dispatch(loginUser(form));
        if (loginUser.fulfilled.match(result)) navigate('/');
    };

    return (
        <div className="bh-auth-page">
            <div className="bh-auth-card">
                <div className="bh-auth-logo">
                    <span>🌱</span>
                    <h2>BigHaat</h2>
                </div>
                <h3 className="bh-auth-title">Welcome Back, Kisan!</h3>
                <p className="bh-auth-sub">Login to access your farm account</p>

                {error && <div className="bh-auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input label="Mobile Number" name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} placeholder="Enter 10-digit mobile" required />
                    <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="Enter password" required />
                    <div className="bh-auth-forgot">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <Button type="submit" variant="primary" fullWidth disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <p className="bh-auth-switch">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
