import React, {useEffect, useState} from "react";

import './Shop.css';
import axios from "axios";
import ShopItem2 from "../../components/shopItem/ShopItem";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";

function Shop() {

    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchStoreItems() {
            try {
                const response = await axios.get('http://localhost:8080/products', {
                    cancelToken: source.token,
                })
                setStoreItems(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchStoreItems();
        return function cleanUp() {
            source.cancel();
        }
    }, []);


    window.scrollTo({
        top: 0, behavior: 'smooth'
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
                                    return (item.image !== null ?
                                        (<ShopItem2
                                            key={item.productId}

                                            url={item.image.url}
                                            filename={item.image.filename}

                                            product_id={item.productId}
                                            product_name={item.productName}
                                            product_description={item.productDescription}
                                            product_price={item.productPrice}
                                        />) : (<ShopItem2
                                            key={item.id}

                                            product_id={item.productId}
                                            productName={item.productName}
                                            product_description={item.productDescription}
                                            productPrice={item.productPrice}
                                        />))
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </>)
}

export default Shop;