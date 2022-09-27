import React from "react";
import CustomerLogIn from "../../components/customerLogIn/CustomerLogIn";
import CustomerRegister from "../../components/customerRegister/CustomerRegister";

function Customer() {

    return(
        <>
            <CustomerRegister/>
            <CustomerLogIn/>
        </>
    )
}

export default Customer;