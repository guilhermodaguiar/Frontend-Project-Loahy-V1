import React, {useContext} from "react";

import {AuthContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

function AdminUpdateProductComponent() {
    const {user} = useContext(AuthContext);

    const {productId} = useParams();
    const message = "..veld is verplicht";
    const history = useHistory();


    async function sendProductData(productdata) {
        try {
            await axios.put(`http://localhost:8080/products/${productId}`,
                {

                    productId: productdata.product_id,
                    productName: productdata.product_name,
                    productDescription: productdata.product_description,
                    productPrice: productdata.product_price,

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(updatedProduct)
        } catch (e) {
            console.error('Error: er is iets misgegaan', e);
        }
    }

    function updatedProduct() {
        history.push('/randomProduct');
    }

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>U moet ingelogd zijn als
                                <br/> ADMINISTRATOR
                                <br/>om deze content te mogen zien..
                            </h1>
                        </div>
                    </div>
                )
                :
                (
                    <div className="Product-Form-Container">
                        //hier komt wat je gaat updaten in je products.
                    </div>
                )}
        </>
    )
}

export default AdminUpdateProductComponent;