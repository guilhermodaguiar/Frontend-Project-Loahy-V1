import React, {useContext, useState} from "react";
import UploadImage from "../ImageComponent/UploadImage";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";


function AdminProductComponent() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const {register, formState: {errors}, handleSubmit} = useFormContext();
    const message = "..veld is verplicht";
    const history = useHistory();

    const [addSucces, toggleAddSucces] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [error, toggleError] = useState(false)


    async function sendProductData(productdata) {
        try {
            await axios.post(`http://localhost:8080/products/create`,
                {
                    productName: productdata.product_name,
                    productDescription: productdata.product_description,
                    productPrice: productdata.product_price,
                }).then(addNewProduct)

        } catch (error) {
            console.error(error);
        }
    }


    async function addNewProduct() {
        history.push('/producten');
    }

    async function deleteProduct(productName) {
        toggleError(false);
        try {
            await axios.delete(`http://localhost:8080/products/delete/${productName}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            toggleError(true);
            console.error(e)
        }

        setTimeout(() => {
            history.push('/products-');
        }, 300)

    }

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                <div className="admin-route-container">
                    <div className="admin-route">
                        <h1>U moet ingelogd zijn als
                            <br/> ADMINISTRATOR
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="add-new-product" id="/admin-add-new-product">Nieuw product toevoegen
                {addSucces === true && <p>Product is toegevoegd!</p>}
                    <form onSubmit={addNewProduct}>
                    <label htmlFor="image-field">
                        <UploadImage/>
                    </label>
                    <label htmlFor="product-name">
                        Product Naam
                        <input
                            type="text"
                            name="product-name-field"
                            id="product-name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}/>
                    </label>
                    <label htmlFor="product-description">
                        Product informatie
                        <input
                            type="text"
                            name="product-information-field"
                            id="product-information"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}/>
                    </label>
                    <label htmlFor="product-price">
                        <input
                            id="price"
                            name="product-price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </label>
                    <button type="submit">
                        Voeg Product toe
                    </button>
                </form>
                </div>)}
        </>
    )
}

export default AdminProductComponent;
