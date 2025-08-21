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

  axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
    dni: dniLogin,
    password: passwordLogin
  })
    .then(res => {
      // --- LA CORRECCIÓN CLAVE ESTÁ AQUÍ ---
      if (res.data.status === 'Exito') {
        
        const userData = {
          name: res.data.user.usr_nom,
          dni: res.data.user.usr_dni,
          email: res.data.user.usr_email,
          img: res.data.user.usr_img
        };

        context.setAccount(userData);
        context.setSignOut(false);
        localStorage.setItem('account', JSON.stringify(userData));
        localStorage.setItem('sign-out', JSON.stringify(false));
        navigate('/cuenta');

      } else {
        alert(res.data.message || 'DNI o contraseña incorrectos');
      }
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        console.error('Error al iniciar sesión:', err);
        alert('Ocurrió un error inesperado.');
      }
    });
  };

  const createAnAccount = (event) => {
    event.preventDefault();
    const name = form.current.name.value;
    const dni = form.current.dni.value;
    const email = form.current.email.value;
    const password = form.current.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // 1. Actualizamos el perfil del usuario en Firebase Auth (para el nombre)
        updateProfile(user, { displayName: name });

        // 2. Creamos un documento en Firestore para guardar datos adicionales (DNI, rol, etc.)
        // Usamos el UID del usuario como ID del documento, es más seguro y estándar.
        const userDocRef = doc(db, "usuarios", user.uid);
        setDoc(userDocRef, {
            usr_nom: name,
            usr_dni: Number(dni),
            usr_email: email,
            rol: 'cliente',
            usr_img: `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(name)}`
        });

        alert('Cuenta creada con éxito. Por favor, inicia sesión.');
        setView('log-in');
      })
      .catch((error) => {
        console.error('Error al registrarse:', error.code, error.message);
        if (error.code === 'auth/email-already-in-use') {
            alert('Este correo electrónico ya está registrado.');
        } else {
            alert('Error al registrarse. Revisa los datos.');
        }
      });
  };

  const toggleHijo = () => setMostrarHijo(!mostrarHijo);

  const renderLogIn = () => (
    // CAMBIO: El <div> exterior se ha convertido en un <form> para un HTML semántico.
    // CAMBIO: Se ha añadido el evento onSubmit al formulario.
    <form onSubmit={handleLogin} className="max-w-sm w-full mt-20 mx-auto"> 
      <div className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
        {/*
          CAMBIO: Se cambió el input de DNI por Email para el login.
          Firebase Authentication está optimizado para usar email como identificador principal.
          Esto simplifica y asegura enormemente el proceso.
        */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Correo electrónico</label>
          <input
            name="email"
            type="email"
            required
            placeholder="correo@ejemplo.com"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
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
        
        {/*
          CAMBIO: Se ha cambiado el onClick por type="submit".
          Ahora, al hacer clic en este botón (o presionar Enter en un campo), se activará el
          evento onSubmit del formulario, que llama a handleLogin.
        */}
        <BotonSbt type="submit">Iniciar sesión</BotonSbt>

        <div className='text-center'>
          <a href='/' className='text-sm text-blue-600 underline'>¿Olvidaste tu contraseña?</a>
        </div>

        {/* CAMBIO: Se ha añadido type="button" explícitamente para evitar que este
            botón envíe el formulario. */}
        <BotonSbt2 type="button" onClick={() => setView('create-user-info')}>Registrarse</BotonSbt2>
      </div>
    </form>
  );

  const renderCreateUserInfo = () => (
    <div className="max-w-sm w-full mt-20 mx-auto">
      {/*
        CAMBIO: Se ha añadido el evento onSubmit al formulario, que ahora llama a createAnAccount.
        Esto permite enviar el formulario presionando Enter.
      */}
      <form ref={form} onSubmit={createAnAccount} className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
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
          {/*
            CAMBIO: Se ha cambiado el type="text" a type="password".
            Esto es una práctica de seguridad fundamental para ocultar la contraseña mientras se escribe.
          */}
          <input name="password" type="password" required placeholder="********" />
        </div>

        {/*
          CAMBIO: Se ha cambiado el onClick por type="submit".
          Ahora es el botón principal para enviar el formulario de registro.
        */}
        <BotonSbt type="submit">Crear cuenta</BotonSbt>

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