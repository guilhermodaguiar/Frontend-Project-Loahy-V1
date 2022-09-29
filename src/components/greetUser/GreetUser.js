import './GreetUser.css';

import React, {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

function GreetUser() {
    const {user: {user_email}} = useContext(AuthContext);

    return(
        <>
            <section className="block-greetings-to-user">
                <div className="welcome-user">
                    <h1>Welkom</h1>
                    <h2>
                        {user_email}
                    </h2>
                </div>
            </section>
        </>
    )
}

export default GreetUser;