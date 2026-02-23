// Simple validation helpers (no external deps)

export const required = (value) => (!value ? 'This field is required' : '');

export const minLength = (min) => (value) =>
    value && value.length < min ? `Minimum ${min} characters required` : '';

export const maxLength = (max) => (value) =>
    value && value.length > max ? `Maximum ${max} characters allowed` : '';

export const isEmail = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ? 'Invalid email address'
        : '';

export const isPhone = (value) =>
    value && !/^[6-9]\d{9}$/.test(value) ? 'Enter a valid 10-digit Indian mobile number' : '';

export const isPincode = (value) =>
    value && !/^\d{6}$/.test(value) ? 'Enter a valid 6-digit pincode' : '';

export const isPassword = (value) =>
    value && value.length < 6 ? 'Password must be at least 6 characters' : '';

// Validate login form
export const validateLogin = ({ mobile, password }) => {
    const errors = {};
    const phoneErr = isPhone(mobile) || required(mobile);
    const passErr = isPassword(password) || required(password);
    if (phoneErr) errors.mobile = phoneErr;
    if (passErr) errors.password = passErr;
    return errors;
};

// Validate register form
export const validateRegister = ({ name, mobile, password, confirmPassword }) => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    const phoneErr = isPhone(mobile) || required(mobile);
    if (phoneErr) errors.mobile = phoneErr;
    const passErr = isPassword(password) || required(password);
    if (passErr) errors.password = passErr;
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
};

// Validate checkout address
export const validateAddress = ({ fullName, address, city, state, pincode, phone }) => {
    const errors = {};
    if (!fullName) errors.fullName = 'Full name is required';
    if (!address) errors.address = 'Address is required';
    if (!city) errors.city = 'City is required';
    if (!state) errors.state = 'State is required';
    const pinErr = isPincode(pincode) || required(pincode);
    if (pinErr) errors.pincode = pinErr;
    const phoneErr = isPhone(phone) || required(phone);
    if (phoneErr) errors.phone = phoneErr;
    return errors;
};
