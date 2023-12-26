import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts/CarritoContext';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Menu() {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = Object.keys(context.account).length === 0
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    const isUserSignOut = context.signOut || parsedSignOut

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
        localStorage.removeItem('account');
    }

    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <NavLink
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        key={3}
                        to="/cuenta"
                    >
                        Cuenta
                    </NavLink>
                    
                    <NavLink
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        key={4}
                        onClick = {() => handleSignOut()}
                        to="/"
                    >
                        Cerrar sesión
                    </NavLink>
                </>

            )
        } else {
            return (
                <NavLink
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                    key={4}
                    to="/login"
                >
                    Login
                </NavLink>)
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link className="navbar-brand" to="/">Inicio</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavDropdown className='ml-32' title="Productos" id="navbarScrollingDropdown">
                        <NavDropdown.Item href={`#action1`} key={9}>
                            <NavLink
                                to="/carrito"
                                onClick={() => context.setSearchByCategory("all")}
                            >
                                <p>Todos los productos</p>
                            </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Item href={`#action1`} key={10}>
                            <NavLink
                                to="/carrito/fantasía"
                                onClick={() => context.setSearchByCategory("fantasía")}
                            >
                                <p>Fantasía</p>
                            </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Item href={`#action1`} key={11}>
                            <NavLink
                                to="/carrito/aventuras"
                                onClick={() => context.setSearchByCategory("aventuras")}
                            >
                                <p>Aventuras</p>
                            </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Item href={`#action1`} key={12}>
                            <NavLink
                                to="/carrito/others"
                                onClick={() => context.setSearchByCategory("others")}
                            >
                                <p>Otros</p>
                            </NavLink>
                        </NavDropdown.Item>

                    </NavDropdown>

                    <Nav className="me-auto flex flex-grow justify-between ">
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            key={1}
                            to="/contacto"
                        >
                            Contacto
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            key={2}
                            to="/ayuda"
                        >
                            Ayuda
                        </NavLink>

                        {renderView()}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}