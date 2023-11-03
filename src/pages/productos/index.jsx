import React, {useContext } from "react";
import { Banner} from "./components/Banner";
import { ContainerProductos } from "./components/ContainerProductos"; 
import { GoUpContext } from "../../contexts/GoUp/GoUpContext";
import { ProductosProvider } from "../../contexts/Productos/ProductosContext";

export function Productos (){
    const {
        showButton,
        scrollToTop,
    } = useContext(GoUpContext)
    
    return (
        <>  <ProductosProvider>
                <Banner />
                <ContainerProductos 
                    showButton={showButton}
                    scrollToTop={scrollToTop}
                />
            </ProductosProvider>
        </>

    )
}