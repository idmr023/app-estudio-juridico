import React, { useContext }  from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { TodoContext } from "../TodoContext";

const ModalStyles = styled.div`
    background-color:rgba(32,35,41,.8);
    display:flex;
    justify-content:center;
    align-items:center;
    color:#fff;
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
`

function Modal({children}){
    const {setOpenModal} = useContext(TodoContext)
    
    return createPortal(
        // Para que se cierre al hacer click, fuera del formulario
        <ModalStyles onClick={() => setOpenModal(false)}> 
            {children}
        </ModalStyles>,
        document.getElementById('modal')
    );
}

export {Modal};