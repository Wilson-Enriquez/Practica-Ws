import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import valorqueseleda from './ping/ping'  // Importa el enrutador ping
import greet from './greet/greet'  // Importa el enrutador greet

const server = new Hono()

// Definir la ruta principal
server.get('/', (c) => {
  return c.text('HOLA MUNDO PERO CON HONO!')
})

// Usar los enrutadores bajo las rutas correspondientes
server.route('/', valorqueseleda)  // Usar el enrutador `ping` bajo la ruta `/ping`
server.route('/', greet)  // Usar el enrutador `greet` bajo la ruta `/greet`

const port = 3050
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: server.fetch,
  port,
})
// Inicia el servidor en el puerto 3050
// Puedes acceder a las rutas:
// - http://localhost:3050/ping para el enrutador `ping`
// - http://localhost:3050/greet para el enrutador `greet`