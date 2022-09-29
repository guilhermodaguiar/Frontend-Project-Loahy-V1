import React, {useContext, useEffect, useState} from "react";

import './AdminContactUsComponent.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


function AdminContactUsComponent() {
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    const [contactUs, setContactUs] = useState('');
    const [updateSucces, toggleUpdateSucces] = useState(false);

    useEffect(() => {

        async function fetchContactUsData() {

            try {
                const response = await axios.get(`http://localhost:8080/orders`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setContactUs(response.data);

            } catch (e) {
                console.error('There was an error!', e);
            }
        }
        fetchContactUsData();

        return function cleanup() {
            token.cancel();
        }

    }, [token]);

    async function handleBrandSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/about-loahy', {
            });

            toggleUpdateSucces(true);
        } catch(e) {
            console.error('Error: er is iets misgegaan', e);
        }
    }

    return(
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>U moet ingelogd zijn als
                                <br/> ADMINISTRATOR
                                <br/>om deze content te mogen zien..
                            </h1>
                        </div>
                    </div>
                )
                :
                (
                    <div className="contact-page" id="contact-remarks">Contact-formulier
                        <form>
                            <table>
                                <thead>
                                <tr>
                                    <th className="contact-name">Naam</th>
                                    <th className="contact-email">E-mailadres</th>
                                    <th className="contact-phone">Telefoonnummer</th>
                                    <th className="contact-organisation">Organisatie</th>
                                    <th className="contact-remark-field">Onderwerp</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((contact) =>{
                                    return <tr key={contact.contactNumber}>
                                        <td>{contact.contactNumber}</td>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.contactEmail}</td>
                                        <td>{contact.contactPhone}</td>
                                        <td>{contact.contactOrganisation}</td>
                                        <td>{contact.remark}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default AdminContactUsComponent;