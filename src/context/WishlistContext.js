import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const WishlistContext = createContext({});

function WishlistProvider({children}) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const listQuantity = wishlistItems.reduce((quantity, item) => item.quantity + quantity, 0);

    useEffect(() => {
        async function getItemData(id) {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/${id}`);
                setWishlistItems(itemData.data);
            } catch (e) {
                console.error('er is iets misgegaan', e);
            }
        }

        getItemData();
    }, []);


    function getItemQuantity(id) {
        return wishlistItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseListQuantity(id) {
        setWishlistItems(currItems => {
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

    function decreaseListQuantity(id) {
        setWishlistItems(currItems => {
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

    function removeFromList(id) {
        setWishlistItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (
        <WishlistContext.Provider
            value={{listQuantity, getItemQuantity, increaseListQuantity, decreaseListQuantity, removeFromList}}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider;