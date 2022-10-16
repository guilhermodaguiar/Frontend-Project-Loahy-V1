import React, {useContext} from "react";
import './Product.css';
import {CartContext} from "../../context/CartContext";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {useHistory} from "react-router-dom";
import {HiHeart} from "react-icons/hi";
import RandomRobot from "../randomRobot/RandomRobot";

function Product2({id, name, price, imgUrl}) {
    const history = useHistory();
    const {getItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
    // const quantity = getItemQuantity(id);

    const quantity = 1;

    function redirect() {
        history.push(`shop/${id}`);
    }


    return(
        <>
            <div className="">
                <div className="">
                    <div className="product-photo-wrapper">
                        {/*hier komt image*/}
                        <div className="product-image-photo">
                            <RandomRobot/>
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            {/*hier komt data.productName*/}
                        </strong>
                        <div className="product-price">
                        {/*hier komt item-price*/}
                        </div>
                        <div className="product-item-inner">
                            <div className="add-item-to-cart">
                            {/*    hier komt functie om naar cart toe te voegen*/}
                            </div>
                            <div className="wishlist-heart">
                                {/*hier komt functie hartje om op te clicken en naar wishlist te gaan
                                en ook de logica als er niet ingelogd moet het naar inlog pagina gaan : (naar wishlistpagina)*/}
                                <HiHeart size={22}/></div>
                        </div>
                    </div>
                </div>
            </div>




            {/*<div>*/}
            {/*    <HiHeart size={22}/>*/}
            {/*</div>*/}
            {/*<div className="item-image-container">*/}
            {/*    <image*/}
            {/*        src={imgUrl}*/}
            {/*        height="200px"*/}
            {/*        style={{ objectFit: "cover" }}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <span>{name}</span>*/}
            {/*    <span >{formatCurrency(price)}</span>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <div className="info-marker-product"*/}
            {/*         onClick={redirect}>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {quantity === 0? (*/}
            {/*        <div className="increase-item">*/}
            {/*            <button onClick={()=> increaseQuantity(id)}>*/}
            {/*                + of kies een svg*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*    ) : (*/}

            {/*        <div>*/}
            {/*            <div className="increase-item">*/}
            {/*                <button onClick={() => increaseQuantity(id)}>*/}
            {/*                    + of kies een svg*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="decrease-item">*/}
            {/*                <button onClick={() => decreaseQuantity(id)}>*/}
            {/*                    - of kies een svg*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <button*/}
            {/*                onClick={() => removeFromCart(id)}*/}
            {/*            >*/}
            {/*                Remove*/}
            {/*            </button>*/}


            {/*        </div>*/}

            {/*    )}*/}
            {/*</div>*/}
        </>
    )
}

export default Product2;