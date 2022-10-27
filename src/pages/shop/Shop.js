import React, {useEffect, useState} from "react";

import './Shop.css';
import axios from "axios";
import StoreItem from "../../components/storeItem/StoreItem";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";

function Shop() {

    const [storeItems, setStoreItems] = useState([]);


    useEffect(() => {

        async function fetchStoreItems() {
            try {
                const response = await axios.get('http://localhost:8080/products', {});
                setStoreItems(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchStoreItems();

    }, []);


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })


    return (

        <>
            <div>
                <ScrollIndicator/>
                <ScrollToTop/>
                <div className="product-page">
                    <h1 className="product-h1">Shop</h1>
                    <div className="shop-outer-container">
                        <div className="inner-container">
                            <div className="container-all-products">
                                {storeItems.map((item) => {
                                    return (
                                        item.image !== null ?
                                            <StoreItem
                                                key={item.productId}

                                                url={item.image.url}
                                                filename={item.image.filename}

                                                product_id={item.productId}
                                                product_name={item.productName}
                                                product_description={item.productDescription}
                                                product_price={item.productPrice}
                                            />
                                            :
                                            <StoreItem
                                                key={item.id}

                                                product_id={item.productId}
                                                productName={item.productName}
                                                product_description={item.productDescription}
                                                productPrice={item.productPrice}
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