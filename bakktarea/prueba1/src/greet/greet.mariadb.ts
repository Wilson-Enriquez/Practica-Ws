import { createConnection } from "mariadb";
import type { Connection, ConnectionConfig } from "mariadb";
import * as dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Verifica que las variables de entorno estén correctamente cargadas
console.log("Contraseña de la base de datos:", process.env.DB_PASSWORD);
console.log("Usuario de la base de datos:", process.env.DB_USER);

// Configuración de la base de datos
const dbConfig: ConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  // La contraseña debe provenir de las variables de entorno
    port: Number(process.env.DB_PORT),  // Convierte el puerto a número
    database: process.env.DB_NAME,
};

// Declaración de la conexión
let connection: Connection | null = null;

// Función para conectar a la base de datos
async function connectToDatabase(): Promise<void> {
    if (!connection) {
        connection = await createConnection(dbConfig);
        console.log("Conexión establecida con la base de datos");
    }
}

// Clase de saludos con métodos para insertar, actualizar, eliminar y consultar
export class Greet {
    // Método para obtener todos los saludos
    static async findAll() {
        if (!connection) {
            await connectToDatabase(); // Asegúrate de estar conectado antes de ejecutar la consulta
        }
        return await connection!.query('SELECT * FROM regards');
    }

    // Método para obtener un saludo por ID
    static async findById(id: number) {
        if (!connection) {
            await connectToDatabase();
        }
        const result = await connection!.query(
            'SELECT id, greet, language FROM regards WHERE id = ?', [id]
        );
        return result[0]; // Retorna el primer resultado
    }

    // Método para crear un saludo
    // el POST PILAS ES ESE DE [param.greetinggggg, param.language]


    static async create(param: Param) {
        if (!connection) {
            await connectToDatabase();
        }
        const [{ id }] = await connection!.query(
            'INSERT INTO regards (greet, language) VALUES (?, ?) RETURNING id',
            [param.greet, param.language]
        );

        const result = await connection!.query(
            'SELECT id, greet, language FROM regards WHERE id = ?', [id]
        );
        return result[0]; // Retorna el primer resultado
    }
}



// LO DE ARIBA ERA POR ESO DE EXPORT 
// Tipo para los parámetros de saludo
export type Param = {
    greet: string;  // Corregido el nombre de la propiedad a 'greeting'
    language: string;
};
