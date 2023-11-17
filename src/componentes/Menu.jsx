import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MenuContext } from '../contexts/MenuContext/MenuContext';
import { ShoppingCartContext } from '../contexts/CarritoContext';
import { NavDropdown } from 'react-bootstrap';

export function Menu() {
    const { rutasCombinadas } = useContext(MenuContext);
    const context = useContext(ShoppingCartContext);
    const activeStyle = ' underline underline-offset-4';

    function generarElementosMapeados(rutasCombinadas) {
        const elementosMapeados = [];

        for (let i = 8; i <= 16; i++) {
            const ruta = rutasCombinadas.find((r) => r.key === i);
            if (ruta) {
                elementosMapeados && elementosMapeados.push(
                    <NavDropdown.Item href={`#action1`} key={ruta.key}>
                        <NavLink
                            to={ruta.path}  
                            onClick={() => context.setSearchByCategory(ruta.nombre.toLowerCase())} 
                        >
                        <p>{ruta.nombre}</p>
                        </NavLink>
                        
                    </NavDropdown.Item>
                );
            }
        }

        return elementosMapeados;
    }
    
    function generarElementos(rutasCombinadas) {
        const elementosMapeados = [];

        for (let i = 1; i <= 7; i++) {
            const ruta = rutasCombinadas.find((r) => r.key === i);
            if (ruta) {
                elementosMapeados.push(
                    <NavLink
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        key={ruta.key}
                        to={ruta.path}
                    >
                        {ruta.nombre}
                    </NavLink>
                );
            }
        }

        return elementosMapeados;
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link className="navbar-brand" to="/">Inicio</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <NavDropdown className='ml-32' title="Productos" id="navbarScrollingDropdown">
                            {generarElementosMapeados(rutasCombinadas)}
                        </NavDropdown>

                        <Nav className="me-auto flex flex-grow justify-between ">
                            {generarElementos(rutasCombinadas)}
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}