import './wishList.css';
import NavBar from "../../layout/navBar/NavBar";
import {IoCloseSharp} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Wishlist() {
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getProduct({image, title}) {
            setError('')
            try{
                const response = axios.get(`https://api.chucknorris.io/jokes/random`, {
                    concelToken: source,});
                console.log((response.data.value))
                setProduct(response.data.value)
            } catch (e) {
                console.error(e);
                setError('Er is iets misgegaan met het ophalen van de data. Probeer het nog eens');
            }
            getProduct();

            //UNMOUNT
            return function cleanup() {
                console.log(`We gaan eraan!!`);
                source.cancel();
            }
        }
    }, []);


    return(
        <>
            <NavBar/>
            <div className="wishlist-page">
                <h1>Wishlist</h1>
            </div>
            <div className="wishlist-body">
                <div className="wishlist-info">
                    <p>Voeg items toe aan je verlanglijstje</p>
                </div>
                <div className="wishlist-inner-container">
                    <div></div>
                    <div className="wishlist-wishlist">
                        <div>
                            <h3>[costumer]'s Wishlist</h3>
                            <div>
                                <table className="shop-table-responsive-cart" cellSpacing="0">
                                    <thead>
                                    <tr>
                                        <th className="product remove"></th>
                                        <th className="product-name-name">Product</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="form-cart-item">
                                        <td className="product remove"><IoCloseSharp/></td>
                                        <td className="product-name-name">hier komen de producten</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist;