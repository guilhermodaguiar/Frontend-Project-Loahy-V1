import React, {useEffect, useState} from "react";

import './Shop.css';
import axios from "axios";
import AddProduct from "../../components/addProduct/AddProduct";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";

function Shop() {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        async function fetchProducts(e) {
            try {
                const response = await axios.get('http://localhost:8080/products/');
                    setProducts(response.data);

                } catch (e) {
                    console.error(e);
                }
            }
            fetchProducts();
        }, []);


    window.scrollTo({
        top:0,
        behavior: 'smooth'
    })


    return (

        <>
            <div>
                <ScrollIndicator/>
                <ScrollToTop/>
                <div className="product-page">
                    <h1 className="product-h1">Producten</h1>
                    <div className="shop-outer-container">
                        <div className="inner-container">
                            <div className="container-all-products">
                                {products.map((product) => {
                                return(
                                    product.image !== null ?
                                        <AddProduct
                                            key={product.productId}
                                            url={product.image.url}
                                            product_id={product.productId}
                                            productName={product.productName}
                                            productPrice={product.productPrice}
                                        />
                                        :
                                        <AddProduct
                                            key={product.id}

                                            product_id={product.productId}
                                            productName={product.productName}
                                            productPrice={product.productPrice}
                                        />
                                )
                            })}
                        </div>
                    </div>
                </div>

                </div>
            </div>




            </>
    )
}

export default Shop;