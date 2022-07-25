import "./AdminSignIn.css";
import {AdminAuthContext} from "../../context/AdminAuthContext";
import React, {useContext, useState} from 'react';
import axios from 'axios';

function AdminSignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const { login } = useContext(AdminAuthContext);

    async function adminLoginRequest(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const response = await axios.post(`http://localhost:8080/users/login`, {
                adminEmail: userEmail,
                adminPassword: password,
            });
            console.log(response.data);
            login(response.data.accessToken);
        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <>
            <div>
            <h1>Admin pagina</h1>
            <form onSubmit={adminLoginRequest}>
                <label htmlFor="email-field">
                    Emailadres
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password-field">
                    wachtwoord
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error"> Combinatie van emailadres en wachtwoord is onjuist</p>}

                <button
                    type="submit"
                    className="form-button"
                    >
                    Inloggen
                </button>
            </form>

        </div>
        </>

    );
}

export default AdminSignIn;