import './App.css';

import HeaderPage from "./layout/headerPage/HeaderPage";
import Footer from "./layout/footer/Footer";
import CostumerLogin from "./components/customerLogin/CostumerLogin";
import ContactInfo from "./components/contactInfo/ContactInfo";
import ProductOverview from "./components/productOverview/ProductOverview";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import BrandStory from "./components/brandStory/BrandStory";
import Admin from "./components/adminLogin/AdminLogin";
import React, {useContext} from "react";
import NavBar from "./layout/navBar/NavBar";
import {UserAuthContext} from "./context/UserAuthContext";
import CostumerProfile from "./components/costumerProfile/CostumerProfile";



function App() {
    const { isAuth } = useContext(UserAuthContext);
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
                          <BrandStory/>
                      </Route>
                      <Route path="/contact-info">
                          <ContactInfo/>
                      </Route>
                      <Route exact path="/admin">
                          <Admin/>
                      </Route>
                      <Route path="/shopping-cart">
                          <ShoppingCart/>
                      </Route>
                      <Route path="/costumer">
                          <CostumerLogin/>
                      </Route>
                      <Route path="/costumer/profile">
                          {isAuth ? <CostumerProfile/> : <Redirect to="/"/>}
                      </Route>
                  </Switch>
              </div>
          </BrowserRouter>


          <Footer/>
      </>

  );
}

export default App;

