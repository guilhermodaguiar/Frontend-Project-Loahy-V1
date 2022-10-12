import React from "react";

import { Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import WishList from "../components/wishList/wishList";
import PrivateRoute from "./privateRoute/PrivateRoute";
import CustomerPage from "../pages/customer/CustomerPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminLogIn from "../pages/admin/AdminLogIn";
import CustomerRegister from "../pages/customer/customerRegister/CustomerRegister";
import CustomerLogIn from "../pages/customer/customerLogIn/CustomerLogIn";
import Shop from "../pages/shop/Shop";



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
                        <PrivateRoute path="/customer/shopping-cart">
                            <ShoppingCart/>
                        </PrivateRoute>
                        <PrivateRoute path="/customer/wishlist">
                            <WishList/>
                        </PrivateRoute>
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
                    </Switch>
                </div>
            </Switch>
        </>

    )
}

export default Routes;