import axios from 'axios'
import { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../contexts/CarritoContext'
import { FormContainer } from 'componentes/UI/Form'
import Contenido from './components/genera_contras'

export function SignIn() {
  const [view, setView] = useState('user-info')
  const form = useRef(null)
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  const [mostrarHijo, setMostrarHijo] = useState(false)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  useEffect(() => {
    const storedSignOut = localStorage.getItem('sign-out')

    try {
      if (storedSignOut) {
        const parsedSignOut = JSON.parse(storedSignOut)
        context.setSignOut(false)
      }
    } catch (error) {
      console.error('Error parsing stored data:', error)
    }
  }, [context.setSignOut])

  const handleLogin = () => {
    context.setSignOut(false);
    navigate('/cuenta')
  };


  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      dni: formData.get('dni'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    console.log("context.hasUserAnAccount:", context.hasUserAnAccount);

    console.log(data);

    axios.post('http://localhost:3001/api/signup', data)
      .then(res => {
        navigate("/login")
      })
      .catch(err => {
        console.log(err.response.data)
      })

    const stringifiedAccount = JSON.stringify(data)
      localStorage.setItem('account', stringifiedAccount)
      context.setAccount(data)
      handleLogin()
  }

  const toggleHijo = () => {
    setMostrarHijo(!mostrarHijo);
  }

  const renderLogIn = () => {
    return (
      <FormContainer>
        <div className='flex flex-col w-80'>
          <p>
            <span>{context.account?.email}</span>
          </p>

          <p>
            <span>{context.account?.password}</span>
          </p>

          <button
            onClick={() => handleLogin()}
            className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
            disabled={!hasUserAnAccount}>
            Log in
          </button>

          <div className='text-center'>
            <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
          </div>

          <button
            className='border border-black disabled:text-black/40  w-full disabled:border-black/40 rounded-lg mt-6 py-3'
            onClick={() => setView('create-user-info')}
            disabled={hasUserAnAccount}>
            Sign up
          </button>
        </div>
      </FormContainer>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <div>
        <form ref={form} className='flex flex-col gap-4 w-80'>

          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-light text-sm'>Tú correo:  </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              className='rounded-lg border border-black
              placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-light text-sm'>Tú nombre:  </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Pedro Ruíz"
              className='rounded-lg border border-black
              placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="dni" className='font-light text-sm'>Tú dni:</label>
            <input
              type="number"
              id="dni"
              name="dni"
              placeholder="76467750"
              className='rounded-lg border border-black
              placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-light text-sm'>Tú contraseña:  </label>
            <input
              type="text"
              id="password"
              name="password"
              defaultValue={context.account?.password}
              placeholder="******"
              className='rounded-lg border border-black
              placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>

          <Link to="/">
            <button
              className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
              onClick={() => createAnAccount()}>
              Create
            </button>
          </Link>

        </form>
        <button
          className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
          onClick={() => toggleHijo()}>
          Generar contraseña segura
        </button>
        {mostrarHijo && <Contenido />}
      </div>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <div className='relative flex flex-col items-center mt-20'>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </div>
  )
}