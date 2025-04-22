// ================================
// Importar y configurar Express
// ================================

const express = require('express');              // Importamos el módulo de Express
const app = express();                           // Creamos una instancia de la aplicación Express
const port = 8080;                               // Definimos el puerto donde el servidor escuchará

// Middleware para parsear el cuerpo de la solicitud en formato JSON.
// Esto es necesario para poder leer el contenido enviado en peticiones POST.
app.use(express.json());

// ================================
// RUTAS CON MÉTODO GET
// ================================

// Ruta GET para la página principal
// Responde con un mensaje de bienvenida en texto plano.
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Bienvenido a mi servidor con Express.');
});




// ==================================================================== uso como ejemplo  


// Ruta GET sencilla para "/ping"
// Responde con el texto 'pong' y código HTTP 200.
app.get('/ping', (req, res) => {
  
  res.status(200).send('pong Wilson Enriquez');
});





// Ruta GET que responde con JSON en "/pin"
// Envía un objeto JSON con la propiedad message igual a 'pong'
app.get('/pin', (req, res) => {
  res.status(200).json({ message: 'pong Wilson Enriquez' });
});



// ==================================================================== 





// Ruta GET para una API simple
// Envía un objeto JSON con un mensaje de saludo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde la API!' });
});

// ================================
// RUTAS DE LIBROS (GET y POST)
// ================================

// Creamos un arreglo de libros, donde cada libro es representado como un objeto JSON.
const libros = [
  { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' },
  { id: 3, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón' },
  { id: 4, titulo: 'Rayuela', autor: 'Julio Cortázar' }
];

// Ruta GET para mostrar todos los libros
// Envía el arreglo completo de libros en formato JSON.
app.get('/libros', (req, res) => {
  res.status(200).json(libros);
});

// Ruta GET para buscar un libro por su ID
// Se captura el parámetro "id" de la URL, se busca en el arreglo y se responde en JSON.
app.get('/libros/:id', (req, res) => {
  // Capturamos y convertimos el "id" de la URL a tipo número.
  const id = parseInt(req.params.id);

  // Se utiliza el método "find" para buscar el libro con el ID que coincida.
  // "find" recorre el arreglo y retorna el primer elemento que cumpla la condición.
  const libro = libros.find(l => l.id === id);

  if (libro) {
    // Si el libro se encuentra, se envía con código 200 en formato JSON.
    res.status(200).json(libro);
  } else {
    // Si no se encuentra, se envía un mensaje de error con código 404.
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// ================================
// MÉTODO POST PARA AGREGAR LIBROS
// ================================

// Ruta POST para agregar un nuevo libro a la colección.
// Se espera que el cliente envíe un JSON con las propiedades "titulo" y "autor".
app.post('/libros', (req, res) => {
  // Extraemos los datos enviados en el cuerpo de la solicitud
  const nuevoLibro = req.body;

  // Validación básica: se verifica que existan "titulo" y "autor" en el JSON recibido.
  if (!nuevoLibro.titulo || !nuevoLibro.autor) {
    // Si falta alguno de los datos, se responde con error 400 (Bad Request).
    return res.status(400).json({ error: 'Debe enviar un título y un autor.' });
  }

  // Asignamos un nuevo id al libro, normalmente sumando 1 al último id existente.
  // En ambientes reales, se debería generar un id de forma más segura (por ejemplo, con una base de datos).
  nuevoLibro.id = libros.length + 1;
  
  // Agregamos el nuevo libro al arreglo "libros".
  libros.push(nuevoLibro);

  // Respondemos con el libro creado y un código 201 (Created) para indicar que se creó el recurso.
  res.status(201).json(nuevoLibro);
});





// ================================
// INICIAR EL SERVIDOR
// ================================

// El servidor comienza a escuchar las solicitudes en el puerto definido.
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
