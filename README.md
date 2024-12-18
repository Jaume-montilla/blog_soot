# Blog con JavaScript, PHP y MySQL

Este proyecto es un **blog dinámico** que utiliza **JavaScript** en el frontend, **PHP** en el backend, y **MySQL** como base de datos para almacenar los datos de las publicaciones. El objetivo es demostrar cómo integrar tecnologías de frontend y backend para crear una aplicación web funcional.

## Tecnologías utilizadas

- **Frontend**: JavaScript, HTML, CSS.
- **Backend**: PHP.
- **Base de datos**: MySQL.
- **Contenedores**: Podman.

## Características

- **Autenticación de usuarios**: Los usuarios pueden registrarse e iniciar sesión para gestionar sus publicaciones.
- **Interfaz de usuario**: Diseño simple, intuitivo y funcional.
- **Base de datos relacional**: Uso de MySQL para gestionar publicaciones y usuarios.

## Instalación

### Requisitos

Antes de comenzar con la instalación, asegúrate de tener instalados los siguientes componentes en tu máquina:

- **Base de datos**: MySQL o MariaDB.
- **Backend**: PHP.
- **Gestión de contenedores**: Docker o Podman (opcional, si prefieres usar contenedores).

### Pasos de instalación manual

Si prefieres instalar el proyecto de manera manual, sigue los pasos a continuación:

1. Clona el repositorio en tu máquina.
     ```bash
   git clone https://github.com/tu-usuario/blog.git
   cd blog
   ```
2. Instala las dependencias del frontend y levanta el servidor usando npm.
   ```bash
      npm install
      npm run dev
   ```
3. Configura el backend ejecutando el servidor PHP en el puerto adecuado.
   ```bash
      npm install
      npm run dev
   ```
4. Importa la base de datos MySQL usando el archivo `blog_backup.sql`.
   ```bash
      npm install
      npm run dev
   ```
### Instalación con Docker (Recomendado)

Si prefieres usar Docker para gestionar los contenedores, sigue estos pasos:

1. Clona el repositorio en tu máquina.
   ```bash
   git clone https://github.com/tu-usuario/blog.git
   cd blog
   ```
2. Configura y levanta los servicios con Docker Compose para iniciar los contenedores de frontend, backend y base de datos.
      ```bash
      npm install
      npm run dev
   ```
3. accede al fichero Docker-compose.yaml y modifica los valores  'MYSQL_ROOT_PASSWORD' por la contraseña de su MySQL.
    
4. Inicia los servicios.
      ```bash
     docker-compose up --build

   ```
5. Detén los servicios.
    ```bash
   docker-compose down
   ```
