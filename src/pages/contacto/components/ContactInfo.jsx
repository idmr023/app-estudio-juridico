import { useContext } from "react"
import EmailSender from "./EmailSender"
import { GoUpContext } from "../../../contexts/GoUp/GoUpContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLocationDot, faPhoneVolume } from "@fortawesome/free-solid-svg-icons"

export const ContactInfo  = () => {
    const {
        showButton,
        scrollToTop,
    } = useContext(GoUpContext)
    
    return (
        <>
            <div className="contactInfo">
                <div className="box">
                    <div className="icon">
                        <FontAwesomeIcon icon={faLocationDot} />    
                    </div>
                    <div className="text">
                    <h3>Dirección</h3>
                    <p>Av. Av. Arequipa 234, <br/>Cercado de Lima, Lima</p>
                    </div>
                </div>

                    <div className="box">
                    <div className="icon">
                        <FontAwesomeIcon icon={faPhoneVolume} />    
                    </div>
                    <div className="text">
                        <h3>Celular</h3>
                        <p>947 924 204</p>
                    </div>
                    </div>

                    <div className="box">
                    <div className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />    
                    </div>
                    <div className="text">
                        <h3>Email</h3>
                        <p>bancoutp@utp.edu.pe</p>
                    </div>
                    </div>

                </div>

                <div className="contactForm">
                    <EmailSender
                        showButton={showButton}
                        scrollToTop={scrollToTop}
                    />
                </div>
        </>
    )    
} 