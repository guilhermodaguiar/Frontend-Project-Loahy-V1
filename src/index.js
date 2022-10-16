import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

import {ShoppingCartContextProvider} from "./context/ShoppingCartContext";
import WishlistProvider from "./context/WishlistContext";
import AuthContextProvider from "./context/AuthContext";
import FormContextProvider from "./context/FormContext";
import CartContextProvider from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


        <Router>
            <AuthContextProvider>
                <ShoppingCartContextProvider>
                    <CartContextProvider>
                        <WishlistProvider>
                            <FormContextProvider>
                                <App />
                            </FormContextProvider>
                        </WishlistProvider>
                    </CartContextProvider>
                </ShoppingCartContextProvider>
            </AuthContextProvider>
        </Router>
);

