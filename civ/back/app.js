/**
 * Configuración e inicio del servidor.
 * @module express de 'express' para crear la aplicación del servidor
 * --
 * Importación de módulos de rutas para el manejo de los vehículos, servicios y autenticación:
 * @module VehiclesRoute -> tiene definidas las rutas y los controladores de los vehículos.
 * @module ServicesRoutes -> tiene definidas las rutas y los controladores de los servicios.
 * @module AuthRoutes -> tiene definidas las rutas y los controladores para la autenticacion de un usuario.
 * --
 * @module cors de 'cors' para habilitar el middleware de CORS en la aplicación Express
*/
import express from 'express'
import VehiclesRoutes from './routes/vehiculos.routes.js'
import ServicesRoutes from './routes/servicios.routes.js'
import AuthRoutes from './routes/auth.account.routes.js'
import cors from 'cors'
import { validateToken } from './middlewares/token.middlewares.js'

/**
 * Creo una instancia de la aplicación Express y define el número de puerto en el que se ejecutará el servidor.
 * Utiliza el valor de la variable de entorno PORT si está definida, de lo contrario, utiliza el puerto 1905.
*/
const app = express();
const port = process.env.PORT || 1905

/**
 * Middleware para analizar el cuerpo de la solicitud como JSON.
 * Middleware de CORS para permitir solicitudes desde otros dominios.
*/
app.use(express.json())
app.use(cors())

/**
 * Rutas vehículos: todas las rutas definidas en VehiclesRoutes se agregarán con el prefijo '/api/vehicles'.
 * Rutas servicios: todas las rutas definidas en ServicesRoutes se agregarán con el prefijo '/api/services'.
 * Rutas autenticación: todas las rutas definidas en AuthRoutes se agregarán con el prefijo '/api/auth'.
 */
app.use('/api/vehicles', [validateToken], VehiclesRoutes)
app.use('/api/services', [validateToken], ServicesRoutes)
app.use('/api/auth', AuthRoutes)

/** Inicia el servidor y escucha las solicitudes en el puerto especificado. */
app.listen(port, (error) => console.log((error ? `Error: ${error}` : `Server on http://localhost:${port}`)))