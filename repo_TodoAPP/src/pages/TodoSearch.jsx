import React from "react";
import styled from "styled-components";
import { TodoContext } from "./TodoContext";

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
    border: 0;
    background-color: transparent;
    border-radius: 15px ;
    box-shadow: 0px 5px 10px 0px rgba(49, 207, 255, 0.7);   
    color: #fff;
`

function TodoSearch(){
    const {
        searchValue, 
        setSearchValue,
    } = React.useContext(TodoContext)
    
    return (
        <Container>
            <InputStyles 
                placeholder="Cortar la cebolla"
                type="text"
                value={searchValue} 
                onChange={(event) => {
                    setSearchValue(event.target.value);
                }}
            />
        </Container>
        );
    }

export {TodoSearch} 