import React from 'react'
import { createContext } from "react";
import Home from "../../pages/home";
import { Productos } from "../../pages/productos";
import Login from "../../pages/registrarse/Login";
import {SingUp} from "../../pages/registrarse/SingUp";
import Smart from "../../pages/smart/Smart";
import { Contacto } from "../../pages/contacto";
import Page404 from "../../pages/404";
import { PagAyuda } from "../../pages/ayuda";
import { Delivery } from "../../pages/delivery";
import {Huevada} from "../../pages/huevada";

const MenuContext = createContext();

function MenuProvider({ children }) {
    const createRoute = (key, path, element, nombre) => ({
        key,
        path,
        element,
        nombre,
    });

    const rutasData = [
        { key: 1, path: "/", element: <Home /> },
        { key: 2, path: "/productos", element: <Productos />, nombre: "Productos" },
        { key: 3, path: "/login", element: <Login />, nombre: "Login" },
        { key: 4, path: "/registrarse", element: <SingUp />},
        { key: 5, path: "/cuenta", element: <Smart />, nombre: "Cuenta" },
        { key: 6, path: "/contacto", element: <Contacto />, nombre: "Contacto" },
        { key: 7, path: "*", element: <Page404 /> },
        // { key: 7, path: '/carrito', element: <Carrito filterProducts />, nombre: 'Carrito' },
        { key: 8, path: "/ayuda", element: <PagAyuda />, nombre: "Ayuda" },
        { key: 9, path: "/delivery", element: <Delivery />, nombre: "Delivery" },
        // { key: 9, path: "/productos/pedro", element: <ProductoDetalle nombre="Pedro" /> },
        {key: 10, path: "/huevada", element: <Huevada/>, nombre: "Test" },
    ];

    const rutas = rutasData.map((rutaData) => createRoute(rutaData.key, rutaData.path, rutaData.element, rutaData.nombre));

    return (
        <MenuContext.Provider value={{
            rutas,
        }}>{children}
        </MenuContext.Provider>
    );
}

export { MenuContext, MenuProvider };