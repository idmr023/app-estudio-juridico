import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext, useState } from 'react';
import { MenuContext } from '../contexts/MenuContext/MenuContext';
import { ShoppingCartContext } from '../contexts/CarritoContext';

export function Menu () {
    const {
        rutas,
    } = useContext(MenuContext)

    
  const context = useContext(ShoppingCartContext)
  const activeStyle = ' underline underline-offset-4'
  const [isActive, setActive] = useState(false)
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Link className="navbar-brand" to="/" >Inicio</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto flex flex-grow justify-between ">
                    {rutas.map((ruta) => (
                    <NavLink 
                    className={({ isActive }) => isActive ? activeStyle : undefined }
                        key={ruta.key} 
                        to={ruta.path}
                        onClick={() => context.setSearchByCategory(ruta.nombre.toLowerCase())} 
                    >{ruta.nombre}</NavLink> 
                ))}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}