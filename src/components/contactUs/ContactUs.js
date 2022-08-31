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
            <main>
                <div className="contact-us-outer-container">
                    <div className="contact-us-outer-container-header">
                        <h1>Contact ons</h1>
                    </div>
                    <div className="contact-us-feedback">
                        <p>Wij houden van vragen en feedback - en we helpen iedereen zo graag! Hier zijn een aantal manieren om ons te bereiken.</p>
                    </div>
                    <div className="contact-us-inner-container">
                        <div>
                            <div className="contact-us-information">
                                <h3>Contact Informatie</h3>
                                <div className="contact-us-information-list">
                                    <p><KvK className="Kvk-icon"/>82072272</p>
                                    <p><HiLocationMarker/>Balistraat 42 3531PX Utrecht</p>
                                    <p><HiOutlineMail/>contact-ons@loahy.nl</p>
                                    <p><HiOutlinePhone/>+31-06-30399190</p>
                                </div>
                            </div>
                            <div className="contact-us-icons">
                                <div>
                                    <a className="instagram-icon" href="https://www.instagram.com/loahytree/">
                                        <FaInstagram size={22}/>
                                    </a>
                                </div>
                                <div>
                                    <a className="facebook-icon" href="https://www.facebook.com/Loahytree-109562478288311/?notif_id=1655164686624838&notif_t=aymt_page_post_reminder_14d_notification&ref=notif">
                                        <FaFacebook size={22}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="contact-us-contact-us">
                            <div>
                                <h3>Stuur ons een bericht</h3>
                                <p>Stuur ons een bericht en we reageren binnen 24 uur</p>
                                <form className="container-contact-form" onSubmit={handleContactSubmit}>
                                    <div>
                                        <div className="contact-us-section-containers">
                                            <section>
                                                <div>Naam</div>
                                                <input
                                                type="text"
                                                id="contact-fullName"
                                                placeholder="Naam en achternaam"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                required
                                            />
                                        </section>
                                            <section className="section-email">
                                                <div>E-mailadres</div>
                                                <input
                                                    type="email"
                                                    id="contact-email"
                                                    value={contactEmail}
                                                    onChange={(e) => setContactEmail(e.target.value)}
                                                    required
                                                />
                                            </section>
                                        </div>
                                        <div className="contact-us-section-containers">
                                            <section>
                                                <div>Telefoonnummer</div>
                                                <input
                                                    type="tel"
                                                    id="contact-phone"
                                                    value={contactPhone}
                                                    onChange={(e) => setContactPhone(e.target.value)}
                                                    pattern="[0-9]{10}"
                                                    required
                                                />
                                            </section>
                                            <section className="section-organisation">
                                                <div>Organisatie</div>
                                                <input
                                                    type="text"
                                                    id="contact-fullName"
                                                    placeholder="Optioneel"
                                                    value={contactOrg}
                                                    onChange={(e) => setContactOrg(e.target.value)}
                                                />
                                            </section>
                                        </div>
                                    </div>
                                    <div className="contact-us-section-containers">
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
                                    </div>
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


                </div>
            </main>
        </>
    )
}

export default ContactUs;