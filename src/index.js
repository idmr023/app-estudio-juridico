import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CounterProvider } from "./pages/delivery/Context";
import { GoUpProvider } from './contexts/GoUp/GoUpContext';
import { MenuProvider } from './contexts/MenuContext/MenuContext';
import { ShoppingCartProvider } from './contexts/CarritoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ShoppingCartProvider>
      <BrowserRouter>
      <GoUpProvider>
      <MenuProvider>
      <CounterProvider>
        <App />
      </CounterProvider>
      </MenuProvider>
      </GoUpProvider>
      </BrowserRouter>
      </ShoppingCartProvider>
  </React.StrictMode>
);


reportWebVitals();
