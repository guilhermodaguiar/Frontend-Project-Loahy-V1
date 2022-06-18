import './App.css';

import {
    Switch,
    Route,
    NavLink, Redirect,
} from 'react-router-dom';

import axios from 'axios';
import {ReactComponent as ShoppingCartIcon} from "./assets/icons/winkelmandje.svg";
import {ReactComponent as WishListIcon} from "./assets/icons/Wishlist.svg";
import {ReactComponent as UserAccountIcon} from "./assets/icons/account.svg";
import {ReactComponent as InstagramIcon} from "./assets/icons/instagram-svgrepo-com-3.svg";
import {ReactComponent as FacebookIcon} from "./assets/icons/facebook-svgrepo-com-2.svg";

import SearchBar from "./components/searchBar/SearchBar";
import ContactInfo from "./components/contactInfo/ContactInfo";
import ProductOverviewPage from "./components/productOverviewPage/ProductOverviewPage";
import ProductPage from "./components/productPage/ProductPage";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Admin from "./components/adminLogin/AdminLogin";
import CostumerAccount from "./components/customerAccount/CostumerAccount";
import HomePage from "./components/homePage/HomePage";
import BrandStory from "./components/brandStory/LoahyStory";

function App() {

  return (
      <>
        <nav>
          <ul>
              <li>
                  <NavLink to="/" activeClassName="active-homepage">
                      Home
                  </NavLink>
              </li>
            <li>
                <NavLink to="/products" activeClassName="active-product-overview">
                    Shop
                </NavLink>
            </li>
            <li>
                <NavLink to="/our-story" activeClassName="active-our-story">
                    Ons verhaal
                </NavLink>
            </li>
          </ul>
          <div><SearchBar/></div>
          <ul>
            <ShoppingCartIcon className="nav-icon" />
            <WishListIcon className ="nav-icon" />
            <UserAccountIcon className ="nav-icon" />
          </ul>
        </nav>

          <Switch>
              <Route exact path="/">
                  <HomePage/>
              </Route>
          </Switch>



        <main>
            <div className="product-overview">
                <Switch>
                    <Route exact path="/products">
                        <ProductOverviewPage/>
                    </Route>
                </Switch>
            </div>
            <div className="products">
              <Switch>
                <Route path="/products/:id">
                  <ProductPage />
                </Route>
              </Switch>
            </div>
            <div className="our-story">
                <Switch>
                    <Route path="/our-story">
                        <BrandStory/>
                    </Route>
                </Switch>
            </div>
            <div className="contact-info">
                <Switch>
                    <Route path="/contact-info">
                        <ContactInfo/>
                    </Route>
                </Switch>
            </div>
            <div className="admin-login">
                <Switch>
                    <Route exact path="/admin">
                        <Admin/>
                    </Route>
                </Switch>
            </div>
            <div>
                <Switch>
                    <Route path="/shopping-cart">
                        <ShoppingCart/>
                    </Route>
                </Switch>
            </div>
            <div>
                <Switch>
                    <Route path="/costumer-account">
                    <CostumerAccount/>
                    </Route>
                </Switch>
            </div>
        </main>
        <footer>
          <div>
            <h5>2022 Loahy Webdesign -Guilhermo d'Aguiar</h5>
          </div>
          <InstagramIcon className="social-media-icon" />
          <FacebookIcon className="social-media-icon" />
        </footer>
      </>

  );
}

export default App;
