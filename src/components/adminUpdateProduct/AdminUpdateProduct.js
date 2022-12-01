import "./AdminUpdateProduct.css"

import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {MdAddCircle} from "react-icons/md";
import {RiErrorWarningLine} from "react-icons/ri";
import {FaFileUpload} from "react-icons/fa";

function AdminUpdateProduct() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const {id} = useParams();

    const [productNumber, setProductNumber] = useState()
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState();

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');


    async function sendItemData() {
        try {
            await axios.put(`http://localhost:8080/products/${id}`,
                {
                    productId: productNumber,
                    productName: productName,
                    productDescription: productInfo,
                    productPrice: productPrice,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(addedNewProduct)

        } catch (e) {
            console.error(e);
        }
    }

    function addedNewProduct() {
        history.push('/')
    }

    async function sendUpdatedImageData(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post(`http://localhost:8080/products/${id}/image`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
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
                <div className="item-update-container" id="admin_update_product">
                    <h2>Product Aanpassen<MdAddCircle size={25}/></h2>
                    <div className="update-item-container">
                        <p>Pas hier je product</p>
                        <RiErrorWarningLine/>
                        <p>Alle velden moeten verplicht ingevuld worden!! </p>
                        <p>Vul het Product nummer Product nummer vindt je in Mijn
                            producten(link) </p>
                    </div>
                    <div className="form-update-container">
                        <form className="update-item-form"
                              onSubmit={sendItemData}>
                            <div className="form-container-all">
                                <form onSubmit={sendUpdatedImageData}>
                                    <label htmlFor="itemImage-field">
                                        Kies Afbeelding
                                        <input
                                            className="input-container-all"
                                            type="file"
                                            id="itemImage-field"
                                            name="image"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    {previewUrl &&
                                        <label className="label-container">
                                            Preview:
                                            <img src={previewUrl}
                                                 alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                                 className="image-preview"/>
                                        </label>
                                    }
                                    <button
                                        type="submit"
                                        className="form-submit-image-button"
                                    >
                                        <FaFileUpload size={22}/>
                                        Upload Image
                                    </button>
                                </form>
                            </div>
                            <label className="label-container" htmlFor="itemName-field">
                                Product Nummer
                                <input
                                    type="number"
                                    id="itemName-field"
                                    placeholder="voorbeeld 1010"
                                    name="name"
                                    value={productNumber}
                                    onChange={(e) => setProductNumber(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemName-field">
                                Product Naam
                                <input
                                    type="text"
                                    id="itemName-field"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemDescription-field">
                                product Informatie
                                <textarea
                                    id="itemDescription-field"
                                    name="description"
                                    value={productInfo}
                                    onChange={(e) => setProductInfo(e.target.value)}
                                    rows={3}
                                    cols={20}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemPrice-field">
                                Product Prijs in €
                                <input
                                    placeholder="verander komma naar punt 0.00"
                                    type="number"
                                    id="itemPrice-field"
                                    required name="price"
                                    min="0"
                                    step="0.01"
                                    title="Currency"
                                    value={productPrice}
                                    lang="en-US"
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="form-update-product-button"
                                >
                                    Product bijwerken
                                </button>
                            </div>

                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminUpdateProduct;