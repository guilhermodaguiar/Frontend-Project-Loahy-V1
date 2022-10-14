import React, {useContext, useState} from "react";

import {AuthContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useFormContext} from "react-hook-form";

function AdminUpdateProductComponent() {
    const { user } = useContext(AuthContext);

    const {productId} = useParams();

    const {register, formState: {errors}, handleSubmit} = useFormContext();
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

                },{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(updatedProduct)
        } catch(e) {
            console.error('Error: er is iets misgegaan',e);
        }
    }

    function updatedProduct() {
        history.push('/randomProduct');
    }

    return(
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

                        <div className="admin-product-text" id="admin-new-products-update">

                            <br/>
                            Voor bestaande producten vult u het bestaande artikelnummer in om een bestaand product
                            te wijzigen.
                            <br/>
                            Voor de prijs gebruikt u een 'punt' i.p.v een 'komma' om decimale getallen in te voeren.
                            bijvoorbeeld: € 2.19
                            <br/>
                            Het opslaan/wijzigen van een product zal alleen lukken als er een artikelnummer,
                            product-naam en
                            prijs zijn ingevuld.

                            </div>

                            <form className="product-form"
                                  onSubmit={handleSubmit(sendProductData)}>
                                <div>
                                    <label htmlFor="details-product-id">
                                        artikelnummer:
                                        <input
                                            type="text"
                                            id="product_id"
                                            {...register("product_id", {
                                                required: {value: true, message: message}
                                            })}
                                            placeholder={productId}
                                        />
                                    </label>
                                    {errors.product_id && <p>{errors.product_id.message}</p>}
                                    <br/>

                                    <label htmlFor="details-product-name">
                                        RandomProduct-naam:
                                        <input
                                            type="text"
                                            id="product_name"
                                            {...register("product_name", {
                                                required: {value: true, message: message}
                                            })}
                                            placeholder="naam van jou product"
                                        />
                                    </label>
                                    {errors.product_name && <p>{errors.product_name.message}</p>}
                                    <br/>

                                </div>

                                <div className="product-description">

                                    <label htmlFor="details-product-description">
                                        Omschrijving:
                                        <textarea
                                            typeof="text"
                                            id="product_description"
                                            rows="10"
                                            cols="50"
                                            {...register("product_description", {
                                                required: {value: false, message: message}
                                            })}
                                            placeholder="product informatie"
                                        />
                                    </label>
                                    {errors.product_description && <p>{errors.product_description.message}</p>}
                                    <br/>

                                </div>

                                <div>
                                    <label htmlFor="details-product-price">
                                        Prijs:
                                        <input
                                            type="text"
                                            id="product_price"
                                            {...register("product_price", {
                                                required: {value: true, message: message}
                                            })}
                                            placeholder="prijs in EUR"

                                        />
                                    </label>
                                    {errors.product_price && <p>{errors.product_price.message}</p>}

                                    <button type="submit">
                                        Voeg RandomProduct toe
                                    </button>
                                </div>
                            </form>
                        </div>
                )}
        </>
    )
}

export default AdminUpdateProductComponent;