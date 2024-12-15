# Blog con JavaScript, PHP y MySQL

Este proyecto es un **blog dinámico** creado utilizando **JavaScript** en el frontend y **PHP** en el backend, con una base de datos **MySQL** para almacenar los datos de las publicaciones. El objetivo de este proyecto es demostrar cómo integrar tecnologías de frontend y backend para crear una aplicación web funcional.

## Tecnologías utilizadas

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: PHP
- **Base de datos**: MySQL
- **Servidor web**: Apache (o cualquier servidor compatible con PHP)

## Características

- Creación, lectura, actualización y eliminación de publicaciones (CRUD).
- Sistema de autenticación de usuarios.
- Interfaz de usuario sencilla y funcional.
- Base de datos relacional para almacenar publicaciones y usuarios.

## Instalación

### Requisitos

- MySQL o MariaDB para la base de datos.
- PHP.

### Pasos para instalar

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/blog.git
   cd blog
   npm install
   npm run dev
   cd backend
   php -s localhost:8080
   ```
   ### DB
   Para importar la base de datos usa el siguiente commando cambiando su usuario
      ```bash
     mysql -u tu_usuario -p nombre_base_de_datos < sql/blog_backup.sql
     ```

   
