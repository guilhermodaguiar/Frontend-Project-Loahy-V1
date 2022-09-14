import {Redirect, Route, Switch} from "react-router-dom";
import HeaderPage from "../layout/headerPage/HeaderPage";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import CostumerSignIn from "../pages/customerSignIn/CostumerSignIn";
import CostumerProfile from "../pages/costumerProfile/CostumerProfile";
import AdminSignIn from "../pages/adminSignIn/AdminSignIn";
import AdminProfile from "../pages/adminProfile/AdminProfile";
import WishList from "../components/wishList/wishList";

import React, {useContext} from "react";
import {UserAuthContext} from "../context/UserAuthContext";
import {AdminAuthContext} from "../context/AdminAuthContext";


function Routes() {
    const { isAuth } = useContext(UserAuthContext);
    const { isAdminAuth } = useContext(AdminAuthContext);

    return(
        <Switch>
            <div className="inner-container">
                <Switch>
                    <Route exact path="/">
                        <HeaderPage/>
                    </Route>
                    <Route path="/shopping-cart">
                        <ShoppingCart/>
                    </Route>
                    <Route exact path="/costumer">
                        <CostumerSignIn/>
                    </Route>
                    <Route path="/costumer/profile">
                        {isAuth ? <CostumerProfile/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/wishlist">
                        <WishList/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminSignIn/>
                    </Route>
                    <Route path="/admin/profile">
                        {isAdminAuth ? <AdminProfile/> : <Redirect to="/"/>}
                    </Route>
                </Switch>
            </div>
        </Switch>
    )
}

export default Routes;