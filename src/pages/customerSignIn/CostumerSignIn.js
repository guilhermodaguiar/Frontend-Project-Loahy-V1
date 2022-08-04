import './CostumorSignIn.css';
import React, {useContext, useState} from "react";
import { useHistory } from 'react-router-dom'
import {UserAuthContext} from "../../context/UserAuthContext";
import axios from "axios";
import NavBar from "../../layout/navBar/NavBar";

function CostumerSignIn() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('')
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //state voor functionaliteiten
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [addSucces, toggleAddSucces] = useState(false);
    const history = useHistory();
    const { login } = useContext(UserAuthContext);

    // EXISTING USER
    async function userLoginRequest(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(`http://localhost:8080/users/login`, {
                userEmail: email,
                password: password,
            });
            console.log(result.data);
            login(result.data.accessToken);
            history.push("/user/login")
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    // AANMAKEN VAN ACCOUNT
    async function registerUser(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`http://localhost:8080/users`, {
                userName: name,
                userEmail: newEmail,
                password: newPassword,
            });

            toggleAddSucces(true);
        } catch(e) {
            console.error(e);
            console.log(e.response);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return(
        <>
            <NavBar/>
            <div className="inlog-page">
                <h1 className="header-name">Inloggen</h1>
            </div>
            <div className="sign-in-body">
                <div className="block-costumer-container">
                <form onSubmit={userLoginRequest}>
                    <fieldset>
                        <legend>Ik heb een Loahy account</legend>
                        <div className="field-note">Meld je aan met je e-mailadres en wachtwoord</div>

                        <label htmlFor="email-field">
                            E-mailadres *
                            <input
                                type="email"
                                id="email-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label htmlFor="password-field">
                            Wachtwoord *
                            <input
                                type="password"
                                id="password-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Inloggen
                        </button>
                    </fieldset>
                </form>
            </div>
                <div className="block-costumer-container">
                <div className="block-customer-usps"></div>
                <div className="block-new-costumer">
                    <form onSubmit={registerUser}>
                        <fieldset>
                            <legend>Loahy account aanmaken</legend>
                            {addSucces === true && <p> Gelukt! Je kan nu inloggen</p>}
                            <label htmlFor="name-field">
                                Naam en achternaam *
                                <input
                                    type="text"
                                    id="name-field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="email-field">
                                E-mailadres *
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </label>

                            <label htmlFor="password-field">
                                Wachtwoord *
                                <input
                                    type="password"
                                    id="password-field"
                                    name="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>

                            <label htmlFor="confirm-password-field">
                                Bevestig wachtwoord *
                                <input
                                    type="password"
                                    id="confirm-password-field"
                                    name="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>
                            {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres</p>}
                            <button
                                type="submit"
                                className="form-button"
                                disabled={ loading }
                            >
                                Registreren
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}


export default CostumerSignIn;
