import React from "react";

import "./CustomerRegister.css";
import axios from "axios";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef, useState, useEffect} from "react";
import {NavLink, useHistory} from "react-router-dom";
import RandomRobot from "../../../components/randomRobot/RandomRobot";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function CustomerRegister() {
    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [userEmail, setUserEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
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
        setValidUserEmail(EMAIL_REGEX.test(userEmail));
    }, [userEmail])

    useEffect(() => {
        setErrorMessage('');
    }, [userEmail, password, confirmPassword])

    // AANMAKEN VAN ACCOUNT

    async function registerUser(e) {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(userEmail);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/users/create", {
                userEmail: userEmail,
                userPassword: password,
            });

            toggleAddSucces(true);

            setTimeout(() => {
                history.push('/customer');

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
                    <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/customer" exact activeClassName="active-link">klik dan hier!</NavLink>
                    </p>
                </section>) : (
                    <div>
                        <div className="customer-register-page">
                            <h1 className="header-name">Registreren</h1>
                        </div>
                        <div className="customer-register-outer-container">
                            <div>
                                <h3 className="customer-h3-header">Loahy account aanmaken</h3>
                            </div>
                            <div className="customer-inner-container">
                                <div className="register-body">
                                    <section className="block-new-costumer">
                                        <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                                        <form
                                            className="form-container-register"
                                            onSubmit={registerUser}>

                                            <label>
                                                E-mailadres *
                                                <FontAwesomeIcon icon={faCheck} className={validUserEmail ? "valid" : "hide"}/>
                                                <FontAwesomeIcon icon={faTimes} className={validUserEmail || !userEmail ? "hide" : "invalid"}/>
                                            </label>


                                            <input
                                                type="email"
                                                id="email"
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                value={userEmail}
                                                required
                                                aria-invalid={validUserEmail ? "false" : "true"}
                                                aria-describedby="user-email-note"
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)}
                                            />

                                            <p id="email-note" className={emailFocus && userEmail && !validUserEmail ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>
                                                Email is verplicht!<br/>
                                            </p>

                                            <label htmlFor="password-field">
                                                Wachtwoord *
                                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"}/>
                                                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"}/>
                                            </label>

                                            <input
                                                type="password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                                aria-invalid={validPassword ? "false" : "true"}
                                                aria-describedby="password-note"
                                                onFocus={() => setPasswordFocus(true)}
                                                onBlur={() => setPasswordFocus(false)}
                                            />

                                            <p id="password-note" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>

                                                8 to 24 karakters.<br/>
                                                Moet een hoofdletter, klein letter, cijfer en een speciaal teken <br/>
                                                (!, @, #, $ of %)bevatten.<br/>
                                            </p>
                                            <label htmlFor="confirm-password-field">
                                                Herhaal wachtwoord *
                                            </label>

                                            <input
                                                type="password"
                                                id="confirm-password-field"
                                                name="password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                required
                                                aria-invalid={setValidUserEmail ? "false" : "true"}
                                                aria-describedby="confirm-password"
                                                onFocus={() => setConfirmPasswordFocus(true)}
                                                onBlur={() => setConfirmPasswordFocus(false)}

                                            />

                                            <p id="confirm-password" className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>
                                                Wachtwoorden moeten overeenkomen.
                                            </p>
                                            {errorMessage && <p className="error">Dit account bestaat al. Probeer een ander email-adres</p>}
                                            <button
                                                type="submit"
                                                className="form-button"
                                                disabled={!validUserEmail || !validPassword || !validConfirmPassword }>Registreer !
                                                >
                                                Registreren
                                            </button>
                                        </form>
                                    </section>
                                </div>
                                <div className="sign-in-body">
                                    <p className="form-footer">
                                        Ik heb al een Loahy account!<br/>
                                        <span className="line">
                                            <NavLink to="/customer" exact activeClassName="active-link">Login</NavLink>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CustomerRegister;