import React, {useContext} from "react";
import './UserProfile.css';
import {AuthContext} from "../../context/AuthContext";

function UserProfile() {
    const {
        user: {
            user_email, customer_firstname, customer_lastname,
            customer_street_name,
            customer_house_number,
            customer_house_number_additional,
            customer_city,
            customer_zipcode,
        }
    } = useContext(AuthContext);

    return(
        <>

        </>
    )
}

export default UserProfile;