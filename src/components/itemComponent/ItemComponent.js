import './ItemComponent.css';

import React, {useEffect, useState} from "react";
import axios from "axios";
import Item from "../items/Item";


function ItemComponent() {
    const [ItemInfo, setItemInfo] = useState([]);


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchStoreItem(id) {
            try {
                const response = await axios.get(`http://localhost:8080/product/${id}`, {
                    cancelToken: source.token,
                })
                setItemInfo(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchStoreItem();
        return function cleanUp() {
            source.cancel();
        }
    }, []);

    return (
        <>
            <div>
                {ItemInfo.image ?
                    (<Item
                        key={ItemInfo.productId}

                        url={ItemInfo.image.url}
                        filename={ItemInfo.image.filename}

                        product_id={ItemInfo.productId}
                        product_name={ItemInfo.productName}
                        product_description={ItemInfo.productDescription}
                        product_price={ItemInfo.productPrice}
                    />) : (<Item
                        key={ItemInfo.id}

                        product_id={ItemInfo.productId}
                        productName={ItemInfo.productName}
                        product_description={ItemInfo.productDescription}
                        productPrice={ItemInfo.productPrice}
                    />)}
            </div>

        </>
    )
}

export default ItemComponent;

