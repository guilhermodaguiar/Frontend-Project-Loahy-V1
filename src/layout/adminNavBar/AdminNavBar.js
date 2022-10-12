import React, {useContext} from "react";

import './AdminNavBar.css';
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";

function AdminNavBar() {
const {user_email: { logout }} = useContext(AuthContext);

    return(
        <>
            <div className="inner-container">
            <nav className="admin-nav">
                <ul>
                    <li>
                        <Link to="/#admin-profile">
                            Profiel
                        </Link>
                    </li>
                    <li>
                        <Link to="/#admin-product-overview">
                            Producten
                        </Link>
                    </li>
                    <li>
                        <Link to="/#admin-add-new-product">
                            Product toevoegen
                        </Link>
                    </li>
                    <li>
                        <Link to="/#admin-new-products-update">
                            Producten updaten
                        </Link>
                    </li>
                    <li>
                        <Link to="/#new-products-update">
                            Producten bewerken
                        </Link>
                    </li>
                    <li>
                        <Link to="/#all-costumers">
                            Klanten
                        </Link>
                    </li>
                    <li>
                        <Link to="/#all-orders">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/#all-contact-remarks">
                            Contact Opmerkingen
                        </Link>
                    </li>
                    <li>
                        <Link to="#admin-about-us">
                            Over Ons
                        </Link>
                    </li>
                    <li>
                        <button className="logout-button"
                                type="button"
                                onClick={logout} >

                            Uitloggen

                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    )
}


export default AdminNavBar;

