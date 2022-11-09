import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {GrUpdate} from "react-icons/gr";
import {FaFileUpload} from "react-icons/fa";


function AdminProductComponent() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [loading, toggleLoading] = useState(false);

    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');



    async function sendItemData() {
        toggleLoading(true);
        try {
            await axios.post(`http://localhost:8080/products/`,
                {
                    productName: productName,
                    productDescription: productInfo,
                    productPrice: productPrice,
                }).then(addedNewProduct)

        } catch (e) {
            console.error(e);
        }
    }
    sendItemData();

    function addedNewProduct() {
        history.push('/')
    }

    async function sendImageData(id) {
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
                <div className={"item-add"}>
                    <div className="add-item-container">
                        <p>Voeg hier je product</p>
                        <p>Een product Id wordt automatisch gegenereerd, deze is terug te vinden in: Mijn producten
                        </p>
                    </div>
                    <div className="form-add-container">
                        <form className="add-item-form-"
                              onSubmit={sendItemData()}>
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
                                            <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
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
                                <GrUpdate/> Wijzig Product
                            </button>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminProductComponent;
