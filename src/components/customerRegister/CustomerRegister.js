import React from "react";

import "./CustomerRegister.css"
import axios from "axios";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef, useState, useEffect} from "react";
import {NavLink, useHistory} from "react-router-dom";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function CustomerRegister () {
    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);


    const [addSucces, toggleAddSucces] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, confirmPassword])

    // AANMAKEN VAN ACCOUNT
    async function registerUser(e) {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/users/create`, {
                userEmail: email,
                userPassword: password,
            });

            toggleAddSucces(true);

            setTimeout(() => {
                history.push('/login');

            }, 3000);

        } catch(e) {
            if (!e.response) {
                setErrorMessage('Er is geen server response');
            } else if (e.response.status === 409) {
                setErrorMessage('Email is al in gebruik');
            } else {
                setErrorMessage('Registratie mislukt.. Gebruikersnaam en/of email al in gebruik!')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            { addSucces ? (
                <section className="block-new-user-created-with-succes">
                    <h1>
                        Gelukt met het creëren van een Loahy account !!!
                    </h1>
                    <h3>
                        Je kan nu inloggen...
                    </h3>
                    <h3>
                        <NavLink to="/costumer" exact activeClassName="active-link"></NavLink>
                    </h3>
                </section>) : (
                <section className="block-new-costumer">
                    <form onSubmit={registerUser}>
                        <fieldset>
                            <legend>Loahy account aanmaken</legend>

                            <label htmlFor="email-field">
                                E-mailadres *
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"}/>
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="useremailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </label>
                            <p id="email-note" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Email is verplicht!<br/>
                                Let goed op spelfouten<br/>
                                bijvoorbeeld: Piet123@gmail.com<br/>
                            </p>

                            <label htmlFor="password-field">
                                Wachtwoord *
                                <input
                                    type="password"
                                    id="password-field"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="password-note"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                            </label>
                            <p id="password-note" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>

                                8 to 24 karakters.<br/>
                                Moet een hoofdletter, klein letter, cijfer en speciaal teken bevatten.<br/>
                                Toegestane speciale tekens: <span aria-label="exclamation mark">!</span> <span
                                aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm-password-field">
                                Bevestig wachtwoord *
                                <input
                                    type="password"
                                    id="confirm-password-field"
                                    name="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                    aria-invalid={setValidEmail ? "false" : "true"}
                                    aria-describedby="confirm-password"
                                    onFocus={() => setConfirmPasswordFocus(true)}
                                    onBlur={() => setConfirmPasswordFocus(false)}

                                />
                                <p id="confirm-password" className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Wachtwoorden moeten overeenkomen.
                                </p>
                            </label>
                            {errorMessage && <p className="error">Dit account bestaat al. Probeer een ander email-adres</p>}
                            <button
                                type="submit"
                                className="form-button"
                                disabled={!validEmail || !validPassword || !validConfirmPassword }>Registreer !
                            >
                                Registreren
                            </button>
                        </fieldset>
                    </form>
                </section>)
            }
        </>
    )
}

export default CustomerRegister;