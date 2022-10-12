import React, {useEffect, useState} from "react";

import "./Product.css";
import axios from "axios";
import AddProduct from "../addProduct/AddProduct";

function Product() {

    const [products, setProducts] = useState([]);



    useEffect(() => {
        async function fetchBreadProducts(e) {
            try {
                const response = await axios.get('http://localhost:8080/products/');

                setProducts(response.data);

            } catch (e) {
                console.error(e);
            }
        }
        fetchBreadProducts();
    }, []);


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

        </>
    );
}

export default Product;