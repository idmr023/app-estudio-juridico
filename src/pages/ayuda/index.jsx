import React, { useEffect, useState } from "react"
import styled from "styled-components"
import "./components/estilos_ayuda.css"

const Titulo = styled.h1`
    color: #3a3a3a;
	font-weight: 700;
	text-align: center;
	margin: 60px 0;
`

function Categorias({onCategoriaClick }) {
    const [categoriaActiva, setCategoriaActiva] = useState("acerca");

    const handleCategoriaClick = (categoria) => {
        setCategoriaActiva(categoria);
    };

    return (
        <>
            <div className="categorias" id="categorias">
                    <div
                        className={`categoria ${categoriaActiva === "acerca" ? "activa" : ""}`}
                        data-categoria="acerca"
                        onClick={() => handleCategoriaClick("acerca")}
                    >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.19 7h2.81v15h-21v-5h-2.81v-15h21v5zm1.81 1h-19v13h19v-13zm-9.5 1c3.036 0 5.5 2.464 5.5 5.5s-2.464 5.5-5.5 5.5-5.5-2.464-5.5-5.5 2.464-5.5 5.5-5.5zm0 1c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.5 8h-1v-.804c-.767-.16-1.478-.689-1.478-1.704h1.022c0 .591.326.886.978.886.817 0 1.327-.915-.167-1.439-.768-.27-1.68-.676-1.68-1.693 0-.796.573-1.297 1.325-1.448v-.798h1v.806c.704.161 1.313.673 1.313 1.598h-1.018c0-.788-.727-.776-.815-.776-.55 0-.787.291-.787.622 0 .247.134.497.957.768 1.056.344 1.663.845 1.663 1.746 0 .651-.376 1.288-1.313 1.448v.788zm6.19-11v-4h-19v13h1.81v-9h17.19z"/></svg>
                        <p>Sobre la Banca Móvil UTP</p>
                    </div>
                    
                    <div
                        className={`categoria ${categoriaActiva === "entregas" ? "activa" : ""}`}
                        data-categoria="entregas"
                        onClick={() => handleCategoriaClick("entregas")}
                    >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7 24h-5v-9h5v1.735c.638-.198 1.322-.495 1.765-.689.642-.28 1.259-.417 1.887-.417 1.214 0 2.205.499 4.303 1.205.64.214 1.076.716 1.175 1.306 1.124-.863 2.92-2.257 2.937-2.27.357-.284.773-.434 1.2-.434.952 0 1.751.763 1.751 1.708 0 .49-.219.977-.627 1.356-1.378 1.28-2.445 2.233-3.387 3.074-.56.501-1.066.952-1.548 1.393-.749.687-1.518 1.006-2.421 1.006-.405 0-.832-.065-1.308-.2-2.773-.783-4.484-1.036-5.727-1.105v1.332zm-1-8h-3v7h3v-7zm1 5.664c2.092.118 4.405.696 5.999 1.147.817.231 1.761.354 2.782-.581 1.279-1.172 2.722-2.413 4.929-4.463.824-.765-.178-1.783-1.022-1.113 0 0-2.961 2.299-3.689 2.843-.379.285-.695.519-1.148.519-.107 0-.223-.013-.349-.042-.655-.151-1.883-.425-2.755-.701-.575-.183-.371-.993.268-.858.447.093 1.594.35 2.201.52 1.017.281 1.276-.867.422-1.152-.562-.19-.537-.198-1.889-.665-1.301-.451-2.214-.753-3.585-.156-.639.278-1.432.616-2.164.814v3.888zm3.79-19.913l3.21-1.751 7 3.86v7.677l-7 3.735-7-3.735v-7.719l3.784-2.064.002-.005.004.002zm2.71 6.015l-5.5-2.864v6.035l5.5 2.935v-6.106zm1 .001v6.105l5.5-2.935v-6l-5.5 2.83zm1.77-2.035l-5.47-2.848-2.202 1.202 5.404 2.813 2.268-1.167zm-4.412-3.425l5.501 2.864 2.042-1.051-5.404-2.979-2.139 1.166z"/></svg>
                        <p>Sobre la cuenta de Ahorros y CTS</p>
                    </div>
                    
                    <div                        
                        className={`categoria ${categoriaActiva === "seguridad" ? "activa" : ""}`}
                        data-categoria="seguridad"
                        onClick={() => handleCategoriaClick("seguridad")}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z"/></svg>
                        <p>Sobre Tarjetas de Créditos</p>
                    </div>

                    <div                        
                        className={`categoria ${categoriaActiva === "cuenta" ? "activa" : ""}`}
                        data-categoria="cuenta"
                        onClick={() => handleCategoriaClick("cuenta")}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9.484 15.696l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm0-5l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm0-5l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm10.516 11.304h-8v1h8v-1zm0-5h-8v1h8v-1zm0-5h-8v1h8v-1zm4-5h-24v20h24v-20zm-1 19h-22v-18h22v18z"/></svg>
                        <p>Sobre los Créditos Personales</p>
                    </div>
                </div>
        </>
    );
}

