import EmailSender from "./EmailSender"

export const ContactInfo  = () => {
    return (
        <>
            <div className="contactInfo">
                <div className="box">
                    <div className="icon"><img src="./img/logo/location-crosshairs-solid.svg" className="loguito" alt="/"/></div>
                    <div className="text">
                    <h3>Dirección</h3>
                    <p>Av. Av. Arequipa 234, <br/>Cercado de Lima, Lima</p>
                    </div>
                </div>

                    <div className="box">
                    <div className="icon"><img src="./img/logo/phone-solid.svg" className="loguito" alt=""/></div>
                    <div className="text">
                        <h3>Celular</h3>
                        <p>947 924 204</p>
                    </div>
                    </div>

                    <div className="box">
                    <div className="icon"><img src="./img/logo/envelope-solid.svg" className="loguito" alt=""/></div>
                    <div className="text">
                        <h3>Email</h3>
                        <p>bancoutp@utp.edu.pe</p>
                    </div>
                    </div>

                </div>

                <div className="contactForm">
                    <EmailSender/>
                </div>
        </>
    )    
} 