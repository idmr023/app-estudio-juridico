import { faAddressBook, faMoneyBill1, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BannerCard = ({ imagen, descripcion, estiloColor}) => (
    <div className="relative text-center mx-auto">
        <FontAwesomeIcon className="absolute left-full w-8 h-30 ml-3 mt-1" icon={imagen} style={estiloColor} />
        <p>{descripcion}</p>
    </div>
);

export function Home() {

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
            <div  className='bg-transparent border-0 text-center w-96'>
                <img className='flex w-72 mx-auto' src={img} variant="top"/>
                <div className='m-10'>
                    <h1 className='text-2xl'>{title}</h1>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

return (
    <>
        <section className="bg-slate-500 w-full text-white p-5 mb-5">
            <h1 className="text-5xl">Proyecto <br/><span>Librería</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque 
                        expedita atque eveniet <br/> quis nesciunt. Quos nulla vero consequuntur, fugit nemo ad delectus 
                    <br/> a quae totam ipsa illum minus laudantium?</p>
        </section >

        <section>
            <h3 className='text-3xl ml-3'>Productos para ti</h3>
            <div className='flex justify-between m-5'>
                {bannerCardData.map((data, index) => (
                <BannerCard key={index} imagen={data.icono} estiloColor={data.estiloColor} descripcion={data.descripcion} />
                ))}
            </div>
            {
                <div className='flex justify-between'>
                    {cardData.map((data, index) => (
                        <Carta 
                            key ={index} 
                            img={data.img} 
                            title={data.title}
                            text={data.text}
                        />
                    ))}
                </div>
            }
        </section>
    </>
    );
}