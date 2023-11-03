import styled from "styled-components"

const ContainerContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    .card{
        width: 18rem;
        margin: 0 auto;
    }
    .card img{
        display: block;
        width: 35%;
        margin: 20px;
        box-shadow: 1px 5px 10px 0px #949494;
        border: none;
        border-radius: 10%;
        transition: all 0.3s ease;
    }
    .card img:hover{
        transform: scale(1.1);
        border-radius: 15%;
        transform: skew(1deg, 1deg);
    }
`

export const Content = () =>{
    return (
        <>
            <h2>Contáctanos</h2>
            <ContainerContent>
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card bg-light mb-3  mx-auto">
                        <div className="card-body">
                            <h5 className="card-title">Ofrecemos</h5>
                            <p className="card-text">Amplia vocación en atención a ustedes.
                            Sofisticados productos pensando en tu comodidad.
                            Capacitaciones personalizadas de acuerdo a tus consumos.
                            Amplia gama de servicios.<i className="ri-arrow-up-circle-fill up"></i></p>
                            <img src="https://thumbs.dreamstime.com/z/banco-transferencia-de-dinero-conexi%C3%B3n-bancaria-icono-ilustraci%C3%B3n-vector-transacci%C3%B3n-para-presentaci%C3%B3n-en-sitios-web-y-195768300.jpg"/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card text-white bg-info mb-3  mx-auto">
                        <div className="card-body">
                            <h5 className="card-title">Garantizamos</h5>
                            <p className="card-text">Total reglamentización de acuerdo a las leyes impuestas. <br/>
                            Fidelidad y seriedad de cláusulas impuestas por nosotros mismos.<br/>
                            Trato justo de acuerdo con nuestros clientes</p>
                            <img src="https://thumbs.dreamstime.com/z/banco-transferencia-de-dinero-conexi%C3%B3n-bancaria-icono-ilustraci%C3%B3n-vector-transacci%C3%B3n-para-presentaci%C3%B3n-en-sitios-web-y-195768300.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
            </ContainerContent>
        </>
    )
}