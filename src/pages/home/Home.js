import React from "react";
import ProductOverview from "../../components/productOverview/ProductOverview";
import AboutUsPage from "../../components/aboutUsPage/AboutUsPage";
import ContactUs from "../../components/contactUs/ContactUs";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import Header from "../../layout/header/Header";

function Home() {

   window.scrollTo({
      top:0,
       behavior: 'smooth'
   })

    return(
        <>
            <ScrollIndicator/>
            <ScrollToTop/>
            <Header/>
            <ProductOverview/>
            <AboutUsPage/>
            <ContactUs/>
        </>
    )
}

export default Home;