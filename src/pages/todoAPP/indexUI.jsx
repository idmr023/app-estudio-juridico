import React from 'react';
import { TodoCounter } from './components/TodoCounter';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { CreateTodoButton } from './components/CreateTodoButton';
import { TodoLoading } from './components/TodoLoading';
import { TodoContext } from './components/TodoContext';
import { Modal } from './components/Modal';
import styled from 'styled-components';
import { TodoForm } from './components/TodoForm'

const SBContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function TodoAppUI(){
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
            <div  style={{backgroundColor: "#17181A" }}>
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

                </div>
            </>
        );
}

export {TodoAppUI}