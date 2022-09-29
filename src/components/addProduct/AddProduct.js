import React, {useContext} from "react";
import './AddProduct.css';
import {useHistory} from "react-router-dom";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";


function AddProduct(props) {

    const history = useHistory();

    const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

    const addToCart = () => {
        const product = {
            productId: props.product_id,
            name: props.productName,
            price: props.productPrice,
            url: props.url
        }

        const exists = shoppingCart.find((x) => x.id === product.productId);
        if (exists) {
            setShoppingCart(
                shoppingCart.map((x, index) =>

                    x.id === product.productId ? {...exists, qty: exists.qty + 1} : x
                )
            );
        } else {
            setShoppingCart([...shoppingCart, {...product, qty: 1}]);
        }
        localStorage.setItem(shoppingCart, JSON.stringify(shoppingCart));
    };


    function redirect() {
        history.push(`products/${props.product_id}`)
    }

    return (
        <>
            <section className="product">

                <div className="info-marker-product"
                     onClick={redirect}>
                </div>

                <div className="AddItemsContainer">

                    <div className="buy_plus_button_container">
                        <button type="button"
                                onClick={addToCart}> +
                        </button>
                    </div>

                </div>

                <div className="container-ImageButton">
                    <div className="product-image">
                        <img alt={props.fileName} src={props.url}/>
                    </div>
                </div>

                <span className="container-TextPrice">

                         <span className="product-price">
                             <p> € {props.productPrice.toFixed(2)} </p>
                         </span>


                         <span className="product-text">
                             <h5> {props.productName} </h5>
                         </span>
                </span>

            </section>
        </>
    )
}

export default AddProduct;