import React, {useEffect, useState} from "react";

import "./RandomProduct.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

function RandomProduct() {

    const history = useHistory();

    const [items, setItems] = useState([]);
    const [currentProductIndex, setCurrentProductIndex] = useState(Math.floor(Math.random() * items.length));


    useEffect(() => {
        const source = axios.CancelToken.source();
        async function fetchItems() {
            try {
                const response = await axios.get('http://localhost:8080/products',{cancelToken: source.token
                    });
                setItems(response.data);

            } catch (e) {
                console.error(e, "er is iets misgegaan met het ophalen van de data");
            }
        }
        fetchItems();
        function cleanUp() {
            source.cancel();
        }
    }, []);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function randomProduct() {
        function getRandomNumber(max) {
            return Math.floor(Math.random()*max);
        }
        setCurrentProductIndex(getRandomNumber(items.length));
    }

    useEffect(() => randomProduct(), [randomProduct]);


    // een functie als de onClick wordt gevuurd het juiste "afbeelding" gaat naar de bestaande link met
    // de juist link (endpoint)
    function goToProduct() {
        history.push(`/products/${currentProductIndex.product_id}`)
    }


    return (
        <>
            <div className="product-outer-container">
                <div className="product-image-container">
                    <img alt="randomProduct"
                         src={items[currentProductIndex]}
                    />
                    <div>
                        onClick={goToProduct}>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RandomProduct;