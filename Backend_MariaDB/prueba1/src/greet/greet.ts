import { Hono } from "hono";
import { Greet, Param } from "../greet/greet.mariadb.js";  // Asegúrate de que la ruta sea correcta

// Crear una instancia de Hono
const greet = new Hono();

// Obtener todos los saludos
greet.get("/greet", async (c) => {
  const result = await Greet.findAll();  // Obtener todos los saludos
  return c.json(result);  // Devolver la respuesta en formato JSON
});

// Obtener un saludo por su ID
// Luego, definir la ruta para obtener un saludo por ID
greet.get("/greet/:id", async (c) => {
  const id = Number(c.req.param("id"));  // Obtener el ID de los parámetros de la URL
  console.log("Valor de ID extraído:", id);  // Imprimir el valor extraído

  if (isNaN(id)) {
    return c.json({ message: "ID no válido" }, 400);  // Si el ID no es válido, devolver un error 400
  }

  const result = await Greet.findById(id);  // Buscar el saludo por ID
  if (result) {
    return c.json(result);  // Si se encuentra, devolver el saludo
  } else {
    return c.notFound();  // Si no se encuentra, devolver error 404
  }
});




// Crear un nuevo saludo
greet.post("/greet", async (c) => {
  const param = await c.req.json();  // Obtener el cuerpo de la solicitud (el saludo)
  const result = await Greet.create(param as Param);  // Crear el saludo en la base de datos
  return c.json(result, 201);  // Devolver el resultado con un código de estado 201
});

// Actualizar un saludo por ID
greet.put("/greet/:id", async (c) => {
  const id = Number(c.req.param("id"));  // Obtener el ID de los parámetros de la URL
  const param = await c.req.json();  // Obtener el cuerpo de la solicitud (nuevo saludo)

  // Verificar si el saludo existe
  const result = await Greet.findById(id);  // Buscar el saludo por ID
  if (!result) {
    return c.notFound();  // Si no se encuentra, devolver un error 404
  }

  // Actualizar el saludo en la base de datos
  await Greet.update(id, param as Param);  // Llamar al método update en la clase Greet

  // Obtener el saludo actualizado
  const updatedResult = await Greet.findById(id);

  return c.json(updatedResult);  // Devolver el saludo actualizado en JSON
});

// Eliminar un saludo por ID
greet.delete("/greet/:id", async (c) => {
  const id = Number(c.req.param("id"));  // Obtener el ID de los parámetros de la URL

  // Verificar si el saludo existe
  const result = await Greet.findById(id);  // Buscar el saludo por ID
  if (!result) {
    return c.notFound();  // Si no se encuentra, devolver un error 404
  }

  // Eliminar el saludo en la base de datos
  await Greet.delete(id);  // Llamar al método delete en la clase Greet

  return c.json({ message: "Greeting deleted successfully" });  // Devolver una respuesta de éxito
});

// **Nuevo Endpoint: Obtener estadísticas de los saludos**
// **Nuevo Endpoint: Obtener estadísticas de los saludos**
greet.get("/greet/stats", async (c) => {
  try {
    // Obtener el total de registros de la tabla 'regards'
    const totalCount = await Greet.getTotalCount();

    // Obtener el conteo por idioma
    const languageStats = await Greet.getLanguageStats();

    // Devolver tanto el total como las estadísticas por idioma
    return c.json({
      total: totalCount,
      languageStats: languageStats,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas:", error);
    return c.json({
      message: "Error al obtener las estadísticas.",
    }, 500);
  }
});



export default greet;
