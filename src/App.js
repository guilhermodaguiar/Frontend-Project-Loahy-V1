import React from "react";
import './App.css';
import Footer from "./layout/footer/Footer";
import { BrowserRouter as Router }from "react-router-dom";
import Routes from "./routing/Routes";
import NavBar from "./layout/navBar/NavBar";



function App() {
    return (
      <>
          <NavBar/>
          <Routes/>
          <Footer/>
      </>

  );
}

export default App;

