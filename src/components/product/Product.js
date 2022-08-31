import "./Product.css";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Product({toggleProductFunction, submitValue, image, title, description, price}) {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');

    useEffect(() =>{
        const source = axios.CancelToken.source();

        async function getProduct({image, title, despcription, price}) {
            setError('');
            try{
                //akinan bo GET request endpoint
                const response = axios.get(`https://api.chucknorris.io/jokes/random`, {
                    cancelToken: source,
                });
                //bo ta console log bo api endpoint pa tur e data (image, title, description)
                console.log(response.data.value)
                setProduct(response.data.value)
            } catch (e){
                console.error(e);
                setError('Er is iets misgegaan met het ophalen van de data. Probeer het nog eens');
            }
        }
        getProduct();

        //UNMOUNT
        return function cleanup() {
            //hier komt je cancel token
            console.log(`We gaan eraan!!`);
            source.cancel();
        }
    },[]);


    //akinan bo kier pone saca bo data anto hince den e article...
    return (
        <>
            <div className="products wrapper grid overview">
                <article className="product">
                    <h2 className="product-name">{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <p className="product-description">
                        {product.description}
                    </p>
                    <p className="product-price">{product.price}</p>
                    <button className="product-button" type="button" onClick={() => toggleProductFunction(!submitValue)}>
                        Toevoegen aan winkelwagen
                    </button>
                </article>
                {error && <p>{error}</p>}
            </div>

        </>
    );
}

export default Product;