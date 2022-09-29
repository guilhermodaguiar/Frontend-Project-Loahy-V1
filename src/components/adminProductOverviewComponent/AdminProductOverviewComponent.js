import React, {useContext, useEffect, useState} from "react";

import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function AdminProductOverviewComponent() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [products, setProducts] = useState([]);


    useEffect(() => {

        async function fetchProducts() {

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
                console.error('Error: Er is iets misgegaan!', e);
            }
        }

        fetchProducts();

        return function cleanup() {
            token.cancel();
        }

    }, [token]);

    return(
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
                <div className="products-overview" id="admin-product-overview">
                    <h1>Producten</h1>
                    <table>
                    <thead>
                    <tr>
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
                            <td>{product.productId}</td>
                            <td>{product.file && <img src={product.file.url} alt={product.name}/>}</td>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.productPrice}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>) }
        </>
    )
}

export default AdminProductOverviewComponent;