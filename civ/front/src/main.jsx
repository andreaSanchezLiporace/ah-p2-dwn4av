import React from 'react';
import ReactDOM from 'react-dom/client'; // Para renderizar componentes de React en el DOM de la aplicación web.
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Almacenamiento de rutas y contexto
import App from './App'; // Componente principal de la aplicación.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/estilos.css'

/** Vistas del sitio */
import RoutePrivate from './components/RoutePrivate'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
  /** Childrens */
  import Vehicles from './pages/Vehicles/Vehicles'
  import EditVehicle from './pages/Vehicles/EditVehicle'
  import NewVehicle from './pages/Vehicles/NewVehicle'
  import Services from './pages/Services/Services'
  import NewService from './pages/Services/NewService'
  import EditService from './pages/Services/EditService'

/** 
 * Rutas del sitio
 * A futuro:
 * profile -> profile { path: '/profile', element: <Profile /> }, 
 *            :clientId/edit { path: '/profile/:clientId/edit', element: <EditProfile /> },
 * 
 * clients -> clients { path: '/clients', element: <Clients /> },
 *            new-client { path: '/clients/new-client', element: <NewClient /> }, 
 *            :clientId/edit { path: '/clients/:clientId/edit', element: <EditClient /> },
 * 
 * employees -> employees { path: '/employees', element: <Employees /> },
 *              new-employee { path: '/employees/new-employee', element: <NewEmployee /> },  
 *              :employeeId/edit { path: '/employees/:employeeId/edit', element: <EditEmployee /> },
*/
const root = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { path: '', element: <Home /> },
      { path: '/blog', element: <Blog /> },
      { path: '/vehicles', element: <Vehicles /> },
      { path: '/vehicles/new-vehicle', element: <NewVehicle /> },
      { path: '/vehicles/:domain/edit', element: <EditVehicle /> },
      { path: '/services', element: <Services /> },
      { path: '/services/new-service', element: <NewService /> },
      { path: '/services/:id/edit', element: <EditService /> }
    ]
  },
  { path:'/login', element: <Login />, /* element: <Login onLogin={onLogin}/>,*/},
  { path:'/register', element: <Register />, /* element: <Register onLogin={onLogin}/>,*/},
])

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <RouterProvider root={root}/>
  </React.StrictMode>
)