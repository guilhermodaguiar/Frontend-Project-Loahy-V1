import React from "react";

import './Home.css';
import ProductOverview from "../../components/productOverview/ProductOverview";
import AboutUsComponent from "../../components/aboutUsComponent/AboutUsComponent";
import ContactUsComponent from "../../components/contactUs/ContactUs";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import Header from "../../layout/header/Header";
import NavBar from "../../layout/navBar/NavBar";

function Home() {

   window.scrollTo({
      top:0,
       behavior: 'smooth'
   })

    return(
        <>
            <NavBar/>
            <ScrollIndicator/>
            <ScrollToTop/>
            <Header/>
            <ProductOverview/>
            <AboutUsComponent/>
            <ContactUsComponent/>
        </>
    )
}

export default Home;