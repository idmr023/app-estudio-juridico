import styled from "@emotion/styled";
import {ParticlesBackground} from "./components/ParticlesBG";

const Contenedor = styled.div`
    border-color: #000;
    width: 150px;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    transform: translate(-50%, -50%);
    font-size: 40px;
    background-color: #fff;
    h1{
        text-align: center;
    }
    h1:hover{
    animation: 0.3s glitch infinite;
    }
    @keyframes glitch {
    0%{ text-shadow: red -4px 0, cyan 4px 0; }
    50%{ text-shadow: red 4px 0, cyan -4px 0; }
    100%{ text-shadow: red -4px 0, cyan 4px 0; }
    }
`

function Page404 (){

    return (
        <>
            <Contenedor>
                <h1>Hola</h1>
            </Contenedor>
            <ParticlesBackground/>
        </>

    );
}

export default Page404
