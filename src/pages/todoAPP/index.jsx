import React from "react";
import { TodoAppUI } from "./indexUI";
import { TodoProvider } from "./components/TodoContext";

function TodoAPP() {

  return (
    <TodoProvider>
      <TodoAppUI/>
    </TodoProvider>
  )
}

export default TodoAPP;