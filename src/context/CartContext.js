import React, {createContext, useEffect, useReducer, useState} from "react";
import {cartReducer} from "./Reducers";
import axios from "axios";


export const CartContext = createContext({});

function CartContextProvider({children}) {
    const [products, setProducts] = useState();


    useEffect(() => {
        async function getItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products`);
                console.log(itemData.data);
                setProducts(itemData.data);
                dispatch({
                    type: "SET_ITEMS",
                    payload: itemData.data,
                })

            } catch (e) {
                console.error('er is iets misgegaan', e);
            }
        }
        getItemData();
    }, []);

    console.log(products);


    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        cart: []
    })

    const value = {
        items:state.items,
        cart: state.cart,
    }


    return (
        <CartContext.Provider value={{state, dispatch, value}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;