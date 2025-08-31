import { TodoCounter } from './pages/TodoCounter';
import { TodoSearch } from './pages/TodoSearch';
import { TodoList } from './pages/TodoList';
import { TodoItem } from './pages/TodoItem';
import { CreateTodoButton } from './pages/CreateTodoButton';
import { GlobalStyle } from './GlobalStyles';
import { TodoLoading } from './pages/TodoLoading';
import { TodoContext } from './pages/TodoContext';
import React from 'react';
import { Modal } from './pages/Modal';
import styled from 'styled-components';
import { TodoForm } from './pages/TodoForm'

const SBContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function AppUI(){
    //El componente llamada a un contexto y recibe estos props
    const {
        loading,
        error,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        validatting,
    } = React.useContext(TodoContext)

    return (
        <>
            <GlobalStyle/>
            <TodoCounter/>
            <SBContainer>    
                <TodoSearch/>
                <CreateTodoButton
                    setOpenModal={setOpenModal}
                />
            </SBContainer>
                    <TodoList> 
                        {loading && <TodoLoading/>}                
                        {error && <p>Desésperate, hubo un error!!</p>}
                        {!loading && searchedTodos.length === 0 
                            && <p>¡Crea tu primer TODO!</p>}
                            
                        {searchedTodos.map( todo => (
                        <TodoItem 
                            key={todo.text}
                            text = {todo.text}
                            completed = {todo.completed}
                            onComplete = {() => completeTodo(todo.text)}
                            onDelete = {() => deleteTodo(todo.text)}
                        />
                        ))}
                    </TodoList>

                    {openModal && (
                        <Modal>
                            <TodoForm validatting={validatting}/>
                        </Modal>
                    )}
            </>
        );
}

export {AppUI}