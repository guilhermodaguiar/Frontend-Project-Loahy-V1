import React from "react";
import {ReactComponent as InstagramIcon} from "../../assets/icons/instagram-svgrepo-com-3.svg";
import {ReactComponent as FacebookIcon} from "../../assets/icons/facebook-svgrepo-com-2.svg";
import {useState} from "react";

function ContactInfo() {
    const [messageValue, setMessageValue] = useState('');

    return(
        <>
            <div>
                <div>
                    <h2>Contact</h2>
                    <h3>Wil je meer weten over de producten of heb je andere vragen? Laat gerust een bericht achter!</h3>
                    <h3>KVK: 	82072272</h3>
                    <h3> Gevestigd te: Utrecht</h3>
                </div>
                <div>
                    <InstagramIcon className="social-media-icon" />
                    <FacebookIcon className="social-media-icon" />
                </div>
                <div>
                    <div>
                        <ul>
                            <li>Naam</li>
                            <li>E-mailadress</li>
                            <li>Telefoonnummer</li>
                            <li>Onderwerp</li>
                            <form>
                                <label htmlFor="form-message">
                                    bericht
                                    <input
                                        id="form-message"
                                        name="message"
                                        value={messageValue}
                                        placeholder="Laat hier je bericht achter"
                                        onChange={(e) => setMessageValue(e.target.value)}
                                    />
                                </label>
                            </form>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;