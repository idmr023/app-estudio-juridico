import axios from 'axios';
import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts/CarritoContext';

export function SignIn() {
  const [view, setView] = useState('user-info');
  const form = useRef(null);
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [mostrarHijo, setMostrarHijo] = useState(false);
  const [dniLogin, setDniLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  useEffect(() => {
    try {
      const storedSignOut = localStorage.getItem('sign-out');
      if (storedSignOut) context.setSignOut(false);
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  }, [context]);

  const handleLogin = () => {
    if (!dniLogin || !passwordLogin) {
      alert("Faltan datos para iniciar sesión.");
      return;
    }

    axios.post('http://localhost:3001/api/login', {
      dni: dniLogin,
      password: passwordLogin
    })
      .then(res => {
        if (res.data === 'Exito') {
          axios.get(`http://localhost:3001/api/list_usr/${dniLogin}`)
            .then(userRes => {
              const userData = {
                name: userRes.data[0].usr_nom,
                dni: userRes.data[0].usr_dni,
                email: userRes.data[0].usr_email
              };

              if (!userData) {
                alert('No se encontraron datos del usuario.');
                return;
              }

              context.setAccount(userData);
              context.setSignOut(false);
              localStorage.setItem('account', JSON.stringify(userData));
              localStorage.setItem('sign-out', JSON.stringify(false));
              navigate('/cuenta');
            })
            .catch(err => {
              console.error('Error al obtener datos del usuario:', err);
              alert('Error al obtener los datos del usuario');
            });
        } else {
          alert('DNI o contraseña incorrectos');
        }
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err);
      });
  };

  const createAnAccount = () => {
    const formData = {
      name: form.current.name.value,
      dni: form.current.dni.value,
      email: form.current.email.value,
      password: form.current.password.value
    };

    axios.post('http://localhost:3001/api/signup', formData)
      .then(() => {
        alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
        setView('user-info');
        setDniLogin(formData.dni);
        setPasswordLogin(formData.password);
      })
      .catch(err => {
        console.error('Error al registrarse:', err);
        alert('Error al registrarse. Revisa los datos.');
      });
  };

  const toggleHijo = () => setMostrarHijo(!mostrarHijo);

  const renderLogIn = () => (
    <div className="max-w-sm w-full mt-20 mx-auto">
      <div className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="dni">DNI</label>
          <input
            name="dni"
            type="number"
            required
            placeholder="76467750"
            value={dniLogin}
            onChange={(e) => setDniLogin(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            type="password"
            required
            placeholder="********"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
        </div>

        <BotonSbt onClick={handleLogin}>Iniciar sesión</BotonSbt>

        <div className='text-center'>
          <a href='/' className='text-sm text-blue-600 underline'>¿Olvidaste tu contraseña?</a>
        </div>

        <BotonSbt2 onClick={() => setView('create-user-info')}>Registrarse</BotonSbt2>
      </div>
    </div>
  );

  const renderCreateUserInfo = () => (
    <div className="max-w-sm w-full mt-20 mx-auto">
      <form ref={form} className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Correo electrónico</label>
          <input name="email" type="email" required placeholder="correo@ejemplo.com" />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="name">Nombre completo</label>
          <input name="name" type="text" required placeholder="Pedro Ruiz" />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="dni">DNI</label>
          <input name="dni" type="number" required placeholder="76467750" />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="password">Contraseña</label>
          <input name="password" type="text" required placeholder="********" />
        </div>

        <BotonSbt type='button' onClick={createAnAccount}>Crear cuenta</BotonSbt>

        <button type='button' onClick={toggleHijo} className='text-sm text-blue-700 underline'>
          Generar contraseña segura
        </button>

        {mostrarHijo && <PasswordGenerator />}
      </form>
    </div>
  );

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-semibold text-blue-900 mt-10'>Bienvenido</h1>
      {view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()}
    </div>
  );
}

// COMPONENTE DE GENERADOR DE CONTRASEÑAS
function PasswordGenerator() {
  const encriptar = () => {
    const input = document.getElementById('input__msj');
    const texto = input.value
      .replace(/e/g, 'enter')
      .replace(/i/g, 'imes')
      .replace(/a/g, 'ai')
      .replace(/o/g, 'ober')
      .replace(/u/g, 'ufat');
    document.getElementById('mostrar_texto').value = texto;
    input.value = '';
  };

  const desencriptar = (texto) =>
    texto.replace(/enter/g, 'e')
      .replace(/imes/g, 'i')
      .replace(/ai/g, 'a')
      .replace(/ober/g, 'o')
      .replace(/ufat/g, 'u');

  const procesarDesenscriptar = () => {
    const texto = document.getElementById('mostrar_texto').value;
    document.getElementById('input__msj').value = desencriptar(texto);
    document.getElementById('mostrar_texto').value = '';
  };

  const copiarAlPortapapeles = () => {
    const value = document.getElementById('mostrar_texto').value;
    navigator.clipboard.writeText(value);
  };

  return (
    <div className='bg-white border p-6 mt-6 rounded-xl shadow-md flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='input__msj'>Texto a encriptar</label>
        <input id='input__msj' placeholder='Texto a encriptar' />
      </div>

      <button onClick={encriptar}>Encriptar</button>

      <div className='flex flex-col gap-2'>
        <label htmlFor='mostrar_texto'>Texto encriptado</label>
        <input id='mostrar_texto' placeholder='Texto encriptado' />
      </div>

      <button onClick={copiarAlPortapapeles}>Copiar</button>
      <button onClick={procesarDesenscriptar}>Desencriptar</button>
    </div>
  );
}

// BOTONES
export const BotonSbt = ({ children, onClick, disabled, type }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className="bg-blue-700 hover:bg-blue-800 text-white w-full rounded-lg py-3 px-4 mt-6 transition"
  >
    {children}
  </button>
);

export const BotonSbt2 = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="border border-blue-700 text-blue-700 hover:bg-blue-100 disabled:text-blue-300 disabled:border-blue-300 w-full rounded-lg py-3 px-4 mt-6 transition"
  >
    {children}
  </button>
);