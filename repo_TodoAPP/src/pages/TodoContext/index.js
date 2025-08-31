import React from "react";
import {useLocalStorage} from "./useLocalStorage"

//Se crea un contexto
const TodoContext = React.createContext();

//Se crea un TodoContext.Provider personalizado
function TodoProvider({children}){
    const {
        item : todos,
        saveItem : saveTodos,
        loading,
        error
        } = useLocalStorage('TODOS_V1', []);

        const [searchValue, setSearchValue] = React.useState(''); 
        const [newTodoValue, setNewTodoValue] = React.useState('');
        const [openModal, setOpenModal] = React.useState(false);
        const[validStatus, setValidStatus] = React.useState(false);
        
        const validatting = (text) => {
            const newTodos = [...todos];
            const todoIndex = newTodos.findIndex((todo) => todo.text === text);
        
            if (todoIndex !== -1) {
                setValidStatus(!validStatus);
                alert('Ya existe esa tarea');
                setNewTodoValue('');
            }
        
            console.log("validatting function called");
        }

        const completedTodos = todos.filter(
        todo => !!todo.completed
        ).length;
        const totalTodos = todos.length;
        
        // Sirve para buscar
        const searchedTodos = todos.filter(
        (todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
            }
        );

        const addTodo = (text) => {
            const newTodos = [...todos];
            newTodos.push({
                text,
                completed: false,
            });
            saveTodos(newTodos);
        };

        const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
        };

        const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);

        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    
    }

//Se almacenan todos los métodos o variables que queremos reutilizar dentro del argumento value de un TodoProvider
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo,
            validatting,
            }}
        >
        {children}
        </TodoContext.Provider>
    );
}

//Se mandan a llamar
export { TodoContext, TodoProvider };