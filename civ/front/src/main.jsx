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
  import Profile from './pages/Profile/Profile'
  //import EditProfile from './pages/Profile/EditProfile'
  //import Vehicles from './pages/Vehicles/Vehicles'
  //import EditVehicle from './pages/Vehicles/EditVehicle'
  //import NewVehicle from './pages/Vehicles/NewVehicle'
  //import Services from './pages/Services/Services'
  //import NewService from './pages/Services/NewService'
  //import EditService from './pages/Services/EditService'

/** Rutas del sitio */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutePrivate><App /></RoutePrivate>,
    errorElement: <PageNotFound />,
    children: [
      { path: '/profile', element: <Profile /> }, // MAQUETAR VISTA
      //{ path: '/profile/:profileId/edit', element: <EditProfile /> }, // DESARROLLAR BACK Y FRONT
      //{ path: '/docs', element: <Blog /> }, 
      //{ path: '/employees', element: <Employees /> },
      //{ path: '/employees/new-employee', element: <NewEmployee /> }, // DESARROLLAR BACK Y FRONT
      //{ path: '/employees/:employeeId/edit', element: <EditEmployee /> }, // DESARROLLAR BACK Y FRONT
      //{ path: '/clients', element: <Clients /> },
      //{ path: '/clients/new-client', element: <NewClient /> }, // DESARROLLAR BACK Y FRONT
      //{ path: '/clients/:clientId/edit', element: <EditClient /> }, // DESARROLLAR BACK Y FRONT
      // Habilitar rutas a medida que se van cargando las vistas y refactorizandolas
      //{ path: '/vehicles', element: <Vehicles /> },
      //{ path: '/vehicles/new-vehicle', element: <NewVehicle /> },
      //{ path: '/vehicles/:domain/edit', element: <EditVehicle /> },
      //{ path: '/services', element: <Services /> },
      //{ path: '/services/new-service', element: <NewService /> },
      //{ path: '/services/:id/edit', element: <EditService /> }
    ]
  },
  { path:'/', element: <Home />,},
  { path:'/blog', element: <Blog />,},
  { path:'/login', element: <Login />,},
  { path:'/register', element: <Register />,},
])

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)