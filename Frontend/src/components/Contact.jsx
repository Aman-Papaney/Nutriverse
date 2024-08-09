
const Contact = () => {
    return (
        <div className="container contact-form-container">

            <form className="contact-form track form">

                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="contact-name-input" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="contact-email-input" />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className="contact-message-input" rows="4" cols="50" />

                <button className="contact-submit-button">Submit</button>
            </form>

        </div>
    )
}

export default Contact
