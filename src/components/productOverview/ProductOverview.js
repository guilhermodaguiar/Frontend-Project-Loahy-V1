import './ProductOverview.css';
import React from "react";

import Product from "../products/Product";


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
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductOverview;
