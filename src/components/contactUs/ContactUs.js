import './ContactUs.css';
import React from "react";
import {useState} from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";
import axios from "axios";
import {ReactComponent as KvK } from "../../assets/icons/kvk-logo.svg";
import {HiLocationMarker, HiOutlineMail, HiOutlinePhone} from "react-icons/hi";


function ContactUs() {
    

    const [remark, setRemark] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactOrg, setContactOrg] = useState('')

    //state voor functionaliteiten
    const [loading, toggleLoading] = useState(false);
    const [addSucces, toggleAddSucces] = useState(false);

    async function handleContactSubmit(e){
        e.preventDefault(e);
        toggleLoading(true);

        try{
            const response = await axios.post('http://localhost:8080/contactus', {
                contactName: contactName,
                contactEmail: contactEmail,
                contactPhone: contactPhone,
                contactOrganisation: contactOrg,
                remark: remark,
            });

            toggleAddSucces(true);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
        toggleLoading(false);
    }

    return(
        <>
            <div>
                <h1>Contact ons</h1>
                <p>Wij houden van vragen en feedback - en we helpen iedereen zo graag! Hier zijn een aantal manieren om ons te bereiken.</p>
                <div>
                    <h1>Contact Informatie</h1>
                    <p><KvK className="Kvk-icon"/>82072272</p>
                    <p><HiLocationMarker/>Balistraat 42 3531PX Utrecht</p>
                    <p><HiOutlineMail/>contact-ons@loahy.nl</p>
                    <p><HiOutlinePhone/>+31-06-30399190</p>
                </div>
                <div>
                    <FaInstagram/>
                    <FaFacebook/>
                </div>
                <div>
                    <div>
                        <h2>Stuur ons een bericht</h2>
                        <p>Stuur ons een bericht en we reageren binnen 24 uur</p>
                        <form onSubmit={handleContactSubmit}>
                            <section>
                                Naam
                                <input
                                    type="text"
                                    id="contact-fullName"
                                    placeholder="Naam en achternaam"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
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
                                Organisatie
                                <input
                                    type="text"
                                    id="contact-fullName"
                                    placeholder="Optioneel"
                                    value={contactOrg}
                                    onChange={(e) => setContactOrg(e.target.value)}
                                />
                            </section>
                            <section>
                                <textarea
                                    name="remark"
                                    id="remark-field"
                                    placeholder="Type hier je bericht"
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    rows={7}
                                    cols={50}
                                    required
                                />
                                </section>
                            <button
                                type="submit"
                                className="form-button"
                                disabled={ loading }
                                >Verzend
                                </button>
                            {addSucces === true && <p>Bedankt voor je bericht! Wij reageren binnen 24 uur </p>}
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;