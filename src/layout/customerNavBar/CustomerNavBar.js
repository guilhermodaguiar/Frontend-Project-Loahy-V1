import './CustomerNavBar.css'

import React from "react";
import {HashLink as Link} from "react-router-hash-link";


function CustomerNavBar() {

    return (
        <>
            <section className="customer-nav-bar-outer-container">
                <div className="customer-nav-bar-inner-container">
                    <div className="container-for-padding">
                        <Link to="/#customer/profile">
                            Profiel
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="#/customer/shopping-cart">
                            Winkelwagen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="#wishlist">
                            verlanglijstje
                        </Link>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CustomerNavBar
