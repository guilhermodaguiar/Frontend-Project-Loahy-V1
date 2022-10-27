import {createContext, useState} from "react";

export const WishlistContext2 = createContext({

});

//maak custom provider
function WishlistProvider2(props) {
    const [wishlist, setWishlist] = useState([]);

    return (
        <WishlistContext2.Provider value={[wishlist, setWishlist]}>
            {props.children}
        </WishlistContext2.Provider>
    )
}

export default WishlistProvider2;