function PreguntasFrecuentes({categoriaActiva, preguntas}) {

    const [preguntaActiva, setPreguntaActiva] = useState(null);
    const preguntasMostradas = preguntas.filter((pregunta) => pregunta.categoria === categoriaActiva);

    const togglePregunta = (index) => {
        if (preguntaActiva === index) {
            setPreguntaActiva(null);
        } else {
            setPreguntaActiva(index);
        }
    };

    return (
        <>
            <div className="preguntas">
                {preguntasMostradas.map((pregunta, index) => (
                    <div className="contenedor-pregunta" key={index}>
                        <p className="pregunta" onClick={() => togglePregunta(index)}>
                            {pregunta.pregunta}
                        </p>
                        {preguntaActiva === index && (
                            <p className="respuesta">{pregunta.respuesta}</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export function PagAyuda(){
    const [categoriaActiva, setCategoriaActiva] = useState("acerca");

    const handleCategoriaClick = (categoria) => {
        setCategoriaActiva(categoria);
    };

    const preguntas = [
        {
            categoria: "acerca",
            pregunta: "¿Cómo puedo acceder a mi cuenta bancaria (Débito/Crédito)?",
            respuesta: "Entra desde el Inicio y accede con tu cuenta de usuario y su respectiva contraseña.",
        },
        {
            categoria: "acerca",
            pregunta: "¿Cómo consulto mis saldos y movimiento de mis Cuentas de Ahorro?",
            respuesta: "Primero ingresa al app de Banca Móvil UTP con los datos de tu tarjeta y los 6 dígitos de tu clave de Internet, en la pantalla se mostrarán las cuentas que tienes, selecciona la cuenta que deseas consultar y se desplegará el detalle de tus movimientos.",
        },
        {
            categoria: "seguridad",
            pregunta: "Si abrí mi cuenta por la web, ¿puedo realizar operaciones en Banca por Internet o Banca Móvil?",
            respuesta: "Claro, solo acércate a nuestras oficinas para recoger tu tarjeta de débito (desde la plataforma digital o en ventanilla) y activa tu token Digital. Podrás realizar varias operaciones, como pagar tus servicios, hacer transferencias y mucho más sin necesidad de salir de casa. Recuerda que también debes crear tu Clave de Internet para poder acceder a estos canales, conoce cómo hacerlo aquí.",
        },
        {
            categoria: "cuenta",
            pregunta: "¿Se pueden hacer retiros de efectivo en otros bancos con mi tarjeta de débito?",
            respuesta: "Sí, pero se cobrarán las comisiones correspondientes, en el caso de la Cuenta Premio y Digital, el costo es de S/15.00 o $5.66, además si retiras en otros países, excepto EE.UU., se suma el costo fijo del 3% del monto de la transacción. En el caso de la Cuenta Ilimitada, los retiros de cajeros en otros bancos no tienen cobro.",
        },
    ];

    return (
        <>
            
            <main>
                <Titulo>Preguntas Frecuentes</Titulo>
                <Categorias onCategoriaClick={handleCategoriaClick} />
                <PreguntasFrecuentes categoriaActiva={categoriaActiva}  preguntas={preguntas} />                
            </main>
        </>
    )
}