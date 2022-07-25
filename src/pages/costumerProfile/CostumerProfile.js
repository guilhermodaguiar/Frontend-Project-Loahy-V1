import "./CostumerProfile.css";
import React, {useContext, useEffect, useState} from "react";
import {UserAuthContext} from "../../context/UserAuthContext";
import axios from "axios";

function CostumerProfile() {
    const [userData, setUserData] = useState({});
    const { user } = useContext(UserAuthContext);

    useEffect(() =>{
        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();
    }, [])

    return(
        <>
            <div>
                <h1>
                    Profiel pagina
                </h1>
                <p>Hoi {user.email}!</p>
                <section>
                    <h2>Gegevens</h2>
                    <p><strong>Naam:</strong> {user.username}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Adres:</strong>{user.adres}</p>
                    <p><strong>Telefoonnummer:</strong>{user.phone}</p>
                </section>

                {Object.keys(userData).length > 0 &&
                    <section>
                        <h2>Bestellingen</h2>
                        <h3>{user.title}</h3>
                        <p>{user.content}</p>
                    </section>}
                    <section>
                        <p>hier uitloggen</p>
                        <button type="button" onClick={user.logout}>
                            Uitloggen
                        </button>
                    </section>

            </div>
        </>
    )
}

export default CostumerProfile;