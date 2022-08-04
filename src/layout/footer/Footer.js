import React from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";

function Footer() {
    return(
        <>
            <footer>
                <div>
                    <h5>© 2022 Loahy Webdesign -Guilhermo d'Aguiar</h5>
                </div>
                <div className="footer-icons">
                    <div>
                        <a href="https://www.instagram.com/loahytree/">
                            <FaInstagram className="instagram-icon"/>
                        </a>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/Loahytree-109562478288311/?notif_id=1655164686624838&notif_t=aymt_page_post_reminder_14d_notification&ref=notif">
                            <FaFacebook className="facebook-icon"/>
                        </a>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;