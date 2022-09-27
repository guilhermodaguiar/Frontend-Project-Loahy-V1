import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import CustomerProfile from "../components/customerProfile/CustomerProfile";
import AdminProfile from "../components/adminProfile/AdminProfile";
import WishList from "../components/wishList/wishList";

import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Admin from "../pages/admin/Admin";
import Customer from "../pages/customer/Customer";
import CustomerPage from "../pages/customer/CustomerPage";
import AdminPage from "../pages/admin/AdminPage";


function Routes() {

    return(
        <>
            <Switch>
                <div className="inner-container">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <PrivateRoute path="/shopping-cart">
                            <ShoppingCart/>
                        </PrivateRoute>
                        <Route exact path="/costumer">
                            <Customer/>
                        </Route>
                        <PrivateRoute path="/costumer/main">
                            <CustomerPage/>
                        </PrivateRoute>
                        <PrivateRoute path="/wishlist">
                            <WishList/>
                        </PrivateRoute>
                        <Route exact path="/admin">
                            <Admin/>
                        </Route>
                        <PrivateRoute exact path="/admin/main">
                            <AdminPage/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Switch>
        </>

    )
}

export default Routes;