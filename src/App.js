import './App.css';

import HeaderPage from "./layout/headerPage/HeaderPage";
import Footer from "./layout/footer/Footer";
import CostumerSignIn from "./pages/customerSignIn/CostumerSignIn";
import ContactUs from "./components/contactUs/ContactUs";
import ProductOverview from "./components/productOverview/ProductOverview";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import AboutUsPage from "./components/aboutUsPage/AboutUsPage";
import React, {useContext} from "react";
import NavBar from "./layout/navBar/NavBar";
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
                  <NavBar/>
                  <HeaderPage/>
                  <Switch>
                      <Route path="/products">
                          <ProductOverview/>
                      </Route>
                      <Route path="/our-story">
                          <AboutUsPage/>
                      </Route>
                      <Route path="/contact-us">
                          <ContactUs/>
                      </Route>
                      <Route path="/shopping-cart">
                          <ShoppingCart/>
                      </Route>
                      <Route path="/costumer">
                          <CostumerSignIn/>
                      </Route>
                      <Route path="/costumer/profile">
                          {isAuth ? <CostumerProfile/> : <Redirect to="/"/>}
                      </Route>
                      <Route path="/admin">
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

