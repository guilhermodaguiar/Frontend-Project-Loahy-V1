import React, {createContext, useState} from 'react';

export const ShoppingCartContext = createContext({
});

export function ShoppingCartContextProvider(props) {

    const [shoppingCart, setShoppingCart] = useState([]);


    return (
        <ShoppingCartContext.Provider
            value={[shoppingCart, setShoppingCart]}
        >
            {props.children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider;