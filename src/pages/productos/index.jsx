import React, {useContext } from "react";
import { Banner} from "./components/Banner";
import { ContainerProductos } from "./components/ContainerProductos"; 
import { GoUpContext } from "../../contexts/GoUp/GoUpContext";

export function Productos (){
    const {
        showButton,
        scrollToTop,
    } = useContext(GoUpContext)
    
    return (
        <>
            <Banner />
            <ContainerProductos 
                
                showButton={showButton}
                scrollToTop={scrollToTop}
            />
        </>

    )
}