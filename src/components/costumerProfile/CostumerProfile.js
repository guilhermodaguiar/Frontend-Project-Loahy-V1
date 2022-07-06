import React, {useContext} from "react";
import "./CostumerProfile.css";
import {UserAuthContext} from "../../context/UserAuthContext";

function CostumerProfile() {
    const { logout } = useContext(UserAuthContext);

    return(
        <>
            <div>
                <h1>
                    Profiel pagina
                </h1>
                <p>Hoi []!</p>
                <section>
                    <p>hier uitloggen</p>
                    <button type="button" onClick={logout}>
                      Uitloggen
                    </button>
                </section>
            </div>
        </>
    );
}

export default CostumerProfile;