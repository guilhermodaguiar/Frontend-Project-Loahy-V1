import React, {useEffect} from "react";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import ProductOverview from "../../components/productOverview/ProductOverview";
import AboutUsPage from "../../components/aboutUsPage/AboutUsPage";
import ContactUs from "../../components/contactUs/ContactUs";
import NavBar from "../navBar/NavBar";
import ScrollIndicator from "../../components/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

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

   window.scrollTo({
      top:0,
       behavior: 'smooth'
   })


    return(
        <>
            <ScrollIndicator/>
            <ScrollToTop/>
            <NavBar/>
            <header>
                <div className="inner-container">
                    <div className="header-name" >
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
            </header>
            <ProductOverview/>
            <AboutUsPage/>
            <ContactUs/>
        </>

    )
}

export default HeaderPage;