import './ProductOverview.css';
import React from "react";

import RandomProduct from "../randomProduct/RandomProduct";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";


function ProductOverview() {


    return (
        <>
            <main>
                <div className="outer-container">
                    <h1 className="title-products-header" id="products">Onze producten</h1>
                    <div className="product-overview-inner-container">
                        <div className="product-container">
                            <div className="product-list">
                                <div className="product-item-info">
                                        <div className="photo-wrapper">
                                            <RandomProduct/>
                                            <RandomProduct/>
                                            <RandomProduct/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="to-shop-link-container">
                            <p className="click-to-shop">Klik&nbsp;<span><NavLink to="/shop" exact activeClassName="active-link"><FcShop className="shop-icon" size={25}/></NavLink></span>&nbsp;om naar de shop te gaan
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductOverview;
