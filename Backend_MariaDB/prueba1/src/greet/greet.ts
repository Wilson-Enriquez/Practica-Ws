import { Hono } from "hono";
import { Greet, Param } from "../greet/greet.mariadb";

// Crear una instancia de Hono
const greet = new Hono();

// Obtener todos los saludos
greet.get("/greet", async (c) => {
  const result = await Greet.findAll();  // Obtener todos los saludos
  return c.json(result);  // Devolver la respuesta en formato JSON
});

// Obtener un saludo por su ID
greet.get("/greet/:id", async (c) => {
  const id = Number(c.req.param("id"));  // Obtener el ID de los parámetros de la URL
  const result = await Greet.findById(id);  // Buscar el saludo por ID
  if (result) {
    return c.json(result);  // Si se encuentra el saludo, devolverlo en JSON
  } else {
    return c.notFound();  // Si no se encuentra, devolver un error 404
  }
});

// Crear un nuevo saludo
greet.post("/greet", async (c) => {
  const param = await c.req.json();  // Obtener el cuerpo de la solicitud (el saludo)
  const result = await Greet.create(param as Param);  // Crear el saludo en la base de datos
  return c.json(result, 201);  // Devolver el resultado con un código de estado 201
});

export default greet;
