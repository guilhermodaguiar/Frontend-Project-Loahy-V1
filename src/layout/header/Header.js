import React from "react";
import './Header.css';
import {HashLink as Link} from "react-router-hash-link";

function Header() {

    return(
        <>
            <div className="inner-container">
                <div className="home-page" >
                    <h1>Loahy</h1>
                    <Link to="#products">
                        <button
                            type="button"
                            //bij het clicken moet het Productpagina worden afgevuurd
                            onClick={()=>console.log("Jij wil shoppen!")}
                        >Shop nu
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;