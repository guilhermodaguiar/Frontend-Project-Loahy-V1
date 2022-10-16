import {createContext, useState} from "react";

export const WishlistContext = createContext({

});

//maak custom provider
function WishlistProvider({children}) {
    //state aanmaken
    //functies schrijven om die state te wijzigen
    //data object managen
    const [amountOfProducts, setAmountOfProducts] = useState(0)

    function addProduct() {
        setAmountOfProducts(amountOfProducts+1);
    }

    function removeProduct() {
        setAmountOfProducts(amountOfProducts -1);
    }

    const data = {
        list : amountOfProducts,
        addToWishlist: addProduct,
        removeFromWishlist: removeProduct,
    }

    return (
        <WishlistContext.Provider value={data}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider;