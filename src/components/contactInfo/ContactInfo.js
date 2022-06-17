import React, {useState} from "react";


function ContactInfo() {

    const [messageValue, setMessageValue] = useState();
    const [checkedTerms, toggleCheckedTerms] = useState();


    function sendForm() {

    }
    return(
        <form>
            <input
                type="text"
                placeholder="Typ hier jouw bericht"
                name="message"
                className={messageValue.length > 20 ? 'input-error' : ''}
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
            />
            {messageValue.length > 20 && <p className="error-message">Dit bericht is te lang!</p>}

            <label htmlFor="terms-and-conditions">
                <input
                    type="checkbox"
                    name="terms-and-conditions"
                    id="terms-and-conditions"
                    checked={checkedTerms}
                    onChange={() => toggleCheckedTerms(!checkedTerms)}
                />

                Ik ga akkoord met de algemene voorwaarden
            </label>

            <button
                type="submit"
                disabled={!checkedTerms}
                onClick={sendForm}
            >
                Verstuur
            </button>
        </form>
    )
}

export default ContactInfo;