import React from "react";

import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import WishList from "../pages/wishList/WishList";
import PrivateRoute from "./privateRoute/PrivateRoute";
import CustomerPage from "../pages/customer/CustomerPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminLogIn from "../pages/admin/AdminLogIn";
import CheckOut from "../pages/checkout/CheckOut";
import CustomerRegister from "../pages/customer/customerRegister/CustomerRegister";
import CustomerLogIn2 from "../pages/customer/customerLogIn/CustomerLogin2";


function Routes() {

    return (
        <>
            <div className="inner-container">
                <Switch>
                    <Route exact path="/customer/login">
                        <CustomerLogIn2/>
                    </Route>
                    <Route exact path="/customer/register">
                        <CustomerRegister/>
                    </Route>
                    <PrivateRoute path="/customer/profile">
                        <CustomerPage/>
                    </PrivateRoute>
                    <Route path="/shopping-cart">
                        <Cart/>
                    </Route>
                    <Route exact path="/customer/checkout">
                        <CheckOut/>
                    </Route>
                    <Route path="/wishlist">
                        <WishList/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminLogIn/>
                    </Route>
                    <PrivateRoute exact path="/admin/profile">
                        <AdminPage/>
                    </PrivateRoute>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </>

    )
}

export default Routes;