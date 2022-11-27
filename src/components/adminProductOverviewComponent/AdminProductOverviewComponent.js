import React, {useContext, useEffect, useState} from "react";

import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {GrUpdate} from "react-icons/gr";
import {FaFileUpload} from "react-icons/fa";

function AdminProductOverviewComponent() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [loading, toggleLoading] = useState(false);

    const [products, setProducts] = useState([]);

    const [productNumber, setProductNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');

    //POST Product
    async function sendItemData(e) {
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
        history.push('/')
    }


    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
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


    //GET ALL PRODUCTS
    useEffect(() => {
            async function fetchItems() {
                try {
                    const response = await axios.get(`http://localhost:8080/products`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        }
                    );
                    setProducts(response.data);

                } catch (e) {
                    console.error('Er is iets misgegaan!', e);
                }
            }
            fetchItems();
        }
        , [products])


    //DELETEPRODUCTS
    async function deleteItem(itemName) {
        try {
            await axios.delete(`http://localhost:8080/products/delete/${itemName}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e)
        }

        setTimeout(() => {
            history.push("/admin/profile");
        }, 400)

    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                (<div className="admin-route-container">
                        <div className="admin-route-container">
                            <div className="admin-route">
                                <h1>Moet ingelogd zijn als Admin</h1>
                            </div>
                        </div>
                    </div>
                )
                :
                (<>
                        <div className="products-overview">
                            <h1>Producten</h1>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>ProductNummer</th>
                                    <th>Foto</th>
                                    <th>Naam</th>
                                    <th>Informatie</th>
                                    <th>Prijs</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => {
                                    return <tr key={product.productId}>
                                        <td><IoCloseSharp size={20}
                                                          onClick={deleteItem(product.productId)}/></td>
                                        <td>{product.productId}</td>
                                        <td>{product.image &&
                                            <img src={product.image.url} alt={product.fileName}/>}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        <td>{product.productPrice}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div className={"item-update"}>
                            <div className="update-item-container">
                                <p>Update hier je product</p>
                                <p>Voer eerst het bestaande product Id om de product/item verder te wijzigen</p>
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
                                                    <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
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
                                        <GrUpdate/> Wijzig Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default AdminProductOverviewComponent;