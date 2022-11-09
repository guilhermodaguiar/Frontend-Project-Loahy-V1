import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

export const CartContext = createContext({});

function CartContextProvider({children}) {

    const [cartItems, setCartItems] = useState([]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    useEffect(() => {
        async function getItemData(productId) {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/${productId}`);
                console.log(itemData);
                setCartItems(itemData.data);
            } catch (e) {
                console.error('er is iets misgegaan', e);
            }
        }

        getItemData()
    }, []);


    function getItemQuantity(productId) {
        return cartItems.find(item => item.productId === productId)?.quantity || 0
    }

    function increaseCartQuantity(productId) {
        setCartItems(currItems => {
            if (currItems.find(item => item.productId === productId) == null) {
                return [...currItems, {productId, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.productId === productId) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(productId) {
        setCartItems(currItems => {
            if (currItems.find(item => item.productId === productId)?.quantity === 1) {
                return currItems.filter(item => item.productId !== productId)
            } else {
                return currItems.map(item => {
                    if (item.productId === productId) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(productId) {
        setCartItems(currItems => {
            return currItems.filter(item => item.productId !== productId)
        })
    }

    return (<CartContext.Provider value={{
        cartItems,
        cartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    }}>
        {children}
    </CartContext.Provider>)
}

export default CartContextProvider;