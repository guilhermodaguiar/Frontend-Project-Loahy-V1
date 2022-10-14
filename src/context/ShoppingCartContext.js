import React, {createContext, useState} from 'react';

export const ShoppingCartContext = createContext({
});

export function ShoppingCartContextProvider(props) {

    const [shoppingCart, setShoppingCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }





    const cartContextData = {
        cartQuantity: cartQuantity,
        getItemQuantity : getItemQuantity,
        increaseCartQuantity : increaseCartQuantity,
        decreaseCartQuantity : decreaseCartQuantity,
        removeFromCart : removeFromCart,
    }


    return (
        <ShoppingCartContext.Provider
            value={cartContextData}
        >
            {props.children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider;