import React, {useEffect, useState} from "react";

import "./Product.css";
import axios from "axios";
import AddProduct from "../addProduct/AddProduct";


function Product() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchProducts() {
            setError('');
            try{
                const response = axios.get('http://localhost:8080/products/', {
                    cancelToken: source,
                });
                setProducts(response.data);

            } catch (e){
                console.error(e);
                setError('Er is iets misgegaan met het ophalen van de data. Probeer het nog eens');
            }
        }
        fetchProducts();

        //UNMOUNT
        return function cleanup() {
            //hier komt je cancel token
            console.log(`We gaan eraan!!`);
            source.cancel();
        }
    },[]);


    return (

        <>
            {products.map((product) => {

                return(
                product.image !== null ?
                    <AddProduct
                        key={product.productId}
                        url={product.image.url}
                        product_id={product.productId}
                        productName={product.productName}
                        productPrice={product.productPrice}
                />
                    :
                    <AddProduct
                        key={product.id}

                        product_id={product.productId}
                        productName={product.productName}
                        productPrice={product.productPrice}
                    />
                )
            })}
            <AddProduct/>
            {error && <p className="error">Dit account bestaat al. Probeer een ander email-adres</p>}
        </>
    );
}

export default Product;