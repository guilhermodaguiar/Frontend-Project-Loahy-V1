import './RandomRobot.css';

import React, {useContext, useEffect, useState} from "react";
import robot1 from '../../assets/robots/Lovepik_com-401280567-robot.png'
import robot2 from '../../assets/robots/Lovepik_com-611114674-Cute robot cartoon illustration.png'
import robot3 from '../../assets/robots/Lovepik_com-611115069-Cute robot cartoon illustration.png'
import robot4 from '../../assets/robots/Lovepik_com-610599430-Cartoon cute robot toy vector.png';
import robot5 from '../../assets/robots/Lovepik_com-611115071-Cute robot cartoon illustration.png'
import {CartContext} from "../../context/CartContext";
import {HiHeart} from "react-icons/hi";
import {BsFillCartPlusFill} from "react-icons/bs";
import {WishlistContext} from "../../context/WishlistContext";

function RandomRobot(id) {

    const images = [robot1, robot2, robot3, robot4, robot5];
    const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * images.length));
    const {increaseCartQuantity} = useContext(CartContext);
    const {increaseListQuantity} = useContext(WishlistContext);

    function changeImage() {

        function getRandomNumber(max) {
            return Math.floor(Math.random() * max)
        }

        setCurrentImageIndex(getRandomNumber(3));
    }

    useEffect(() => changeImage(), []);


    return (
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="wishlist-heart">
                            <HiHeart size={22}
                                     className="add-to-list-heart"
                                     onClick={() => increaseListQuantity(id)}
                            />
                        </div>
                        <div>
                            <img alt="randomRobot"
                                 src={images[currentImageIndex]}/>
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            hier komt data.productName
                        </strong>
                        <div className="product-price">
                            hier komt item-price
                        </div>
                        <div className="product-item-inner">
                            <div className="add-item-to-cart">
                                <button className="click-to-cart"
                                        onClick={() => increaseCartQuantity(id)}>
                                    <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RandomRobot;