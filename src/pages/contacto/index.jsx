import { Content } from "./components/Content";
import { ContactInfo } from "./components/ContactInfo";

function Contacto (){    

    return (
        <>
            <section className="flex min-h-screen py-12 px-24 justify-center items-center flex-col flex-wrap bg-gray-200">
                <Content/>
                <div className="w-full flex justify-center items-center mt-7">
                    <ContactInfo/>
                </div>
            </section>
            
        </>
    )
}

export {Contacto}