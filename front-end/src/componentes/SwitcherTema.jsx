import React from "react";

const SwitcherTema = ({ isDarkMode, toggleTheme }) => {

  // 2. Usa la ruta como un string directamente en el atributo src.
  //    El slash "/" al principio apunta a la raíz de la carpeta public.
  const iconoClaro = <img className="theme-icon" src={"/img/themeOn.png"} alt="Tema claro" />;
  const iconoOscuro = <img className="theme-icon" src={"/img/themeOff.png"} alt="Tema oscuro" />;

  return (
    <button className="theme-switcher-btn" onClick={toggleTheme}>
      {isDarkMode ? iconoOscuro : iconoClaro}
    </button>
  );
};

export default SwitcherTema;