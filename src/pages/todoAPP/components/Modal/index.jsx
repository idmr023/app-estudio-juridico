import React, { useContext, useState }  from "react";
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
    const [domReady, setDomReady] = React.useState(false)

    React.useEffect(() => {
        setDomReady(true)
    }, [])

    return (
        domReady && createPortal(
            <ModalStyles onClick={() => setOpenModal(false)}>
                {children}
            </ModalStyles>,
            document.getElementById('modal')
        )
    );

}

export {Modal};