import './App.css';
import Footer from "./layout/footer/Footer";
import { BrowserRouter as Router }from "react-router-dom";
import React from "react";
import UserAuthContextProvider from "./context/UserAuthContext";
import AdminAuthContextProvider from "./context/AdminAuthContext";
import Routes from "./routing/Routes";


function App() {
    return (
      <>
          <Router>
              <AdminAuthContextProvider>
                  <UserAuthContextProvider>
                        <Routes/>
                      <Footer/>
                  </UserAuthContextProvider>
              </AdminAuthContextProvider>
          </Router>
      </>

  );
}

export default App;

