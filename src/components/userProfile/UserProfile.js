import React, {useContext} from "react";
import './UserProfile.css';
import {AuthContext} from "../../context/AuthContext";

function UserProfile() {
    const {
        user: {
            customer_firstname, customer_lastname,
            customer_street_name,
            customer_house_number,
            customer_house_number_additional,
            customer_city,
            customer_zipcode,
            customer_phone,
        }
    } = useContext(AuthContext);

    return (
        <>
            <section className="userprofile-page">
                <div className="userprofile-container">

                    <div className="info-container">
                         {customer_firstname} {customer_lastname}
                    </div>

                    <div className="info-container">
                        {customer_street_name} {customer_house_number}-{customer_house_number_additional}
                    </div>

                    <div className="info-container">
                        {customer_zipcode} {customer_city}
                    </div>
                    <div className="info-container">
                        {customer_phone}
                    </div>

                </div>
            </section>
        </>
    )
}

export default UserProfile;