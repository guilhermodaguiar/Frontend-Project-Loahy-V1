import React, {useContext, useState} from "react";

import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import './userInfoForm.css'

function UserInfoForm() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber ] = useState('');
    const [houseNumberAdd, setHouseNumberAdd ] = useState('');
    const [city, setCity ] = useState('');
    const [zipcode, setZipcode ] = useState('');
    const [phone, setPhone ] = useState('');


    async function sendCustomerData() {
        try {
            await axios.put(`http://localhost:8080/customer/${user.customer_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    userId: user.userId,
                    customerFirstName: firstName,
                    customerLastName: lastName,
                    customerStreetName: streetName,
                    customerHouseNumber: houseNumber,
                    customerHouseNumberAddition: houseNumberAdd,
                    customerCity: city,
                    customerZipcode: zipcode,
                    customerPhone: phone,
                });

        } catch (e) {
            console.error(e);
        }
    }

    async function addCustomerData(customerData) {
        try {
            await sendCustomerData(customerData);

            setTimeout(() => {

                history.push('/customer')

            }, 500);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>

            <div className="userInfo-Form-Container">
                <form className="user-info-form"
                      onSubmit={addCustomerData}>

                    <h1> Wijzig hier uw persoonsgegevens</h1>
                    <p>* Elk veld moet ingevuld zijn voordat u deze gegevens kunt opslaan </p>

                    <div className="form-names">

                        <label htmlFor="details-firstname">
                            Voornaam:
                            <input
                                type="text"
                                id="username-field"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Voornaam"
                            />
                        </label>
                        <label htmlFor="details-lastname">
                            Achternaam
                            <input
                                type="text"
                                id="username-field"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Achternaam"
                            />
                        </label>
                    </div>

                    <div className="form-address">
                        <label htmlFor="details-street-name">
                            Straatnaam
                            <input
                                type="text"
                                id="street-name-field"
                                value={streetName}
                                onChange={(e) => setStreetName(e.target.value)}
                                placeholder="Straat"
                            />
                        </label>
                        <label htmlFor="details-house-number">
                            Huisnummer
                            <input
                                type="text"
                                id="house-number"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                                placeholder="Huisnummer"

                            />
                        </label>
                        <label htmlFor="details-house-number-additional">
                            Toevoegingen
                            <input
                                type="text"
                                id="house-number-additional"
                                value={houseNumberAdd}
                                onChange={(e) => setHouseNumberAdd(e.target.value)}
                                placeholder="Toevoegingen"
                            />
                        </label>
                    </div>
                    <div className="form-address">
                        <label htmlFor="details-city">
                            Woonplaats
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Woonplaats"

                            />
                        </label>
                        <label htmlFor="details-zipcode">
                            Postcode
                            <input
                                type="text"
                                id="zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                placeholder="Postcode"
                            />
                        </label>
                        <label htmlFor="details-phone">
                            Telefoon nummer
                            <input
                                type="tel"
                                id="zipcode"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Postcode"

                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="save-button"
                        >
                        Opslaan
                    </button>
                </form>
            </div>
        </>
    )
}

export default UserInfoForm;