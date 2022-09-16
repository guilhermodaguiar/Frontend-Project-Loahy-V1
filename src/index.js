import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';

import ShoppingCartProvider from "./context/ShoppingCartContext";
import UserAuthContextProvider from "./context/UserAuthContext";
import AdminAuthContextProvider from "./context/AdminAuthContext";
import WishlistProvider from "./context/WishlistContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
        <Router>
        <ShoppingCartProvider>
            <WishlistProvider>
                <UserAuthContextProvider>
                    <AdminAuthContextProvider>
                        <App />
                    </AdminAuthContextProvider>
                </UserAuthContextProvider>
            </WishlistProvider>
        </ShoppingCartProvider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
