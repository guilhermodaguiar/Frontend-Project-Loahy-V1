import './GreetUser.css';

import React, {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

function GreetUser() {
    const {user: user_email} = useContext(AuthContext);

    return (
        <>
            <section className="greet-user-container">
                <div className="welcome-user">
                    <div className="welcome-user-outer-container">
                        <h1>Welkom</h1>
                    </div>
                    <div>
                        <h1>
                            {user_email}
                        </h1><
                    /div>
                </div>
            </section>
        </>
    )
}

export default GreetUser;