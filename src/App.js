import GlobalStyle from './GlobalStyle';
import React, { useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {Menu} from './componentes/Menu';
import Footer from './componentes/Footer';
import { MenuContext } from './contexts/MenuContext/MenuContext';
import "./App.css"

function App() {
  const {
    rutasCombinadas,
  } = useContext(MenuContext)
  
  library.add(faArrowUp);

  return (
    <>
            <GlobalStyle />
              <Menu />

              <Routes>
                {rutasCombinadas.map((ruta) => (
                  <Route 
                    key={ruta.key} 
                    path={ruta.path} 
                    element={ruta.element}
                    />
                ))}
              </Routes>
            <Footer />
    </>
  );

}

export default App;