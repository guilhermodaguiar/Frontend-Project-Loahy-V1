import './ProductOverview.css';
import axios from "axios";
import React, {useEffect, useState} from "react";

import Product from "../product/Product";


function ProductOverview() {

    const[error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            setError('');
            try{
                const response = await axios.get(`https://api.chucknorris.io/jokes/random`);
                console.log(response);
            } catch(e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);


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
                    {error && <p>{error}</p>}
                </div>
            </main>

        </>
    );
}

export default ProductOverview;
