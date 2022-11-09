import './CustomerLogIn.css';
import React, {useContext, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import axios from "axios";
import {RiLoginCircleFill} from "react-icons/ri";
import {MdAccountCircle} from "react-icons/md";
import {AiOutlineForm} from "react-icons/ai";
import {AuthContext} from "../../../context/AuthContext";


function CustomerLogIn2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login, isAuth} = useContext(AuthContext);
    const history = useHistory();


    async function userLoginRequest(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                userEmail: email,
                password: password,
            });

            console.log(response.data);
            if (response.data.authorities[0].authority === 'ROLE_USER') {
                login(response.data.jwt);

                setTimeout(() => {
                    history.push("/customer/profile");
                }, 1500)
            } else {
                history.push("/customer/login");
            }


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
                                <h3 className="customer-h3-header"><MdAccountCircle size={36}/>&nbsp;Ik heb een Loahy
                                    account</h3>
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
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </label>
                                            <label htmlFor="password-field">
                                                Wachtwoord:
                                                <input
                                                    type="password"
                                                    id="password-field"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </label>
                                            {error &&
                                                <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

                                            <button
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
                <h4>Inloggen succesvol!</h4>
                <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                <p>Mocht u niet automatisch doorgestuurd worden<br/>
                <NavLink to="/customer/profile">klik dan hier!</NavLink>
                </p>
                </span>)
            }
        </>
    );
}


export default CustomerLogIn2;
