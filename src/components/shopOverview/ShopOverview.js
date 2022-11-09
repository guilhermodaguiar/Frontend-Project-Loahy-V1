import './ShopOverview.css';
import React, {useEffect, useState} from "react";
import ShopItem from "../shopItem/ShopItem";
import axios from "axios";


function ShopOverview() {
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {

        async function fetchStoreItems() {
            try {
                const response = await axios.get('http://localhost:8080/products')
                console.log(response);
                setStoreItems(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchStoreItems();
    }, []);

    return (
        <>
            <main>
                <div id="shop">
                    <div className="outer-container">
                        <h1 className="title-products-header" id="products">Onze producten</h1>
                        <div className="product-overview-inner-container">
                            <div className="product-container">
                                <div className="product-list">
                                    <div className="product-item-info">
                                        <div className="photo-wrapper">
                                            {storeItems.map((item) => {
                                                return <ShopItem
                                                    key={item.productId}

                                                    url={item.image.url}
                                                    fileName={item.image.filename}

                                                    productId={item.productId}
                                                    productName={item.productName}
                                                    productDescription={item.productInformation}
                                                    productPrice={item.productPrice}
                                                />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ShopOverview;
