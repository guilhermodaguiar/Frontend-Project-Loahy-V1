import React from "react";

function HomePage() {

    return(
        <header id="id">
            <h1>Loahy</h1>
            <button
                type="button"
                //bij het clicken moet het Productpagina worden afgevuurd
                onClick={()=>console.log("Jij wil shoppen!")}
            >Shop nu</button>
        </header>
    )
}

export default HomePage;