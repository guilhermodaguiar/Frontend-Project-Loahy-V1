import React, {useEffect} from "react";
import './ShoppingCart.css';
import {IoCloseSharp} from "react-icons/io5";




function ShoppingCart(){

    useEffect(() => {

    }, []);

    return(
        <>
            <div className="content-for-shopping-cart" id="content">
                <h1>Winkelwagen</h1>
                <p>Je winkelwagen is momenteel leeg</p>
                <p>terug naar winkel</p>
            </div>
            <div className="notice -wrapper">
                <fieldset>
                    <form>
                        <table className="shop-table-responsive-cart" cellSpacing="0">
                            <thead>
                            <tr>
                                <th className="product remove"></th>
                                <th className="product-thumbnail"></th>
                                <th className="product-name">Product</th>
                                <th className="product-price">Prijs</th>
                                <th className="product-quantity">Aantal</th>
                                <th className="product-subtotal">Subtotaal</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="form-cart-item">
                                <td className="product remove"><IoCloseSharp/></td>
                                <td className="product-thumbnail">thumbnail-image</td>
                                <td className="product-name">product-naam</td>
                                <td className="product-price">product prijs</td>
                                <td className="product-quantity">
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="product-quantity"
                                        value="1"
                                        title="Aantal"
                                        inputMode="numeric"
                                        autoComplete="off"
                                    />
                                </td>
                                <td className="product-subtotal"></td>
                            </tr>
                            </tbody>
                        </table>

                    </form>
                </fieldset>


            </div>
        </>
    )

}

export default ShoppingCart;
