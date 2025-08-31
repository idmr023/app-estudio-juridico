import React from "react";
import "./TodoForm.css"
import {TodoContext} from "../TodoContext"
function TodoForm(){
    const {
        addTodo,
        setOpenModal,
        validatting,
    } = React.useContext(TodoContext);

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    }

    const onCancel = () => {
        setOpenModal(false);
    }

    const onChange = (e) => {
        validatting(newTodoValue);
        setNewTodoValue(e.target.value);
    }

    return(
        // Para evitar que se cierre cuando se hace click sobre el mismo formulario
        <div onClick={(e) => e.stopPropagation()}> 
            <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea
                placeholder="Cortar cebolla para el almuerzo"
                value={newTodoValue}
                onFocus={() => validatting(newTodoValue)}
                onChange={onChange}
                required
            />
            <div className="TodoForm-buttonContainer">
                <button 
                    type=""
                    className="TodoForm-button
                    TodoForm-button--cancel"
                    onClick={onCancel}
                    >Cancelar</button>
                <button 
                    type="submit"
                    className="TodoForm-button
                    TodoForm-button--add"
                    >Añadir</button>
                </div>
            </form>
        </div>
    );
}
export {TodoForm};