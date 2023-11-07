import CardGroup from 'react-bootstrap/CardGroup';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import { BannerCard } from './components/bannerCard';
import { faAddressBook, faMoneyBill1, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Banner } from './components/banner';

const BannerCards = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`
const StyledCard = styled(Card)`
    background-color : 'transparent';
    border: 0;
    text-align: 'center';
    align-items: 'center';
    margin: 50px;
    .card-img-top{
        width: 300px; 
        height: 320px;
        margin: 0 auto;
    }
`

function Home() {


    const bannerCardData = [
        { icono: faTruckFast, descripcion: 'Entrega rápida', estiloColor: {color: '#2E6266'}},
        { icono: faMoneyBill1, descripcion: 'Comodas cuotas', estiloColor: {color: '#363636'}},
        { icono: faAddressBook, descripcion: 'Compra con comodidad', estiloColor: {color: '#2E6266'} },
        { icono: faStar, descripcion: 'Productos favoritos', estiloColor: {color: '#363636'} },
    ];

    const texto = [
        "Ofrecemos una amplia gama de productos y servicios a precios accesibles para satisfacer las necesidades de todos los presupuestos.",
        "¡Nuestro servicio de delivery rápido te ofrece comodidad en tu puerta en tiempo récord!",
        "Ofrecemos productos de calidad con garantía para satisfacer tus necesidades y superar tus expectativas."
    ];

    const cardData = [
        {img: 'https://static.vecteezy.com/system/resources/previews/016/958/096/non_2x/price-tag-icon-design-free-vector.jpg', title: "Precios al alcance de tods los bolsillos", text: texto[0]},
        {img: 'https://www.shutterstock.com/image-vector/time-icon-design-task-modern-260nw-1565123125.jpg', title: "Delivery rápido", text: texto[1]},
        {img: 'https://static.vecteezy.com/system/resources/thumbnails/003/678/261/small/quality-badge-icon-design-medal-and-ribbon-illustration-free-vector.jpg', title: "Productos de calidad con garantía", text: texto[2]},
    ]

    const Carta = ({ img, title, text}) => { 
        
        return (
            <StyledCard>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
            </StyledCard>
        )
    }

return (
    <>
        <Banner />

        <section>
            <h3>Productos para ti</h3>
            <BannerCards>
                {bannerCardData.map((data, index) => (
                <BannerCard key={index} imagen={data.icono} estiloColor={data.estiloColor} descripcion={data.descripcion} />
                ))}
            </BannerCards>
            {
                <CardGroup>
                    {cardData.map((data, index) => (
                        <Carta 
                            key ={index} 
                            img={data.img} 
                            title={data.title}
                            text={data.text}
                        />
                    ))}
                </CardGroup>
            }
        </section>

        
        {/* <Chatbot /> */}
    </>
    );
}

export default Home