import "./AdminProfile.css";
import React, {useContext, useEffect, useState} from 'react';
import {AdminAuthContext} from "../../context/AdminAuthContext";
import axios from "axios";
import UploadImage from "../../helpers/UploadImage";
import { HashLink as Link } from "react-router-hash-link";

function AdminProfile() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [addSucces, toggleAddSucces] = useState(false);
    const [updateSucces, toggleUpdateSucces] = useState(false);
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [brandTitle, setBrandTitle] = useState('');
    const [brandStory, setBrandStory] = useState('')


    const { user } = useContext(AdminAuthContext);


    useEffect(() => {
        async function fetchUsers() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                setUsers(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchUsers();
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/products`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProducts();
    }, []
    )

    async function addProduct(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/products', {
                productName: productName,
                productInformation: productInfo,
                productQuantity: productQuantity,
                productPrice: productPrice,
            });

            toggleAddSucces(true);
        } catch(e) {
            console.error(e);
            console.log(e.response);
        }
    }

    async function handleBrandSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/about-loahy', {

            });

            toggleUpdateSucces(true);
        } catch(e) {
            console.error(e);
            console.log(e.response);
        }
    }




    return (
        <>
            <div>
                <nav className="admin-nav">
                    <ul>
                        <li>
                            <Link to="#products">
                                Producten
                            </Link>
                        </li>
                        <li>
                            <Link to="#new-products">
                                Product toevoegen
                            </Link>
                        </li>
                        <li>
                            <Link to="#all-costumers">
                                Alle klanten
                            </Link>
                        </li>
                        <li>
                            <Link to="#open-orders">
                                Open Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="#orders">
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="#contact-remarks">
                                Contact Ons
                            </Link>
                        </li>
                        <li>
                            <Link to="#about-us">
                                Over Ons
                            </Link>
                        </li>
                    </ul>
                </nav>

                <h1>Admin profiel pagina</h1>
                <p>Hoi {user.userEmail}</p>

                <section>
                    <h2>Gegevens</h2>
                    <p><strong>Gebruikersnaam</strong> {user.userName}</p>
                    <p><strong>Email:</strong>{user.userEmail}</p>
                </section>
                {Object.keys(users).length > 0 &&
                    <section>
                        <h2>Strikt geheime admin-content</h2>
                        <h3>{users.title}</h3>
                        <p>{users.content}</p>
                    </section>}
                <section className="admin-field">
                    <div className="products-overview" id="products">
                        <h1>Producten</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>ProductNumber</th>
                                <th>Foto</th>
                                <th>Naam</th>
                                <th>Informatie</th>
                                <th>Hoeveelheid</th>
                                <th>Prijs</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => {
                                return <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.file && <img src={product.file.url} alt={product.name}/>}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.productInformation}</td>
                                    <td>{product.productQuantity}</td>
                                    <td>{product.productPrice}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="add new product" id="new-products">Nieuw product toevoegen
                        {addSucces === true && <p>Product is toegevoegd!</p>}
                        <form onSubmit={addProduct}>
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
                            <label htmlFor="product-information">
                                Product informatie
                                <input
                                    type="text"
                                    name="product-information-field"
                                    id="product-information"
                                    value={productInfo}
                                    onChange={(e) => setProductInfo(e.target.value)}/>
                            </label>
                            <label htmlFor="product-quantity">
                                Product hoeveelheid
                                <input
                                    id="number"
                                    name="product-quantity"
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}/>
                            </label>
                            <label>
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
                    </div>
                    <div className="registered-users" id="all-costumers">Klanten
                        <form>
                            <h1>Alle klanten</h1>
                            <table className="costumer-data-table">
                                <thead>
                                <tr>
                                    <th className="customer-id">klant-id</th>
                                    <th className="customer-name">Naam en achternaam</th>
                                    <th className="customer-email">email-adres</th>
                                    <th className="customer-adres">adres</th>
                                    <th className="customer-phone">telefoon/mobiel</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) =>{
                                    return <tr key={user.userNumber}>
                                        <td>{user.userNumber}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.userAdres}</td>
                                        <td>{user.userPhone}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="open-orders" id="open-orders">Open Orders
                        <form>
                            <table>
                                <thead>
                                <tr>
                                    <th className="client_id">klant-id</th>
                                    <th className="order_nummer">order-nummer</th>
                                    <th className="order_field"></th>
                                    <th className="handle_order"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th className="client_id">klant-id</th>
                                    <th className="order_nummer">order-nummer</th>
                                    <th className="order_field">Back-end_data met product, en aantal en subtotaal</th>
                                    <th className="handle_order">verwerk button met ja en nee en wanneer verwerkt moet het het naar een link gaan naar email adres </th>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="history-orders" id="orders">History Orders
                        <form>
                            <table>
                                <thead>
                                <tr>
                                    <th className="client_id">klant-id</th>
                                    <th className="order_nummer">order-nummer</th>
                                    <th className="order_field"></th>
                                </tr>
                                </thead>
                                <tb>
                                    <tr>
                                        <th className="client_id">klant-id</th>
                                        <th className="order_nummer">order-nummer</th>
                                        <th className="order_field">Back-end_data met product, en aantal en subtotaal</th>
                                    </tr>
                                </tb>
                            </table>
                        </form>
                    </div>
                    <div className="contact-page" id="contact-remarks">Contact-formulier
                        <form>
                            <table>
                                <thead>
                                <tr>
                                    <th className="contact-name">Naam</th>
                                    <th className="contact-email">E-mailadres</th>
                                    <th className="contact-phone">Telefoonnummer</th>
                                    <th className="contact-organisation">Organisatie</th>
                                    <th className="contact-remark-field">Onderwerp</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((contact) =>{
                                    return <tr key={contact.contactNumber}>
                                        <td>{contact.contactNumber}</td>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.contactEmail}</td>
                                        <td>{contact.contactPhone}</td>
                                        <td>{contact.contactOrganisation}</td>
                                        <td>{contact.remark}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="about-us-page" id="about-us">
                        <form onSubmit={handleBrandSubmit}>
                            <section>
                                <label htmlFor="about-us-title">
                                    Titel:
                                    <input
                                        type="text"
                                        id="about-us-title"
                                        placeholder="type je titel"
                                        value={brandTitle}
                                        onChange={(e) => setBrandTitle(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="about-us-story">
                                    <input
                                        type="text"
                                        id="about-us-story"
                                        placeholder="type je verhaal"
                                        value={brandStory}
                                        onChange={(e) => setBrandStory(e.target.value)}
                                    />
                                </label>
                            </section>
                            {updateSucces === true && <p>Je "Over Ons!" pagina is up to date!</p>}
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </section>
                <section>
                    <p> hier uitloggen</p>
                    <button type="button" onClick={ user.logout }>
                        Uitloggen
                    </button>
                </section>
            </div>
        </>

    );
}

export default AdminProfile;