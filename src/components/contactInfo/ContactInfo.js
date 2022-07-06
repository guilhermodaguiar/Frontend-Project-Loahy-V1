import './ContactInfo.css';
import React from "react";
import {useState} from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";


function ContactInfo({toggleContactFunction,submitContactValue}) {
    
    const [survey, toggleSurvey ] = useState('');
    const [remark, setRemark] = useState('');
    const [agreeTerms,toggleAgreeTerms] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    return(
        <>
            <div>
                <div>
                    <h2>Contact</h2>
                    <p>Wil je meer weten over de producten of heb je andere vragen? Laat gerust een bericht achter!</p>
                    <p>KVK: 	82072272</p>
                    <p> Gevestigd te: Utrecht</p>
                </div>
                <div>
                    <FaInstagram/>
                    <FaFacebook/>
                </div>
                <div>
                    <div>
                            <form>
                                <section>
                                    Naam
                                    <input
                                    type="text"
                                    id="contact-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    />
                                </section>
                                <section>E-mailadres
                                    <input
                                        type="email"
                                        id="contact-email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        required
                                    />
                                </section>
                                <section>Telefoonnummer
                                    <input
                                        type="tel"
                                        id="contact-phone"
                                        value={contactPhone}
                                        onChange={(e) => setContactPhone(e.target.value)}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </section>
                                <section>
                                    Hoe heb je ons gevonden
                                    <select
                                        name="survey" id="contact-survey"
                                        value={survey}
                                        onChange={(e) => toggleSurvey(e.target.value)}
                                        required
                                    >
                                        <option value="social-media">Social Media</option>
                                        <option value="friend">door een vriend</option>
                                        <option value="Search-engine">Search engine</option>
                                        <option value="Ad">Advertentie</option>
                                        <option value="other">Anders</option>
                                    </select>
                            </section>
                                <section>
                                    <label htmlFor="remark-field">Onderwerp</label>
                                    <textarea
                                        name="remark"
                                        id="remark-field"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        rows={7}
                                        cols={50}
                                        required
                                    />
                                </section>
                                <section>
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        id="agree-field"
                                        value={agreeTerms}
                                        onChange={(e) => toggleAgreeTerms(e.target.checked)}
                                        required
                                    />
                                    <label htmlFor="agree-field">Ik ga akkoord met de voorwaarden</label>
                                </section>

                                <button
                                    type="submit"
                                    onClick={toggleContactFunction(!submitContactValue)}
                                >Verzend

                                </button>
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;