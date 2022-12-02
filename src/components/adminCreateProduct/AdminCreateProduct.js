import "./AdminCreateProduct.css"

import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import {FaFileUpload} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import {RiErrorWarningLine} from "react-icons/ri";
import {IoIosAddCircle} from "react-icons/io";


function AdminCreateProduct() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [loading, toggleLoading] = useState(false);

    const {id} = useParams();

    const [productNumber, setProductNumber] = useState();
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState();

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');

//POST Product
    async function sendItemData() {
        toggleLoading(true);
        try {
            await axios.post(`http://localhost:8080/products/create`,
                {
                    productId: productNumber,
                    productName: productName,
                    productInformation: productInfo,
                    productPrice: productPrice,
                }).then(addedNewProduct)

        } catch (e) {
            console.error(e);
        }
    }

    function addedNewProduct() {
        history.push('/#shop')
    }

    async function sendImageData(e) {
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
                <div
                    className="item-add-container"
                    id="admin_add_new_product"
                >
                    <h2>Product Toevoegen<MdAddCircle size={25}/></h2>
                    <div className="add-item-container">
                        <p>Voeg hier je product</p>
                        <p>Een product Id wordt automatisch gegenereerd, deze is terug te vinden in: Mijn producten
                        </p>
                    </div>
                    <div className="form-container">
                        <form className="update-item-form-"
                              onSubmit={sendItemData()}>
                            <label htmlFor="itemId-field">
                                Product id:
                                <input
                                    type="number"
                                    id="itemId-field"
                                    name="id"
                                    value={productNumber}
                                    onChange={(e) => setProductNumber(e.target.value)}
                                />
                            </label>
                            <div>
                                <form onSubmit={sendImageData}>
                                    <label htmlFor="itemImage-field">
                                        Kies Afbeelding
                                        <input
                                            type="file"
                                            id="itemImage-field"
                                            name="image"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    {previewUrl &&
                                        <label>
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
                                        Upload
                                    </button>
                                </form>
                            </div>
                            <label htmlFor="itemName-field">
                                Product Naam
                                <input
                                    type="text"
                                    id="itemName-field"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="itemDescription-field">
                                product Informatie
                                <input
                                    type="text"
                                    id="itemDescription-field"
                                    name="description"
                                    value={productInfo}
                                    onChange={(e) => setProductInfo(e.target.value)}
                                />
                            </label>
                            <label htmlFor="itemPrice-field">
                                Product Prijs
                                <input
                                    type="number"
                                    id="itemPrice-field"
                                    name="price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <button
                                type="submit"
                                className="form-update-product-button"
                                disabled={loading}
                            >
                                <IoIosAddCircle/> Voeg producten toe
                            </button>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminCreateProduct;