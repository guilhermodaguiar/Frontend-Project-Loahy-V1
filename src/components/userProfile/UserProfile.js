import React, {useContext} from "react";
import './UserProfile.css';
import {AuthContext} from "../../context/AuthContext";

function UserProfile() {
    const {
        user: {
            user_id, customer_firstname, customer_lastname,
            customer_street_name,
            customer_house_number,
            customer_house_number_additional,
            customer_city,
            customer_zipcode,
            customer_phone,
        }
    } = useContext(AuthContext);

    return(
        <>
            <section className="userprofile-page">
                <div className="userprofile-container">

                    <span>
                         {customer_firstname} {customer_lastname}
                    </span>

                    <p>
                        {customer_street_name} {customer_house_number}-{customer_house_number_additional}
                    </p>

                    <p>
                        {customer_zipcode} {customer_city}
                    </p>
                    <p>
                        {customer_phone}
                    </p>

                </div>
            </section>
        </>
    )
}

export default UserProfile;