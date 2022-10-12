import './CustomerLogIn.css';
import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {useFormContext} from "react-hook-form";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,11}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function CustomerLogIn() {
    const history = useHistory();
    const { login, isAuth } = useContext(AuthContext);

    const {register, formState: {errors}, handleSubmit} = useFormContext();

    const [userEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [password] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [error, toggleError] = useState(false);
    const [succes, toggleSucces] = useState(false);


    useEffect(() => {
        setValidUserEmail(USER_REGEX.test(userEmail));
    }, [userEmail])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])


    // EXISTING USER
    async function userLoginRequest(e) {
        e.preventDefault();
        toggleError(false);
        toggleSucces(true);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                userEmail: e.email,
                userPassword: e.password,
            });

            console.log(response.data);
            //zoek uit
            login(response.data.accessToken);

            setTimeout(() => {
                history.push("/customer/main");
            },3000)

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }


    return(
        <>
            { !isAuth ? (
                <div>
                    <div className="customer-inlog-page">
                        <h1 className="header-name">Inloggen</h1>
                    </div>

                    <div className="customer-register-outer-container">
                        <div>
                                <h3 className="customer-h3-header">Ik heb een Loahy account</h3>
                        </div>
                        <div className="field-note">
                            <p>Meld je aan met je e-mailadres en wachtwoord</p>
                        </div>
                        <div className="customer-inner-container">

                            <div className="login-body">
                                <section className="block-login-costumer">
                                    <form
                                        className="form-container-login"
                                        onSubmit={handleSubmit(userLoginRequest)}>


                                        <label htmlFor="email-field">
                                            E-mailadres:
                                            <input
                                                type="email"
                                                id="email-field"
                                                {...register("userEmail", {
                                                    required: "email-adres is verplicht!",
                                                })}
                                                aria-invalid={validUserEmail ? "false" : "true"}
                                            />
                                        </label>
                                        {errors.userEmail && <p>{errors.userEmail.message}</p>}
                                        <label htmlFor="password-field">
                                            Wachtwoord:
                                            <input
                                                type="password"
                                                id="password-field"
                                                {...register("password", {
                                                    required: "wachtwoord is verplicht!"
                                                })}
                                                aria-invalid={validPassword ? "false" : "true"}
                                            />
                                        </label>
                                        {error.userPassword && <p>{error.userPassword.message}</p>}
                                        {error && <p className="error">Combinatie van email adres en wachtwoord is onjuist, probeer het nog eens</p>}

                                        <button
                                            disabled={!validPassword || !validUserEmail}
                                            type="submit"
                                            className="form-button"
                                        >
                                            Inloggen
                                        </button>
                                    </form>
                                </section>
                            </div>
                            <div className="to-register-body">
                                <p className="form-footer">
                                    Ik heb geen Loahy account<br/>
                                    <span className="line">
                                    <NavLink to="customer/register" exact activeClassName="active-link">Registreer</NavLink>
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>)
                :
                (<span className="inlog-customer-successful">
                <h1>Inloggen succesvol!</h1>
                <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                <p>Mocht u niet automatisch doorgestuurd worden<br/>
                <NavLink to="/customer/main" exact activeClassName="active-link">klik dan hier!</NavLink>
                </p>
                </span>)
            }

        </>
    );
}


export default CustomerLogIn;
