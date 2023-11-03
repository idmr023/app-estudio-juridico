import styled from "styled-components";
import "./css/estilos_contacto.css";
import { Content } from "./components/Content";
import { ContactInfo } from "./components/ContactInfo";

const SectionContact = styled.section`
    display: flex;
    min-height: 100vh;
    padding: 50px 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #92BEF9;
`

const ContainerInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`

function Contacto (){
    return (
        <>
            <SectionContact className="contact">
                <Content/>
                <ContainerInfo className="container">
                    <ContactInfo/>
                </ContainerInfo>
            </SectionContact>
        </>
    )
}

export {Contacto}