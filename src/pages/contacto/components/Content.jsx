import { Card, CardGroup } from "react-bootstrap"
import styled from "styled-components"

const CardStyled = styled(CardGroup)`
    display: flex;
    .card{
        width: 300px;
        margin-right: 10px;
    }
    .card-body .card-img{
        display: flex;
        width: 200px;
        margin: 10px auto;
    }
`

export const Content = () =>{
    return (
        <>
            <h2>Contáctanos</h2>
            <CardStyled>
                <Card key="Light">
                    <Card.Body>
                        <Card.Title>Ofrecemos</Card.Title>
                        <Card.Text>Ofrecemos un compromiso firme en brindarte la mejor atención. Nuestra biblioteca cuenta con una cuidadosa selección de libros y recursos</Card.Text>
                        <Card.Img src="https://previews.123rf.com/images/sanek13744/sanek137442112/sanek13744211200060/178947504-icono-de-biblioteca-de-libros-en-estilo-plano-ilustración-de-vector-de-enciclopedia-sobre-fondo.jpg"/>
                    </Card.Body>
                </Card>
                <Card>
                        <Card.Body>
                            <Card.Title>Garantizamos</Card.Title>
                            <Card.Text>Cumplimiento total de las regulaciones y leyes bibliotecarias.<br/>
                            Honestidad y seriedad en todas nuestras políticas y cláusulas.<br/>
                            Trato equitativo y justo hacia nuestros usuarios y lectores.</Card.Text>
                            <Card.Img src="https://previews.123rf.com/images/sanek13744/sanek137442112/sanek13744211200060/178947504-icono-de-biblioteca-de-libros-en-estilo-plano-ilustración-de-vector-de-enciclopedia-sobre-fondo.jpg"/>
                        </Card.Body>
                </Card>
            </CardStyled>
        </>
    )
}