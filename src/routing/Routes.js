import React from "react";

import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import WishList from "../pages/wishList/WishList";
import PrivateRoute from "./privateRoute/PrivateRoute";
import CustomerPage from "../pages/customer/CustomerPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminLogIn from "../pages/admin/AdminLogIn";
import CustomerRegister from "../pages/customer/customerRegister/CustomerRegister";
import CustomerLogIn from "../pages/customer/customerLogIn/CustomerLogIn";
import Shop from "../pages/shop/Shop";
import Shop2 from "../pages/shop/Shop2";
import CheckOut from "../pages/checkout/CheckOut";
import ItemComponent from "../components/itemComponent/ItemComponent";


function Routes() {

    return(
        <>
            <Switch>
                <div className="inner-container">
                    <Switch>
                        <Route exact path="/customer">
                            <CustomerLogIn/>
                        </Route>
                        <Route exact path="/customer/register">
                            <CustomerRegister/>
                        </Route>
                        <PrivateRoute path="/customer/main">
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
                        <PrivateRoute exact path="/admin/main">
                            <AdminPage/>
                        </PrivateRoute>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/shop">
                            <Shop/>
                        </Route>
                        <Route exact path="/shop2">
                            <Shop2/>
                        </Route>
                        <Route path="shop/:item_id">
                            <ItemComponent/>
                        </Route>
                    </Switch>
                </div>
            </Switch>
        </>

    )
}

export default Routes;