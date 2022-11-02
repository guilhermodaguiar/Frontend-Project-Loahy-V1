import React, {createContext, useState} from "react";
import axios from "axios";

export const CartContext = createContext({});

function CartContextProvider({children}) {

    const [cartItems, setCartItems] = useState([]);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    async function getItemData(id) {
        try {
            const itemData = await axios.get(`http://localhost:8080/products/${id}`);
            setCartItems(itemData.data);
        } catch (error) {
            console.error('er is iets misgegaan', error);
        }
        getItemData();
    }


    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (<CartContext.Provider value={{
        cartQuantity, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart,
    }}>
        {children}
    </CartContext.Provider>)
}

export default CartContextProvider;