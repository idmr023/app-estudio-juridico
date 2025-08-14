import { faBalanceScale, faGavel, faHandshake, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BannerCard = ({ imagen, descripcion, estiloColor }) => (
    <div className="relative text-center mx-auto">
        <FontAwesomeIcon className="absolute left-full w-8 h-30 ml-3 mt-1" icon={imagen} style={estiloColor} />
        <p>{descripcion}</p>
    </div>
);

export function Home() {

    const bannerCardData = [
        { icono: faGavel, descripcion: 'Asesoría legal especializada', estiloColor: { color: '#1E3A8A' } },
        { icono: faBalanceScale, descripcion: 'Justicia y equidad en cada caso', estiloColor: { color: '#1E3A8A' } },
        { icono: faHandshake, descripcion: 'Compromiso con nuestros clientes', estiloColor: { color: '#1E3A8A' } },
        { icono: faShieldHalved, descripcion: 'Confidencialidad garantizada', estiloColor: { color: '#1E3A8A' } },
    ];

    const texto = [
        "Brindamos servicios de asesoría jurídica en distintas ramas del derecho: civil, penal, laboral, familiar y más.",
        "Con una atención personalizada y profesional, buscamos soluciones eficaces para cada cliente.",
        "Garantizamos acompañamiento legal con ética, responsabilidad y total confidencialidad."
    ];

    const cardData = [
        {
            img: 'https://cdn-icons-png.flaticon.com/512/1869/1869638.png',
            title: "Asesoría jurídica integral",
            text: texto[0]
        },
        {
            img: 'https://cdn-icons-png.flaticon.com/512/3405/3405801.png',
            title: "Atención personalizada",
            text: texto[1]
        },
        {
            img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            title: "Ética y compromiso",
            text: texto[2]
        },
    ];

    const Carta = ({ img, title, text }) => {
        return (
            <div className='bg-transparent border-0 text-center w-96'>
                <img className='flex w-72 mx-auto' src={img} alt={title} />
                <div className='m-10'>
                    <h1 className='text-2xl'>{title}</h1>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="bg-slate-800 w-full text-white p-5 mb-5">
                <h1 className="text-5xl">Estudio Jurídico<br />Daniel Roger Manrique Alvarado</h1>
                <p>Especialista en Derecho de Familia. <br />
                    Atención personalizada, confidencial y profesional en cada etapa del proceso legal.</p>
            </section >

            <section>
                <h3 className='text-3xl sm:text-4xl font-semibold ml-3 text-gray-800 tracking-wide'>Nuestros Servicios</h3>
                <div className='flex justify-between m-5'>
                    {bannerCardData.map((data, index) => (
                        <BannerCard key={index} imagen={data.icono} estiloColor={data.estiloColor} descripcion={data.descripcion} />
                    ))}
                </div>

                <div className='flex justify-between'>
                    {cardData.map((data, index) => (
                        <Carta
                            key={index}
                            img={data.img}
                            title={data.title}
                            text={data.text}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}