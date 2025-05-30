const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Permite recibir JSON en POST

// Lista de libros (almacenados en memoria)
let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: '1984', autor: 'George Orwell' },
];

// 1. Obtener todos los libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// 2. Obtener un libro específico por ID
app.get('/libros/:id', (req, res) => {
  const libro = libros.find(b => b.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado');
  res.json(libro);
});

// 3. Crear un nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) return res.status(400).send('El título y autor son requeridos');
  
  const nuevoLibro = {
    id: libros.length + 1,
    titulo,
    autor
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// 4. Actualizar un libro existente por ID
app.put('/libros/:id', (req, res) => {
  const libro = libros.find(b => b.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado');

  const { titulo, autor } = req.body;
  libro.titulo = titulo || libro.titulo;
  libro.autor = autor || libro.autor;

  res.json(libro);
});

// 5. Eliminar un libro por ID
app.delete('/libros/:id', (req, res) => {
  const libroIndex = libros.findIndex(b => b.id === parseInt(req.params.id));
  if (libroIndex === -1) return res.status(404).send('Libro no encontrado');

  libros.splice(libroIndex, 1);
  res.status(204).send();
});

// 6. Filtrar libros por autor
app.get('/libros', (req, res) => {
  const autor = req.query.autor;
  if (autor) {
    const librosFiltrados = libros.filter(b => b.autor.toLowerCase().includes(autor.toLowerCase()));
    return res.json(librosFiltrados);
  }
  res.json(libros);
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
