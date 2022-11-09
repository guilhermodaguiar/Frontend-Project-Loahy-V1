import './CustomerLogIn.css';
import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {RiLoginCircleFill} from "react-icons/ri";
import {MdAccountCircle} from "react-icons/md";
import {AiOutlineForm} from "react-icons/ai";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,11}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function CustomerLogIn() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [error, toggleError] = useState(false);
    const [succes, toggleSucces] = useState(false);


    useEffect(() => {
        setValidUserEmail(USER_REGEX.test(userEmail));
    }, [userEmail])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])



    async function userLoginRequest(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                userEmail: userEmail,
                password: password,
            });

            console.log(response.data);
            login(response.data.jwt);
            toggleSucces(true);

            setTimeout(() => {
                history.push("/customer/profile");
            }, 1500)

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }


    return (
        <>
            {!isAuth ? (
                    <div>
                        <div className="customer-inlog-page">
                            <h1 className="header-name">Inloggen</h1>
                        </div>
                        <div className="customer-register-outer-container">
                            <div>
                                <h3 className="customer-h3-header"><MdAccountCircle size={36}/>&nbsp;Ik heb een Loahy account</h3>
                            </div>
                            <div className="login-field-note">
                                Meld je aan met je e-mailadres en wachtwoord
                            </div>
                            <div className="customer-inner-container">

                                <div className="login-body">
                                    <section className="block-login-costumer">
                                        <form
                                            className="form-container-login"
                                            onSubmit={userLoginRequest}>


                                            <label htmlFor="email-field">
                                                E-mailadres:
                                                <input
                                                    type="email"
                                                    id="email-field"
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    value={userEmail}
                                                    required
                                                    aria-invalid={validUserEmail ? "false" : "true"}
                                                />
                                            </label>
                                            <label htmlFor="password-field">
                                                Wachtwoord:
                                                <input
                                                    type="password"
                                                    id="password-field"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    required
                                                    aria-invalid={validPassword ? "false" : "true"}
                                                />
                                            </label>
                                            {error &&
                                                <p className="error">Combinatie van email adres en wachtwoord is onjuist,
                                                    probeer het nog eens</p>}

                                            <button
                                                disabled={!validPassword || !validUserEmail}
                                                type="submit"
                                                className="form-button-login"
                                            >
                                                <RiLoginCircleFill/>&nbsp;Inloggen
                                            </button>
                                        </form>
                                    </section>
                                </div>
                                <div className="to-register-body">
                                    <p className="form-footer">
                                        <AiOutlineForm size={40}/>Ik heb geen Loahy account
                                        <span className="line">
                                            <NavLink to="/customer/register">
                                                Registreer
                                            </NavLink>
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
                <NavLink to="/profile" className="active-link">klik dan hier!</NavLink>
                </p>
                </span>)
            }

        </>
    );
}


export default CustomerLogIn;
