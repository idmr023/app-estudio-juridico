import {ParticlesBackground} from "./components/ParticlesBG";
import {BotonSbt2} from "../../componentes/UI/Botones/";
import { Link } from "react-router-dom";

function Page404 (){

    return (
        <>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white z-50">
                <h2>No hemos encontrado la página que buscas</h2>
                <BotonSbt2>
                    <Link className="no-underline text-white" to="/">Volver al inicio</Link>
                </BotonSbt2>
            </div>
            <ParticlesBackground/>
        </>

    );
}

export default Page404
