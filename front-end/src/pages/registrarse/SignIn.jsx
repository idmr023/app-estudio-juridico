import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts/CarritoContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';

export function SignIn() {
  const [view, setView] = useState('log-in');
  const form = useRef(null);
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [mostrarHijo, setMostrarHijo] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  useEffect(() => {
    try {
      const storedSignOut = localStorage.getItem('sign-out');
      if (storedSignOut) context.setSignOut(false);
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  }, [context]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!emailLogin || !passwordLogin) {
      alert("Faltan datos para iniciar sesión.");
      return;
    }

    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {
        navigate('/cuenta');
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err.code, err.message);
        if (err.code === 'auth/invalid-credential') {
            alert('Correo o contraseña incorrectos.');
        } else {
            alert('Ocurrió un error inesperado al iniciar sesión.');
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
        updateProfile(user, { displayName: name });
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
    <form onSubmit={handleLogin} className="max-w-sm w-full mt-20 mx-auto">
      <div className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Correo electrónico</label>
          <input name="email" type="email" required placeholder="correo@ejemplo.com"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password">Contraseña</label>
          <input name="password" type="password" required placeholder="********"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
        </div>
        <BotonSbt type="submit">Iniciar sesión</BotonSbt>
        <div className='text-center'>
          <a href='/' className='text-sm text-blue-600 underline'>¿Olvidaste tu contraseña?</a>
        </div>
        <BotonSbt2 type="button" onClick={() => setView('create-user-info')}>Registrarse</BotonSbt2>
      </div>
    </form>
  );

  const renderCreateUserInfo = () => (
    <div className="max-w-sm w-full mt-20 mx-auto">
      <form ref={form} onSubmit={createAnAccount} className='bg-white p-8 rounded-xl shadow-md flex flex-col gap-4'>
        {/* ... inputs del formulario de registro ... */}
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
          <input name="password" type="password" required placeholder="********" />
        </div>
        <BotonSbt type="submit">Crear cuenta</BotonSbt>
        <button type='button' onClick={toggleHijo} className='text-sm text-blue-700 underline'>Generar contraseña segura</button>
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
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoEncriptado, setTextoEncriptado] = useState('');

  const encriptar = () => {
    const textoProcesado = textoOriginal
      .replace(/e/g, 'enter').replace(/i/g, 'imes').replace(/a/g, 'ai')
      .replace(/o/g, 'ober').replace(/u/g, 'ufat');
    setTextoEncriptado(textoProcesado);
  };

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(textoEncriptado);
    alert("Texto copiado al portapapeles");
  };

  return (
    <div className='bg-white border p-6 mt-6 rounded-xl shadow-md flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <label>Texto a encriptar</label>
        <input value={textoOriginal} onChange={(e) => setTextoOriginal(e.target.value)} placeholder='Escribe algo...' />
      </div>
      <button type="button" onClick={encriptar}>Encriptar</button>
      <div className='flex flex-col gap-2'>
        <label>Texto encriptado</label>
        <input value={textoEncriptado} readOnly placeholder='Resultado...' />
      </div>
      <button type="button" onClick={copiarAlPortapapeles}>Copiar</button>
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