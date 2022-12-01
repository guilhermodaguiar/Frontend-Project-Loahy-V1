import React, {useContext, useEffect, useState} from "react";

import './AdminContactUsComponent.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {AiTwotoneDelete} from "react-icons/ai";


function AdminContactUsComponent() {
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    const [remarks, setRemarks] = useState([]);

    async function deleteRemark(userEmail) {
        try {
            await axios.delete(`http://localhost:8080/contact-remarks/${userEmail}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {

        async function fetchContactUsData() {

            try {
                const response = await axios.get(`http://localhost:8080/contact-remarks`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setRemarks(response.data);
            } catch (e) {
                console.error('Er is iets misgegaan!', e);
            }
        }
        fetchContactUsData();
    }, []);

    return(
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>Moet ingelogd zijn als Admin</h1>
                        </div>
                    </div>
                )
                :
                (
                    <div className="contact-page" id="contact-remarks">Contact-formulier
                        <section>
                            <table>
                                <thead>
                                <tr>
                                    <th className="contact-delete"></th>
                                    <th className="contact-name">Naam</th>
                                    <th className="contact-email">E-mailadres</th>
                                    <th className="contact-phone">Telefoonnummer</th>
                                    <th className="contact-organisation">Organisatie</th>
                                    <th className="contact-remark-field">Onderwerp</th>
                                </tr>
                                </thead>
                                <tbody>
                                {remarks.map((contact) =>{
                                    return<tr key={contact.contactName}>
                                        <td>
                                            <button className="delete-button"
                                                    onClick={() => deleteRemark(contact.orderName)}>
                                                Verwijder<AiTwotoneDelete/>
                                            </button>
                                        </td>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.contactEmail}</td>
                                        <td>{contact.contactPhone}</td>
                                        <td>{contact.contactOrganisation}</td>
                                        <td>{contact.remark}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </section>
                    </div>
                )
            }
        </>
    )
}

export default AdminContactUsComponent;