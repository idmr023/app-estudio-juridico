import React from 'react'
import styled from 'styled-components'

const Boton = styled.button`
    background-color: var(--azul);
    color: var(--blanco);
    border-radius: 10px;
    padding: 15px;
    font-size: 40px;
    bottom: 10px;
    right: 10px; 
    cursor: pointer;
    box-shadow: 0px 5px 10px 0px rgba(49, 207, 255, 0.7); 
    width : 50px ;
    height: 50px;
    align-items: center;
`

function CreateTodoButton({setOpenModal}) {
    return (
        <Boton
            onClick={() => {setOpenModal(state => !state)}}
            >+
        </Boton>
    );
}

export {CreateTodoButton};