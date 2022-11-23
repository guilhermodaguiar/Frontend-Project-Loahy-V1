import './ShopOverview.css';
import React, {useContext} from "react";
import ShopItem from "../shopItem/ShopItem";
import {CartContext} from "../../context/CartContext";
import {WishlistContext} from "../../context/WishlistContext";


function ShopOverview() {
    const {state: {items}} = useContext(CartContext);
    const {state2: {wishlistItems}} = useContext(WishlistContext);

    console.log(items);

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
                                            {items.map((item) => {
                                                return <ShopItem
                                                    item = {item}
                                                    key={item.productId}

                                                    url={item.image.url}
                                                    fileName={item.image.fileName}

                                                    productId={item.productId}
                                                    productName={item.productName}
                                                    productDescription={item.productInformation}
                                                    productPrice={item.productPrice}
                                                />
                                            })}
                                            {wishlistItems.map((wishlistItem)=> {
                                                return<ShopItem
                                                    key={wishlistItem.productId}

                                                    url={wishlistItem.image.url}
                                                    fileName={wishlistItem.image.fileName}

                                                    productId={wishlistItem.productId}
                                                    productName={wishlistItem.productName}
                                                    productDescription={wishlistItem.productInformation}
                                                    productPrice={wishlistItem.productPrice}
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
