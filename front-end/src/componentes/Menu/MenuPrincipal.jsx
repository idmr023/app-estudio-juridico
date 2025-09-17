import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts/CarritoContext';
import SwitcherTema from 'componentes/SwitcherTema';
import { useTheme } from 'contexts/ThemeContext/ThemeContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';

export function MenuPrincipal() {
  const context = useContext(ShoppingCartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activeStyle = 'text-blue-800 underline underline-offset-4';

  const account = JSON.parse(localStorage.getItem('account'));
  const signOut = JSON.parse(localStorage.getItem('sign-out'));
  const hasUserAnAccount = account && Object.keys(account).length > 0;
  const isUserSignOut = context.signOut || signOut;

  const handleSignOut = () => {
    localStorage.setItem('sign-out', JSON.stringify(true));
    localStorage.removeItem('account');
    context.setSignOut(true);
  };

  const {theme, toggleTheme} = useTheme();

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <NavLink className={({ isActive }) => isActive ? activeStyle : 'text-gray-600 hover:text-blue-700'}>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                  Cuenta
                  <FontAwesomeIcon icon={faCaretDown}/>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <NavLink to="/cuenta"> 
                      <MenuItem>
                        <a
                          
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Datos de la cuenta
                        </a>
                      </MenuItem>
                    </NavLink>

                    <NavLink to="/cuenta/casos">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Estado de los casos
                        </a>
                      </MenuItem>
                    </NavLink>
                  </div>
                </MenuItems>
              </Menu>

          </NavLink>
          <NavLink className={({ isActive }) => isActive ? activeStyle : 'text-gray-600 hover:text-blue-700'} to="/" onClick={handleSignOut}>
            Cerrar sesión
          </NavLink>
        </>
      );
    } else {
      return (
        <NavLink className={({ isActive }) => isActive ? activeStyle : 'text-gray-600 hover:text-blue-700'} to="/login">
          Login
        </NavLink>
      );
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-xl font-semibold text-blue-900">Inicio</Link>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`md:flex md:items-center md:gap-6 ${menuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="text-gray-700 hover:text-blue-700 focus:outline-none transition text-sm"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Servicios
              </button>
              <div
                className={`absolute bg-white shadow-lg mt-2 py-1 rounded-md w-44 z-20 transition-all duration-200 ease-in-out ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {['all', 'otros'].map((cat, i) => (
                  <NavLink
                    key={i}
                    to={`/carrito${cat !== 'all' ? `/${cat}` : ''}`}
                    className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                    onClick={() => {
                      context.setSearchByCategory(cat);
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {cat === 'all' ? 'Todos los servicios' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink className={({ isActive }) => isActive ? activeStyle : 'text-gray-600 hover:text-blue-700'} to="/contacto">
              Contacto
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? activeStyle : 'text-gray-600 hover:text-blue-700'} to="/ayuda">
              Ayuda
            </NavLink>

            {renderView()}

            <SwitcherTema
                isDarkMode={theme == 'dark'}
                toggleTheme={toggleTheme}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}