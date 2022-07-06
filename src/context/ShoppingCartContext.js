import {createContext, useState} from "react";

export const ShoppingCartContext = createContext({

});

//maak custom provider
function ShoppingCartProvider({children}) {
    //state aanmaken
    //functies schrijven om die state te wijzigen\
    //data object managen
    const [amountOfProducts, setAmountOfProducts] = useState(0)

    function addProduct() {
        setAmountOfProducts(amountOfProducts+1);
    }

    function removeProduct() {
        setAmountOfProducts(amountOfProducts -1);
    }

    const data = {
        cart: amountOfProducts,
        addToCArt: addProduct,
        removeFromCart: removeProduct,
    }

    return (
        <ShoppingCartContext.Provider value={data}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;


