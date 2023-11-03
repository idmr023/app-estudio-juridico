import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ProductosContext } from "../../../contexts/Productos/ProductosContext";

export const ContainerProductos = ({ showButton, scrollToTop }) => {
    const {
        cursos,
    } = useContext(ProductosContext)

    const categoriasUnicas = [...new Set(cursos.map((curso) => curso.categoria))];

    return (
        <div>
            <h2 className="subtitulo">Nuestros cursos</h2>
            <nav>
            <ul>
                {categoriasUnicas.map((categoria) => (
                    <div key={categoria} className="contenidoPrincipal-cursos">
                    <h3>{categoria}</h3>
                    <div className="contenedor--categoria">
                        {cursos
                        .filter((curso) => curso.categoria === categoria)
                        .map((curso, index) => (
                            <li className="contenedor--categoria__subcontainer" key={index}>
                                <a href={curso.link}>{curso.nombre_prod}</a>
                                <span className="contenedorIcono">
                                    <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="Icon-container-check"
                                    />
                                </span>
                            </li>
                        ))}
                    </div>
                    </div>
                ))}
                {showButton && (
                <FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} style={{ position: "absolute" }} />
                )}
            </ul>
            </nav>
        </div>
    );
};