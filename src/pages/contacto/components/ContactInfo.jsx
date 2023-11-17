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
            <div className="w-40 flex flex-col md:padding-20 md:w-full md:flex-col">
                <div className="relative py-5 px-0 flex">
                    <div className="w-14 h-16 bg-white flex items-center justify-center rounded-full text-2xl">
                        <FontAwesomeIcon icon={faLocationDot} />    
                    </div>
                        
                    <div className="flex ml-5 text-base flex-col font-light">
                        <h3 className="font-medium text-black">Dirección</h3>
                        <p className="font-light text-white">Av. Av. Arequipa 234, <br/>Cercado de Lima, Lima</p>
                        </div>
                    </div>

                    <div className="relative py-5 px-0 flex">
                        <div className="w-14 h-16 bg-white flex items-center justify-center rounded-full text-2xl">
                            <FontAwesomeIcon icon={faPhoneVolume} />    
                        </div>
                        <div className="flex ml-5 text-base flex-col font-light">
                            <h3 className="font-medium text-black">Celular</h3>
                            <p className="font-light text-white">947 924 204</p>
                        </div>
                    </div>

                    <div className="relative py-5 px-0 flex">
                        <div className="w-14 h-16 bg-white flex items-center justify-center rounded-full text-2xl">
                            <FontAwesomeIcon icon={faEnvelope} />    
                        </div>
                        <div className="flex ml-5 text-base flex-col font-light">
                            <h3 className="font-medium text-black">Email</h3>
                            <p className="font-light text-white">bancoutp@utp.edu.pe</p>
                        </div>
                    </div>

                </div>

                <div className="w-full">
                    <EmailSender
                        showButton={showButton}
                        scrollToTop={scrollToTop}
                    />
                </div>
        </>
    )    
} 