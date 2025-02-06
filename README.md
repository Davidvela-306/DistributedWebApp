# **Backend Aplicaciones Distribuidas** 🚀

## **Propósito** 🎯

El objetivo de esta práctica es diseñar y configurar una infraestructura de alta disponibilidad y escalabilidad para una **aplicación web distribuida** utilizando **contenedores Docker**. El sistema estará compuesto por varios nodos que ejecutarán la misma aplicación web, un **balanceador de carga NGINX** y un **sistema de replicación de base de datos** (MySQL u otra base de datos equivalente).

El resultado esperado es una infraestructura eficiente, escalable y de alto rendimiento que aproveche las ventajas de la **contenedorización** y el **balanceo de carga distribuido**.

## **Arquitectura** 🏗️

La infraestructura de esta aplicación está compuesta por los siguientes elementos:

1. **Tres nodos de la aplicación web**: Ejecutando una versión de la misma aplicación web en contenedores Docker.
2. **Balanceador de carga NGINX**: Configurado para distribuir el tráfico entre los tres nodos de la aplicación de manera proporcional, utilizando un balanceo de carga con pesos.
3. **Base de datos con replicación**: Un servidor de base de datos MySQL principal, con un contenedor esclavo replicado para garantizar la alta disponibilidad.
4. **Orquestación con Docker Compose**: Para gestionar la creación y configuración de todos los contenedores y sus interacciones.

## **Instrucciones** ⚙️

### 1. **Configuración de los Contenedores de la Aplicación Web** 💻

Se crearán tres nodos que ejecutan la misma aplicación web, cada uno alojado en un contenedor Docker. La aplicación web debe cumplir con los siguientes requisitos:

- Una **página web** con contenido propio.
- Un **formulario** para el ingreso de datos.
- Una **base de datos** para almacenar la información ingresada a través del formulario.

### 2. **Configuración del Balanceador de Carga con NGINX** 🔄

El balanceador de carga NGINX distribuirá las solicitudes de manera proporcional entre los contenedores de la aplicación web. La configuración incluye:

- **Balanceo por pesos**: Asignar un peso a cada nodo para que el tráfico se distribuya de acuerdo con los recursos disponibles de cada servidor.
- **Verificación**: Asegurarse de que las solicitudes se distribuyan de manera justa según los pesos asignados a cada nodo.

### 3. **Implementación de la Replicación de la Base de Datos** 🔁

La infraestructura de base de datos será configurada de la siguiente manera:

- Un **contenedor principal de base de datos** (por ejemplo, MySQL).
- Un **contenedor esclavo de base de datos** que replica los datos del contenedor principal para garantizar la alta disponibilidad.

El proceso incluye la instalación y configuración de la replicación de base de datos, así como la verificación de que la replicación se realice correctamente.

### 4. **Orquestación de Contenedores con Docker Compose** 🛠️

Se utilizará **Docker Compose** para gestionar la creación y ejecución de todos los contenedores. El archivo `docker-compose.yml` debe definir los contenedores de la aplicación web, el balanceador de carga NGINX, y la base de datos con la configuración de replicación.

**Pasos para configurar Docker Compose:**

1. Crear un archivo `docker-compose.yml` con la definición de todos los servicios.
2. Utilizar el comando `docker-compose up` para levantar todos los contenedores de forma orquestada.
3. Configurar las redes y volúmenes necesarios para la correcta comunicación entre los contenedores.

### 5. **Pruebas de Rendimiento** 📊

Una vez que la infraestructura esté configurada, es fundamental realizar pruebas de rendimiento para evaluar el desempeño de la solución:

- **Pruebas de escalabilidad**: Asegurarse de que el sistema maneja correctamente una carga creciente.
- **Pruebas de alta disponibilidad**: Verificar que, en caso de fallos en un nodo, la carga se distribuye correctamente entre los nodos restantes.
- **Verificación de la replicación de la base de datos**: Comprobar que los datos se replican adecuadamente entre el servidor principal y el esclavo.

## **Estructura del Proyecto** 📁

La estructura básica de los directorios y archivos del proyecto es la siguiente:

C:.
├───db
│   └───nginx
├───nginx
├───requests
├───servidor1
│   └───src
│       ├───config
│       ├───middleware
│       └───routes
├───servidor2
│   └───src
│       ├───config
│       ├───middleware
│       └───routes
└───servidor3
    └───src
        ├───config
        ├───middleware
        └───routes


## **Requisitos Previos** 🛠️

- **Docker**: Asegúrate de tener Docker instalado en tu máquina. Puedes obtenerlo desde [aquí](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Si aún no lo tienes, puedes instalarlo siguiendo las instrucciones [aquí](https://docs.docker.com/compose/install/).
  
## **Instrucciones de Instalación** 🔧

### 1. **Clonar el Repositorio** 🔲

Clona el repositorio en tu máquina local:

```bash
git clone <URL del repositorio> backend-app-distribuida
```
```bash
cd backend-app-distribuida
```
`En una terminal linux:`
```bash
sh deploy.sh
```
Este proyecto está bajo la licencia `MIT`.


## Autores

- [@Davidvela-306](https://github.com/Davidvela-306)
- [@Scarlett2010](https://github.com/Scarlett2010)
