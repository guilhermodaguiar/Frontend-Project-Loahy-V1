import React, {useContext} from "react";

import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useFormContext} from "react-hook-form";
import {useHistory} from "react-router-dom";
import './userInfoForm.css'

function UserInfoForm() {

    const {register, formState: {errors}, handleSubmit} = useFormContext();
    const message = "..dit veld is verplicht";
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');


    async function sendPersonData(customerData) {
        try {
            await axios.put(`http://localhost:8080/customer/${user.customer_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    userId: user.id,
                    customerFirstName: customerData.customer_firstname,
                    customerLastName: customerData.customer_lastname,
                    customerStreetName: customerData.customer_street_name,
                    customerHouseNumber: customerData.customer_house_number,
                    customerHouseNumberAddition: customerData.customer_house_number_addition,
                    customerCity: customerData.customer_city,
                    customerZipcode: customerData.customer_zipcode,
                    customerPhone: customerData.customer_phone,

                });

        } catch (e) {
            console.error(e);
        }
    }

    async function onSubmit(customerData) {
        try {
            await sendPersonData(customerData);

            setTimeout(() => {

                history.push('/customer')

            }, 500);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>

            <div className="UserInfo-Form-Container">
                <form className="user-info-form"
                      onSubmit={handleSubmit(onSubmit)}>

                    <h1> Wijzig hier uw persoonsgegevens</h1>
                    <p>Elk veld moet ingevuld zijn voordat u deze gegevens kunt opslaan.. </p>

                    <div className="form-names">

                        <label htmlFor="details-firstname">
                            Voornaam:
                            <input
                                type="text"
                                id="firstname"
                                {...register("customer_firstname", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Voornaam"

                            />
                        </label>
                        {errors.customer_firstname && <p className="form-error">{errors.customer_firstname.message}</p>}
                        <br/>

                        <label htmlFor="details-lastname">
                            Achternaam
                            <input
                                type="text"
                                id="lastname"
                                {...register("customer_lastname", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Achternaam"

                            />
                        </label>
                        {errors.customer_lastname && <p className="form-error">{customer.person_lastname.message}</p>}
                        <br/>

                    </div>

                    <div className="form-address">

                        <label htmlFor="details-street-name">
                            Straatnaam
                            <input
                                type="text"
                                id="street name"
                                {...register("customer_street_name", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Straatnaam"

                            />
                        </label>
                        {errors.customer_street_name && <p className="form-error">{errors.customer_street_name.message}</p>}
                        <br/>

                        <label htmlFor="details-house-number">
                            Huisnummer
                            <input
                                type="text"
                                id="house-number"
                                {...register("customer_house_number", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Huisnummer"

                            />
                        </label>
                        {errors.customer_house_number && <p className="form-error">{errors.customer_house_number.message}</p>}
                        <br/>


                        <label htmlFor="details-house-number-additional">
                            Toevoegingen
                            <input
                                type="text"
                                id="house-number-additional"
                                {...register("customer_house_number_additional", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Toevoegingen"

                            />
                        </label>
                        {errors.customer_house_number_add && <p className="form-error">{errors.customer_house_number_add.message}</p>}


                    </div>

                    <div className="form-address">

                        <label htmlFor="details-city">
                            Woonplaats
                            <input
                                type="text"
                                id="city"
                                {...register("customer_city", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Woonplaats"

                            />
                        </label>
                        {errors.customer_city && <p className="form-error">{errors.customer_city.message}</p>}
                        <br/>

                        <label htmlFor="details-zipcode">
                            Postcode
                            <input
                                type="text"
                                id="zipcode"
                                {...register("customer_zipcode", {
                                    required: {value: true, message: message}
                                })}
                                placeholder="Postcode"

                            />
                        </label>
                        {errors.customer && <p className="form-error">{errors.customer_zipcode.message}</p>}
                        <br/>

                    </div>

                    <button className="save-button">
                        Opslaan
                    </button>
                </form>
            </div>
        </>
    )
}

export default UserInfoForm;