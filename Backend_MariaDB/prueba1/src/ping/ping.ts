// importar hono

import { Hono } from 'hono'

const valorqueseleda = new Hono()

valorqueseleda.get('/ping', (c) => {
return c.json({
    'message': 'pong Si se pudo importar el ping',
}
)
})

// habilitar opcion para importar ping
export default valorqueseleda
