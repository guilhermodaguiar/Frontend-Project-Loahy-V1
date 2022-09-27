import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';

import {ShoppingCartContextProvider} from "./context/ShoppingCartContext";
import WishlistProvider from "./context/WishlistContext";
import AuthContextProvider from "./context/AuthContext";
import FormContextProvider from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <ShoppingCartContextProvider>
                    <WishlistProvider>
                        <FormContextProvider>
                            <App />
                        </FormContextProvider>
                    </WishlistProvider>
                </ShoppingCartContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
