import "./CustomerRegister.css";

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useHistory} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import {MdAccountCircle} from "react-icons/md";
import {IoMdLogIn} from "react-icons/io";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function CustomerRegister() {

    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [street, setStreet] = useState('');
    const [validStreet, setValidStreet] = useState(false);
    const [streetFocus, setStreetFocus] = useState(false);

    const [houseNumber, setHouseNumber] = useState('');
    const [validHouseNumber, setValidHouseNumber] = useState(false);
    const [houseNumberFocus, setHouseNumberFocus] = useState(false);

    const [houseNumberAdd, setHouseNumberAdd] = useState('');
    const [validHouseNumberAdd, setValidHouseNumberAdd] = useState(false);
    const [houseNumberAddFocus, setHouseNumberAddFocus] = useState(false);

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [zipcode, setZipcode] = useState('');
    const [validZipcode, setValidZipcode] = useState(false);
    const [zipcodeFocus, setZipcodeFocus] = useState(false);

    const [phone, setPhone] = useState();
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);


    const [success, toggleSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setValidUserEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidFirstName(EMAIL_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(EMAIL_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidStreet(EMAIL_REGEX.test(street));
    }, [street])

    useEffect(() => {
        setValidHouseNumber(EMAIL_REGEX.test(houseNumber));
    }, [houseNumber])

    useEffect(() => {
        setValidHouseNumberAdd(EMAIL_REGEX.test(houseNumberAdd));
    }, [houseNumberAdd])

    useEffect(() => {
        setValidCity(EMAIL_REGEX.test(city));
    }, [city])

    useEffect(() => {
        setValidZipcode(EMAIL_REGEX.test(zipcode));
    }, [zipcode])

    useEffect(() => {
        setValidPhone(EMAIL_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, confirmPassword, firstName, lastName, street, houseNumber, houseNumberAdd, city, zipcode, phone])

    async function registerUser(e) {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/users/create", {
                userEmail: email,
                password: password,
                userFirstName: firstName,
                userLastName: lastName,
                userStreetName: street,
                userHouseNumber: houseNumber,
                userHouseNumberAddition: houseNumberAdd,
                userCity: city,
                userZipcode: zipcode,
                userPhone: phone,
            });

            console.log(response.data);
            toggleSuccess(true);

            setTimeout(() => {

                history.push('/customer/login');

            }, 2000);


        } catch (e) {
            if (!e?.response) {
                setErrorMessage('Geen server response');
            } else if (errorMessage.response?.status === 409) {
                setErrorMessage('Gebruikersnaam al in gebruik');
            } else {
                setErrorMessage('Registratie mislukt.. Gebruikersnaam en/of email al in gebruik!')
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? (
                <section className="block-new-user-created-with-succes">
                    <h1>
                        Gelukt met het creëren van een Loahy account !!!
                    </h1>
                    <h3>
                        Je kan nu inloggen...
                    </h3>
                    <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/customer/login">klik dan hier!</NavLink>
                    </p>
                </section>) : (
                <div>
                    <div className="customer-register-page">
                        <h1 className="header-name">Registreren</h1>
                    </div>
                    <div className="customer-register-outer-container">
                        <div>
                            <h3 className="customer-h3-header"><MdAccountCircle size={36}/>&nbsp;Loahy account aanmaken
                            </h3>
                        </div>
                        <div className="customer-inner-container">
                            <div className="register-body">
                                <section className="block-new-costumer">
                                    <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"}
                                       aria-live="assertive">{errorMessage}</p>

                                    <form
                                        className="form-container-register"
                                        onSubmit={registerUser}>

                                        <label>
                                            E-mailadres:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validUserEmail ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validUserEmail || !email ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="email"
                                            id="email"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            aria-invalid={validUserEmail ? "false" : "true"}
                                            aria-describedby="user-email-note"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />

                                        <p id="email-note"
                                           className={emailFocus && email && !validUserEmail ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Email is verplicht!<br/>
                                        </p>

                                        <label htmlFor="password-field">
                                            Wachtwoord:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validPassword ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validPassword || !password ? "hide" : "invalid"}/>
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

                                        <p id="password-note"
                                           className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>

                                            8 to 24 karakters.<br/>
                                            Hoofdletter, klein letter, cijfer en een speciaal teken <br/>
                                            (!, @, #, $ of %)bevatten.<br/>
                                        </p>
                                        <label htmlFor="confirm-password-field">
                                            Herhaal wachtwoord:
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

                                        <p id="confirm-password"
                                           className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Wachtwoorden moeten overeenkomen.
                                        </p>




                                        <label>
                                            Voornaam:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validFirstName ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validFirstName || !firstName ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="firstname"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                            aria-invalid={validFirstName ? "false" : "true"}
                                            aria-describedby="user-firstname-note"
                                            onFocus={() => setFirstNameFocus(true)}
                                            onBlur={() => setFirstNameFocus(false)}
                                        />

                                        <p id="firstname-note"
                                           className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Voornaam is verplicht!<br/>
                                        </p>

                                        <label>
                                            Achternaam:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validLastName ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validLastName || !lastName ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="lastname"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                            aria-invalid={validLastName ? "false" : "true"}
                                            aria-describedby="user-lastname-note"
                                            onFocus={() => setLastNameFocus(true)}
                                            onBlur={() => setLastNameFocus(false)}
                                        />

                                        <p id="lastname-note"
                                           className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Achternaam is verplicht!<br/>
                                        </p>

                                        <label>
                                            Straatnaam:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validStreet ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validStreet || !street ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="street-name"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setStreet(e.target.value)}
                                            value={street}
                                            required
                                            aria-invalid={validStreet ? "false" : "true"}
                                            aria-describedby="user-street-name-note"
                                            onFocus={() => setStreetFocus(true)}
                                            onBlur={() => setStreetFocus(false)}
                                        />

                                        <p id="street-name-note"
                                           className={streetFocus && street && !validStreet ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Straatnaam is verplicht!<br/>
                                        </p>

                                        <label>
                                            Huisnummer:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validHouseNumber ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validHouseNumber || !houseNumber ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="house-number"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setHouseNumber(e.target.value)}
                                            value={houseNumber}
                                            required
                                            aria-invalid={validHouseNumber ? "false" : "true"}
                                            aria-describedby="user-house-number-note"
                                            onFocus={() => setHouseNumberFocus(true)}
                                            onBlur={() => setHouseNumberFocus(false)}
                                        />

                                        <p id="house-number-note"
                                           className={houseNumberFocus && houseNumber && !validHouseNumber ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Huisnummer is verplicht!<br/>
                                        </p>

                                        <label>
                                            Toevoeging:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validHouseNumberAdd ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validHouseNumberAdd || !houseNumberAdd ? "hide" : "invalid"}/>
                                        </label>

                                        <input
                                            type="text"
                                            id="house-number-add"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setHouseNumberAdd(e.target.value)}
                                            value={houseNumberAdd}
                                            required
                                            aria-invalid={validHouseNumberAdd ? "false" : "true"}
                                            aria-describedby="user-house-number-add-note"
                                            onFocus={() => setHouseNumberAddFocus(true)}
                                            onBlur={() => setHouseNumberAddFocus(false)}
                                        />

                                        <p id="house-number-add-note"
                                           className={houseNumberAddFocus && houseNumberAdd && !validHouseNumberAdd ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Toevoeging is niet verplicht!<br/>
                                        </p>


                                        <label>
                                            Postcode:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validZipcode ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validZipcode || !houseNumber ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="zipcode"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setZipcode(e.target.value)}
                                            value={zipcode}
                                            required
                                            aria-invalid={validZipcode ? "false" : "true"}
                                            aria-describedby="user-email-note"
                                            onFocus={() => setZipcodeFocus(true)}
                                            onBlur={() => setZipcodeFocus(false)}
                                        />

                                        <p id="zipcode-note"
                                           className={zipcodeFocus && zipcode && !validZipcode ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Postcode is verplicht!<br/>
                                        </p>


                                        <label>
                                            Stad:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validCity ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validCity || !city ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="text"
                                            id="city"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                            required
                                            aria-invalid={validCity ? "false" : "true"}
                                            aria-describedby="user-email-note"
                                            onFocus={() => setCityFocus(true)}
                                            onBlur={() => setCityFocus(false)}
                                        />

                                        <p id="city-note"
                                           className={cityFocus && city && !validCity ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Stad is verplicht!<br/>
                                        </p>


                                        <label>
                                            Mobielnummer:
                                            <FontAwesomeIcon icon={faCheck}
                                                             className={validPhone ? "valid" : "hide"}/>
                                            <FontAwesomeIcon icon={faTimes}
                                                             className={validPhone || !phone ? "hide" : "invalid"}/>
                                        </label>


                                        <input
                                            type="number"
                                            id="phone-number"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                            required
                                            aria-invalid={validPhone ? "false" : "true"}
                                            aria-describedby="user-email-note"
                                            onFocus={() => setPhoneFocus(true)}
                                            onBlur={() => setPhoneFocus(false)}
                                        />

                                        <p id="email-note"
                                           className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                            Mobielnummer is verplicht!<br/>
                                        </p>







                                        <button
                                            type="submit"
                                            className="form-button"
                                            disabled={!validUserEmail || !validPassword || !validConfirmPassword}
                                        >
                                            <BsFillPencilFill/>&nbsp; Registreer
                                        </button>
                                    </form>
                                </section>
                            </div>
                            <div className="sign-in-body">
                                <p className="form-footer">
                                    <IoMdLogIn size={40}/>Ik heb al een Loahy account!<br/>
                                    <span className="line">
                                            <NavLink to="/customer/login">
                                               login
                                            </NavLink>
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