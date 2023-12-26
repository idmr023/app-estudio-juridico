import React from "react";
import styled from "styled-components";

const Container = styled.div`
    h1{
        text-align: center;    
        margin-top: 20px;
    }
`

const InputStyles = styled.input`
    width: 200px;
    max-width: auto;
    padding: 10px;
    margin: 20px;
    text-align: center;
    font-size: 20px;
    border: 3px solid var(--azul);
    border-radius: 15px ;
`
function TodoError(){
    return (
        <p>Error...</p>
        );
}

export {TodoLoading} 