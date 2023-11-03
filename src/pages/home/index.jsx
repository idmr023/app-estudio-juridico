import Footer from '../../componentes/Footer';
import CardGroup from 'react-bootstrap/CardGroup';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import { BannerCard } from './components/bannerCard';
import { faAddressBook, faMoneyBill1, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Banner } from './components/banner';

function Home() {
    const BannerCards = styled.div`
    display: flex;
    justify-content: space-between;
`

    const bannerCardData = [
        { imagen: faTruckFast, descripcion: 'Entrega rápida', estiloColor: {color: '#7287ac'}},
        { imagen: faMoneyBill1, descripcion: 'Comodas cuotas', estiloColor: {color: '#7287ac'}},
        { imagen: faAddressBook, descripcion: 'Compra con comodidad', estiloColor: {color: '#7287ac'} },
        { imagen: faStar, descripcion: 'Productos favoritos', estiloColor: {color: '#7287ac'} },
    ];

    const texto = "lorem Ips et dolor sit amet, consectlorem Ips et dolor sit amet, consectlorem Ips et dolor sit amet, consect" ;

    const cardData = [
        {img: 'https://static.vecteezy.com/system/resources/previews/016/958/096/non_2x/price-tag-icon-design-free-vector.jpg', title: "Precios al alcance de tods los bolsillos", text: texto},
        {img: 'https://www.shutterstock.com/image-vector/time-icon-design-task-modern-260nw-1565123125.jpg', title: "Delivery rápido", text: texto},
        {img: 'https://static.vecteezy.com/system/resources/thumbnails/003/678/261/small/quality-badge-icon-design-medal-and-ribbon-illustration-free-vector.jpg', title: "Productos de calidad con garantía", text: texto},
    ]

    const Carta = ({ img, title, text}) => {
        const estilos = {
            backgroundColor : 'transparent',
            border:0,
            textAlign: 'center',
            alignItems: 'center',
        };   
        
        return (
            <Card style={estilos} >
                <Card.Img variant="top" src={img} style={{width: '250px'}}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

return (
    <>
        <Banner />

        <section className="banner">
            <h3 className="banner__subTitulo">Productos para ti</h3>
        
            <BannerCards>
                {bannerCardData.map((data, index) => (
                <BannerCard key={index} imagen={data.imagen} descripcion={data.descripcion} />
                ))}
            </BannerCards>
        </section>

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
        <br/>
    </>
    );
}

export default Home