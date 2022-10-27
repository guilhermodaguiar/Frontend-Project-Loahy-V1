import {createContext, useState} from "react";

export const WishlistContext = createContext({

});

//maak custom provider
function WishlistProvider({children}) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const listQuantity = wishlistItems.reduce((quantity, item) => item.quantity + quantity, 0);

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

    const wishlistData = {
        quantity: getItemQuantity,
        list : wishlistItems,
        addToWishlist: increaseListQuantity,
        removeFromWishlist: decreaseListQuantity,
        removeWishlist: removeFromList,
    }

    return (
        <WishlistContext.Provider value={wishlistData}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider;