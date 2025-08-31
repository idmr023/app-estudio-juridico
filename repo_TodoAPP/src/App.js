import React from "react";
import { AppUI } from "./AppUI";
import { TodoProvider } from "./pages/TodoContext";

function App() {

//2. Se engloba en un Provider
  return (
    <TodoProvider>
      <AppUI/>
    </TodoProvider>
  )
}

export default App;