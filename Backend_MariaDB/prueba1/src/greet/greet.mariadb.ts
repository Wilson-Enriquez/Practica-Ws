import { createConnection, Connection, ConnectionConfig } from "mariadb";
import * as dotenv from "dotenv";
dotenv.config();  // Carga las variables de entorno desde el archivo .env

// Verifica que las variables de entorno estén correctamente cargadas
console.log("Contraseña de la base de datos:", process.env.DB_PASSWORD);
console.log("Usuario de la base de datos:", process.env.DB_USER);

// Configuración de la base de datos
const dbConfig: ConnectionConfig = {
    host: process.env.DB_HOST,  // Dirección del servidor de la base de datos
    user: process.env.DB_USER,  // Usuario para la conexión
    password: process.env.DB_PASSWORD,  // La contraseña debe provenir de las variables de entorno
    port: Number(process.env.DB_PORT),  // Convierte el puerto a número
    database: process.env.DB_NAME,  // Nombre de la base de datos
};


// Declaración de la conexión
let connection: Connection | null = null;  // Establece que la conexión puede ser nula al principio

// Función para conectar a la base de datos
async function connectToDatabase(): Promise<void> {  // Función asíncrona que conecta con la base de datos
    if (!connection) {  // Si la conexión aún no ha sido establecida
        connection = await createConnection(dbConfig);  // Crea una conexión a la base de datos con la configuración
        console.log("Conexión establecida con la base de datos");
    }
}

// Clase de saludos con métodos para realizar consultas en la base de datos
export class Greet {
    // Método para obtener todos los saludos
    static async findAll() {  
        if (!connection) {
            await connectToDatabase();
        }
        return await connection!.query('SELECT * FROM regards');
    }

    // Método para obtener un saludo por ID
    static async findById(id: number) {  
        if (!connection) {
            await connectToDatabase();
        }
        const result = await connection!.query('SELECT id, greet, language FROM regards WHERE id = ?', [id]);
        return result[0];  
    }

    // Método para crear un saludo
    static async create(param: Param) {  
        if (!connection) {
            await connectToDatabase();
        }
        const [{ id }] = await connection!.query('INSERT INTO regards (greet, language) VALUES (?, ?) RETURNING id', [param.greet, param.language]);

        const result = await connection!.query('SELECT id, greet, language FROM regards WHERE id = ?', [id]);
        return result[0];  
    }

    // Método para actualizar un saludo por ID
    static async update(id: number, param: Param) {  
        if (!connection) {
            await connectToDatabase();
        }
        await connection!.query('UPDATE regards SET greet = ?, language = ? WHERE id = ?', [param.greet, param.language, id]);
    }

    // Método para eliminar un saludo por ID
    static async delete(id: number) {  
        if (!connection) {
            await connectToDatabase();
        }
        await connection!.query('DELETE FROM regards WHERE id = ?', [id]);
    }

    // Método para obtener el conteo total de registros
// Método para obtener el conteo total de registros
static async getTotalCount() {
  if (!connection) {
    await connectToDatabase();
  }
  try {
    const result = await connection!.query('SELECT COUNT(*) AS count FROM regards');
    return result[0].count;
  } catch (error) {
    console.error("Error al obtener el conteo total:", error);
    throw error; // Lanzamos el error para ser manejado por el controlador
  }
}

// Método para obtener el conteo por idioma
static async getLanguageStats() {
  if (!connection) {
    await connectToDatabase();
  }
  try {
    const result = await connection!.query('SELECT language, COUNT(*) AS count FROM regards GROUP BY language');
    return result;
  } catch (error) {
    console.error("Error al obtener las estadísticas por idioma:", error);
    throw error; // Lanzamos el error para ser manejado por el controlador
  }
}}

// Tipo para los parámetros de saludo
export type Param = {  // Tipo para definir los parámetros de un saludo
    greet: string;  // Saludo
    language: string;  // Idioma del saludo
};
