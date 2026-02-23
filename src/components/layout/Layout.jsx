import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="bh-app">
            <Header />
            <main className="bh-main">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
