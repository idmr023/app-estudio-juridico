
import React from "react";

import themeOn from "../../public/img/themeOn.png";
import themeOff from "../../public/img/themeOff.png";

// Recibe el estado del tema y la función para cambiarlo como props
const SwitcherTema = ({ isDarkMode, toggleTheme }) => {
  const iconoClaro = <img className="theme-icon" src={themeOn} alt="Tema claro" />;
  const iconoOscuro = <img className="theme-icon" src={themeOff} alt="Tema oscuro" />;

  return (
    <button className="theme-switcher-btn" onClick={toggleTheme}>
      {isDarkMode ? iconoOscuro : iconoClaro}
    </button>
  );
};

export default SwitcherTema;