import './ProductOverview.css';
import React from "react";

import Product from "../products/Product";
import {HashLink as Link} from "react-router-hash-link";


function ProductOverview() {

    return (
        <>
            <main>
                <div className="outer-container">
                    <div className="product-container">
                        <h1 className="title-products-header" id="products">Onze producten</h1>
                        <div className="product-list">
                            <li className="product-item-info">
                                <div className="photo-wrapper">
                                    <Product/>
                                    <Product/>
                                    <Product/>
                                </div>
                            </li>
                            <div>
                                <Link to="/shop">
                                    <button
                                        type="button"
                                        //bij het clicken moet het Productpagina worden afgevuurd
                                        onClick={()=>console.log("Jij wil shoppen!")}
                                    >Naar de Shop
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductOverview;
