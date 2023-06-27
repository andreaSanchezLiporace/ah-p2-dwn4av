import { Outlet } from "react-router-dom"
import { SessionProvider } from './contexts/session.context'
import Header from './components/Header'
import Footer from './components/Footer'

function App(){
  return (
    <SessionProvider>
      <Header />
      <Outlet />
      <Footer />
    </SessionProvider>
  )
}

export default App;

/**
 * Importo los módulos:
 * @function useEffect de 'react' para ejecutar efectos secundarios en el componente.
 * @function Routes Route y useNavigate de 'react-router-dom' -> funciones y componentes relacionados con el enrutamiento de React Router.
 * Estilos propios -> './css/estilos.css'
 * Componentes de cada vista del sitio: home, blog, login, register, vehiculos (abm inicial, form editar, form nuevo), servicios (abm inicial, form editar, form nuevo), pag 404, header y footer

import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/home'
import Blog from './pages/blog'
import Login from './pages/login'
import Register from './pages/register'
import Vehicles from './pages/Vehicles/Vehicles'
import EditVehicle from './pages/Vehicles/editVehicle'
import NewVehicle from './pages/Vehicles/newVehicle'
import Services from './pages/Services/services'
import NewService from './pages/Services/NewService'
import EditService from './pages/Services/editService'
import PageNotFound from './pages/pageNotFound'
import Header from './components/header'
import Footer from './components/footer'
import './css/estilos.css'

 * Componente principal de la aplicación.
 * Renderiza los diferentes componentes dependiendo de la ruta.
 * Verifica la autenticación del usuario y redirige si es necesario.
function App () {
  let navigate = useNavigate()

  useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('auth-token')
    if(!AUTH_TOKEN) {
      navigate('/', {replace: true}) // Redirige al usuario a la página de inicio si no hay un token de autenticación.
    }
  }, [navigate])

   * Función de inicio de sesión.
   * Almacena el usuario y el token de autenticación en el almacenamiento local.
   * Redirige al usuario a la página de inicio.
   *
   * @param {object} user - Objeto de usuario.
   * @param {string} token - Token de autenticación.
  const onLogin = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('auth-token', token)
    window.location.href = '/'
  }

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/login' element={<Login onLogin={onLogin}/>} />
          <Route path='/register' element={<Register onLogin={onLogin}/>} />
          <Route path="/vehicles" element={<Vehicles/>} />
          <Route path="/vehicles/new-vehicle" element={<NewVehicle/>} />
          <Route path="/vehicles/:domain/edit" element={<EditVehicle/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/services/new-service" element={<NewService/>} />
          <Route path="/services/:id/edit" element={<EditService/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}
*/