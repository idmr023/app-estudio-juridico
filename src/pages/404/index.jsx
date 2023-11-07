import styled from "@emotion/styled";
import {ParticlesBackground} from "./components/ParticlesBG";
import {BotonSbt2} from "../../componentes/UI/form/botones";
import { Link } from "react-router-dom";

const Contenedor = styled.div`
    border-color: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: var(--blanco);
    z-index: +99;
    h1{
        text-align: center;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--blanco);
`

function Page404 (){

    return (
        <>
            <Contenedor>
                <h2>No hemos encontrado la página que buscas</h2>
                <BotonSbt2><StyledLink to="/">Volver al inicio</StyledLink></BotonSbt2>
            </Contenedor>
            <ParticlesBackground/>
        </>

    );
}

export default Page404
