import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const ContainerProductos = ({ showButton, scrollToTop }) => {
    const [libros, setLibros] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/list_vent_lbrs')
            .then((response) => {
                setLibros(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios desde el servidor:', error);
            });
    }, []);
    
    const categoriasUnicas = [...new Set(libros.map((libro) => libro.categoria))];

    return (
        <section className="productos">
        <h2 className="productos_subtitulo">Nuestros libros</h2>
        
        {categoriasUnicas.map((categoria, index) => (
            <div key={categoria} className="productos_contProd">
                <div key={index} className="contXcategoria">
                    {libros
                    .filter((libro) => libro.categoria === categoria)
                    .map((libro) => (
                        <li className="contXcategoria__subcontainer" key={libro.lbr_isbn}>
                        <div className="contXcategoria--iconProductos">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <img className="contXcategoria--img" src={libro.lbr_portada} alt={libro.lbr_titulo} />
                        <div className="contXcategoria--infoLibro">
                            <h2>{libro.lbr_titulo}</h2>
                            <p>{libro.lbr_autor}</p>
                        </div>
                        </li>
                    ))}
                </div>
            </div>
        ))}
        <div className="productos_iconUp">
            {showButton && (
            <FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} />
            )}
        </div>
        </section>
    );
    
};
