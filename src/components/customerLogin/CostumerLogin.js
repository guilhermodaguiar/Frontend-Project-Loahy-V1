import './CostumorLogin.css';
import React, {useContext, useState} from "react";

import {useForm} from "react-hook-form";
import {UserAuthContext} from "../../context/UserAuthContext";
import axios from "axios";

function CostumerLogin() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, formState: { errors }, register, watch } = useForm('');

    const { login } = useContext(UserAuthContext);

    async function makeLoginRequest() {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                //waarde van de invoerveld,
                email: 'piet.pieters@novi.nl',
                //waarde van de invoerveld van password,
                password: '123456',
            });
            console.log(response.data.accessToken);
            login(response.data.accessToken);

        } catch(e) {
            console.error(e);
            console.log(e.response);
            // state variable maken zodat er wordt gecommuniceerd naar de gebruiker
        }
    }

    function onFormSubmit(data) {
        // hier gebeurt er iets.. submit naar database
        console.log(data);
    }
    //Logica:
    // 1.wanneer iemand op de verlanglijst clicked --> komt Costumer account
    // 2. wanneer iemand op het product hartje drukt (voeg toe aan verlanglijstje) --> komt Costumer account
    // + (message " U moet inloggen if registreren om items aan uw verlanglijst toe te voegen"


    return(
        <>
            <div className="inlog-page">
                <h1>Inloggen</h1>
                <div className="block-costumer-container">
                    <form>
                        <fieldset>
                            <legend>Ik heb een Loahy account</legend>
                            <div className="field-note">Meld je aan met je e-mailadres en wachtwoord</div>

                            <label htmlFor="details-email">
                                E-mailadres *
                                <input
                                    type="email"
                                    id="costumer-email"
                                    value={email}
                                    changeHandler={setEmail}

                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}

                            <label htmlFor="password">
                                Wachtwoord *
                                <input
                                    type="password"
                                    id="user-password"
                                    value={password}
                                    changeHandler={setPassword}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}
                            <button type="button" onClick={makeLoginRequest}>
                                Inloggen
                            </button>
                        </fieldset>
                    </form>
                </div>
                <div className="block-costumer-container">
                    <div className="block-customer-usps"></div>
                    <div className="block-new-costumer"><form onSubmit={handleSubmit(onFormSubmit)}>
                        <fieldset>
                            <legend>Loahy account aanmaken</legend>
                            <label htmlFor="details-name">
                                Voornaam *
                                <input
                                    type="text"
                                    id="details-name"
                                    value={firstname}
                                    changeHandler={setFirstname}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}

                            <label htmlFor="details-name">
                                Achternaam *
                                <input
                                    type="text"
                                    id="details-name"
                                    value={lastname}
                                    changeHandler={setLastname}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}

                            <label htmlFor="details-email">
                                E-mailadres *
                                <input
                                    type="email"
                                    id="costumer-email"
                                    value={email}
                                    changeHandler={setEmail}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}

                            <label htmlFor="password">
                                Wachtwoord *
                                <input
                                    type="password"
                                    id="new-user-password"
                                    value={password}
                                    changehandler={setPassword}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}

                            <label htmlFor="confirm-user-password">
                                Bevestig wachtwoord *
                                <input
                                    type="password"
                                    id="new-user-password"
                                    value={password}
                                    changehandler={setPassword}
                                />
                            </label>
                            {errors.name && <p>{errors.name.message}</p>}
                            <button type="submit">
                                Account aanmaken
                            </button>
                        </fieldset>
                    </form></div>

                </div>
            </div>
        </>
    );
}


export default CostumerLogin;
