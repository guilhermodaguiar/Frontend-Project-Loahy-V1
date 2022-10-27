import React, {useEffect, useState} from "react";

import './Shop2.css';
import axios from "axios";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import RandomRobot from "../../components/randomRobot/RandomRobot";

function Shop2() {

    const [items, setItems] = useState([]);


    useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/products', {
                });
                setItems(response.data);

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
                    <h1 className="product-h1">Shop</h1>

                        <div className="product-inner-container">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <div className="photo-wrapper">
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                            <RandomRobot/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                </div>
            </div>




        </>
    )
}

export default Shop2;