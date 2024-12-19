# Blog SOOT

Este proyecto es un blog dinámico que combina **JavaScript, PHP y MySQL** para ofrecer una experiencia completa. Diseñado para aprender y poner en práctica el desarrollo web, permite gestionar publicaciones, usuarios y comentarios de forma sencilla.

## Tecnologías y versiones

- **Frontend**: JavaScript (ES2024), HTML5, CSS3.
- **Backend**: PHP (8.3).
- **Base de datos**: MySQL (8.0.39).
- **Node.js**:  20.17.0 para el entorno frontend.
- **Contenedores**: Docker.

## Funcionalidades Principales

- **Autenticación de usuarios**: Registro e inicio de sesión.
- **Gestión de publicaciones**: Crear, editar y eliminar artículos.
- **Intefaz simple**: Diseño simple y funcional.

## Instalación

### Pasos de instalación manual

1. Clona el repositorio en tu máquina:
     ```bash
   git clone https://github.com/tu-usuario/blog.git
   cd blog
   ```
2. Configura el frontend:
   ```bash
      npm install
      npm run dev
   ```
3. Configura el backend:
   ```bash
     cd backend
     php -S localhost:8080
   ```
4. Carga la base de datos:
   ```bash
     mysql -u tu_usuario -p nombre_base < init.sql
   ```
### Instalación con Docker

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/blog.git
   cd blog
   ```
2. Configura el archivo docker-compose.yaml ajustando MYSQL_ROOT_PASSWORD.
    
3. Construye e inicia los servicios:
      ```bash
     docker-compose up --build

   ```
4. Para detener los servicios:
    ```bash
   docker-compose down
   ```
## Organización del proyecto

### Frontend
El frontend está estructurado para gestionar las distintas vistas de manera ordenada:

- **Administrador**: Funciones relacionadas con usuarios y publicaciones.
- **Artículos**: Secciones para listar y detallar los posts.
- **Inicio de sesión**: Gestión de autenticación de usuarios.

### Backend

El backend utiliza PHP para gestionar las operaciones principales:

- Crear, editar y eliminar artículos.
- Gestionar usuarios y sus datos.

La comunicación con el frontend se realiza mediante **fetch** y datos en formato JSON.

### Base de datos

La base de datos incluye las siguientes tablas:

- **Articles**: Almacena la información de las publicaciones.
- **Users**: Información de los usuarios registrados.
- **Comments**: Comentarios relacionados con las publicaciones.
- **Favorites**: Relación entre usuarios y sus artículos favoritos.

Este proyecto es un buen punto de partida para entender cómo combinar tecnologías y crear aplicaciones web funcionales.