import React, {useState} from 'react';

export const ShoppingCartContext = React.createContext({});

export const ShoppingCartContextProvider = (props) => {

    const [shoppingCart, setShoppingCart] = useState([])

    return (
        <ShoppingCartContext.Provider value={[shoppingCart, setShoppingCart]}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}