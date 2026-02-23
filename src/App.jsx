import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const AppInner = () => {
    return <AppRoutes />;
};

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppInner />
        </BrowserRouter>
    </Provider>
);

export default App;
