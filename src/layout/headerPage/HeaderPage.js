import React, {useEffect} from "react";
import NavBar from "../navBar/NavBar";
import axios from "axios";

function HeaderPage() {


    //minsa ki precies nos ta bay hinca akiden.. si e ta neccecario pa usa e useEffect.
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://api.chucknorris.io/jokes/random`)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);


    return(
        <header>
            <div className="inner-container">
                <div className="header-name">
                    <h1 >Loahy</h1>
                    <button
                        type="button"
                        //bij het clicken moet het Productpagina worden afgevuurd
                        onClick={()=>console.log("Jij wil shoppen!")}
                    >Shop nu</button>
                </div>
            </div>
        </header>
    )
}

export default HeaderPage;