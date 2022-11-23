import {createContext, useEffect, useReducer, useState} from "react";
import axios from "axios";
import {wishlistReducer} from "./Reducers";

export const WishlistContext = createContext({});

function WishlistProvider({children}) {
    const [wishlistItems, setWishlistItems] = useState([]);


    useEffect(() => {
        async function getItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products`);
                console.log(itemData.data)
                setWishlistItems(itemData.data);
                dispatch2({
                    type: "SET_WISHLIST_ITEMS",
                    payload: itemData.data,
                })
            } catch (e) {
                console.error('er is iets misgegaan', e);
            }
        }
        getItemData();
    }, []);

    console.log(wishlistItems);

    const [state2,dispatch2] = useReducer(wishlistReducer, {
        wishlistItems: [],
        wishlist: [],
    })

    return (
        <WishlistContext.Provider value={{state2, dispatch2}}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider;