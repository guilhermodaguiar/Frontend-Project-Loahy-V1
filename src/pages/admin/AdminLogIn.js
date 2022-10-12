import React, {useContext, useEffect, useState} from 'react';
import "./AdminLogIn.css";
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import {useFormContext} from "react-hook-form";
import {NavLink, useHistory} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,11}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function AdminLogIn() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);

    const {register, formState: {errors}, handleSubmit} = useFormContext();

    const [adminEmail] = useState('');
    const [validAdminEmail, setValidAdminEmail] = useState(false);

    const [adminPassword] = useState('');
    const [validAdminPassword, setValidAdminPassword] = useState(false);

    const [error, toggleError] = useState(false);
    const [succes, toggleSucces] = useState(false);


    useEffect(() => {
        setValidAdminEmail(USER_REGEX.test(adminEmail));
    }, [adminEmail])

    useEffect(() => {
        setValidAdminPassword(PWD_REGEX.test(adminPassword));
    }, [adminPassword])



    async function adminLoginRequest(e) {
        e.preventDefault();
        toggleError(false);
        toggleSucces(true);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                userEmail: e.email,
                userPassword: e.password,
            });

            console.log(response.data);

            if (response.data.authorities[0].authority === 'ROLE_ADMIN') {
                login(response.data.jwt);

                setTimeout(() => {

                    history.push("/admin/main");
                },3000)
            } else {

                history.push("/admin");
            }

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <>
            { !isAuth ? (
                <div>
                    <div className="admin-page">
                        <h1 className="admin-h1" >Admin pagina</h1>
                    </div>
                    <div className="admin-sign-in-body">
                        <div className="outer-container">
                            <div className="inner-container-admin">

                                <form
                                    className="form-container-admin"
                                    onSubmit={handleSubmit(adminLoginRequest)}>
                                    <label htmlFor="email-field">
                                        E-mailadres
                                        <input
                                            type="email"
                                            id="email-field"
                                            name="email"
                                            {...register("adminEmail", {
                                                required: "email-adres is verplicht!"
                                            })}
                                            aria-invalid={validAdminEmail ? "false" : "true"}
                                            placeholder="admin email-adres"
                                        />
                                    </label>
                                    {errors.userEmail && <p>{errors.userEmail.message}</p>}
                                    <label htmlFor="password-field">
                                        Wachtwoord:
                                        <input
                                            type="password"
                                            id="password-field"
                                            name="password"
                                            {...register("password", {
                                                required: "wachtwoord is verplicht!"
                                            })}
                                            aria-invalid={validAdminPassword ? "false" : "true"}
                                            placeholder="wachtwoord"
                                        />
                                    </label>
                                    {errors.userPassword && <p>{errors.userPassword.message}</p>}
                                    {error && <p className="error-admin-login"> Combinatie van email-adres en wachtwoord is onjuist</p>}

                                    <button
                                        disabled={!validAdminPassword || !validAdminEmail}
                                        type="submit"
                                        className="form-button"
                                    >
                                        Inloggen
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                )
                : (
                    <span className="inlog-admin-successful">
                        <h1> Inloggen succesvol!</h1>
                        <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                        <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/admin/main" exact activeClassName="active-link">klik dan hier!</NavLink>
                        </p>
                    </span>
                )
            }
        </>

    );
}

export default AdminLogIn;