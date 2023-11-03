import React, { useState } from "react";

import Container from "./components_smart/Container";
import Header from "./components_smart/Header";
import { temaClaro, temaOscuro } from "./components_smart/UI/temas";
import { ThemeProvider } from "styled-components";
import { BtnTema } from "./components_smart/UI";
import SwitcherTema from "./components_smart/SwitcherTema";

function Smart() {
  const [tema, setTema] = useState(() => {
    const temaAlmacenado = localStorage.getItem("tema");
    return temaAlmacenado === "oscuro";
  });

  const toggleTema = () => {
    const nuevoTema = !tema;
    localStorage.setItem("tema", nuevoTema ? "oscuro" : "claro");
    setTema(nuevoTema);
  }

  return (
    <ThemeProvider theme={tema ? temaClaro : temaOscuro}>
      <BtnTema onClick={toggleTema}>
        <SwitcherTema/>
      </BtnTema>
      <Header />
      <Container />
    </ThemeProvider>
  );
}

export default Smart;