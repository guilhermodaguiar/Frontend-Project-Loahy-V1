import './App.css';

import HeaderPage from "./layout/headerPage/HeaderPage";
import Footer from "./layout/footer/Footer";
import CostumerSignIn from "./pages/customerSignIn/CostumerSignIn";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import React, {useContext} from "react";
import {UserAuthContext} from "./context/UserAuthContext";
import CostumerProfile from "./pages/costumerProfile/CostumerProfile";
import AdminProfile from "./pages/adminProfile/AdminProfile";
import {AdminAuthContext} from "./context/AdminAuthContext";
import AdminSignIn from "./pages/adminSignIn/AdminSignIn";


function App() {
    const { isAuth } = useContext(UserAuthContext);
    const { isAdminAuth } = useContext(AdminAuthContext);

    return (
      <>
          <BrowserRouter>
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
                      <Route exact path="/admin">
                          <AdminSignIn/>
                      </Route>
                      <Route path="/admin/profile">
                          {isAdminAuth ? <AdminProfile/> : <Redirect to="/"/>}
                      </Route>
                  </Switch>
              </div>
          </BrowserRouter>
          <Footer/>
      </>

  );
}

export default App;

