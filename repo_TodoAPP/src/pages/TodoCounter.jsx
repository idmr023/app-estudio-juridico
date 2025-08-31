import styled from "styled-components";
import { TodoContext } from "./TodoContext";
import React from "react";

const H1 = styled.h1`
    font-size: 24px;
    text-align: center;
    margin: 0;
    padding: 48px;
    color: var(--blanco);
`

function TodoCounter(){

    //Funciona como un TodoContet.Consumer
    const {
        completedTodos,
        totalTodos,
    } = React.useContext(TodoContext)

    const Felicitaciones = ["Felicidades! Haz completado tus tareas 😁", "Vaya, Hoy ha sido un dia productivo", 
    "Te has ganado un descanso de 25 minutos ✋", "Completaste todos tus pendientes 😎", "¿De verdad terminaste todas tus tareas en 1 segundo o solo oprimiste el boton de completado para engañarme? 👀😒"]
    const randomIndex = Math.floor(Math.random() * Felicitaciones.length);

    return (
        <H1  className="h2-title">{totalTodos === completedTodos ? `${Felicitaciones[randomIndex]}` : `Has completado ${completedTodos} de ${totalTodos} TODOs`}</H1>
    );
}

export {TodoCounter};