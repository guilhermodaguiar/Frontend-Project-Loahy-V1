import './ItemComponent.css';

import React, {useEffect, useState} from "react";
import axios from "axios";
import SingleItem from "./singleItems/SingleItem";
import {useParams} from "react-router-dom";


function ItemComponent() {
    const [Item, setItem] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchStoreItem() {
            try {
                const response = await axios.get(`http://localhost:8080/product/${id}`, {
                    cancelToken: source.token,
                })
                setItem(response.data);

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
                <SingleItem
                        key={Item.productId}

                        url={Item.image.url}
                        filename={Item.image.filename}

                        product_id={Item.productId}
                        product_name={Item.productName}
                        product_description={Item.productDescription}
                        product_price={Item.productPrice}
                    />
            </div>

        </>
    )
}

export default ItemComponent;

