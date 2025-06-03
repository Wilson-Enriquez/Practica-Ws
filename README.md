# Practica-Ws

## Software

### Herramientas de Desarrollo de Software

- **npm**: Gestor de paquetes de Node.js.
- **npm init**: Inicializa un nuevo proyecto de Node.js.
- **Crear el archivo `index.js`**.
- **node index.js**: Ejecuta un proyecto de Node.js.
- **Express.js**: Framework para aplicaciones web.
- **npm i express**: Instala Express.

## Frontend - Práctica

### Configuración del Proyecto

1. **Iniciar un proyecto con Vite:**

    ```bash
    npm create vite@latest
    ```

2. **Configuración inicial:**

    - **Nombre del proyecto**: Practica Herramienta Wilson Enriquez.
    - **Framework**: Seleccionar Vanilla.
    - **Variante**: Seleccionar JavaScript.

3. **Finalizar configuración:**

    ```bash
    cd vite-project
    npm install
    npm run dev
    ```

## Practica Docker Backend-Node-Express-Docker

### Comandos de Instalación y Configuración

1. **Instalar Docker en Ubuntu:**

    ```bash
    sudo apt update
    sudo apt install docker.io
    ```

2. **Iniciar y habilitar Docker:**

    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

3. **Verificar la instalación de Docker:**

    ```bash
    docker --version
    ```

4. **Instalar Dependencias de npm:**

    En el servidor en la carpeta, instala las dependencias de npm:

    ```bash
    npm i
    ```

5. **Crear el archivo `index.js`:**

    Aquí está el contenido para el archivo `index.js`:

    ```bash
    echo "const express = require('express');
    const app = express();
    const PORT = 3030;

    let libros = [
      { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
      { id: 2, titulo: '1984', autor: 'George Orwell' },
    ];

    app.get('/libros', (req, res) => {
      res.json(libros);
    });

    app.listen(PORT, () => {
      console.log('Servidor escuchando en http://localhost:' + PORT);
    });
    " > index.js
    ```

6. **Inicializar Git y Sincronizar con el Repositorio:**

    ```bash
    git init
    git add .
    git commit -m "libros con docker practica"
    git push
    ```

7. **Crear el archivo Dockerfile:**

    Aquí está el contenido para el archivo `Dockerfile`:

    ```bash
    echo "FROM node:20.10.0-alpine3.18

    WORKDIR /app

    COPY package.json ./ 
    RUN npm install

    COPY . .

    EXPOSE 3030 # Cambia el puerto según sea necesario

    CMD [\"node\", \"index.js\"]" > Dockerfile
    ```

8. **Construir la Imagen Docker:**

    ```bash
    sudo docker build -t backend-node-libros .
    ```

9. **Ejecutar el Contenedor Docker:**

    ```bash
    sudo docker run -d -p 3030:3030 --name backend-node-libros --restart on-failure backend-node-libros
    ```

10. **Verificar que el Contenedor Está Corriendo:**

    ```bash
    sudo docker ps
    ```

11. **Acceder a la Aplicación:**

    Accede a la aplicación en `http://localhost:3030/libros` o usa la IP pública en caso de estar en un servidor AWS:

    ```bash
    http://<Elastic-IP>:3030/libros
    ```

### Comandos Docker Adicionales

1. **Ver Logs del Contenedor:**

    ```bash
    sudo docker logs backend-node-libros
    ```

2. **Detener el Contenedor:**

    ```bash
    sudo docker stop backend-node-libros
    ```

3. **Eliminar el Contenedor:**

    ```bash
    sudo docker rm backend-node-libros
    ```

4. **Eliminar la Imagen:**

    ```bash
    sudo docker rmi backend-node-libros
    ```

