import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout, fetchCurrentUser } from '../features/auth/authSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((s) => s.auth);
    return {
        user, isAuthenticated, loading, error,
        login: (credentials) => dispatch(loginUser(credentials)),
        register: (data) => dispatch(registerUser(data)),
        logout: () => dispatch(logout()),
        fetchMe: () => dispatch(fetchCurrentUser()),
    };
};

export default useAuth;
