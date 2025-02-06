#!/bin/bash

# Cambiar al directorio db
cd ./db

# Comprobar si el contenedor db ya está en ejecución
if [ "$(docker ps -q -f name=db)" ]; then
    # Si el contenedor está en ejecución, usamos up -d
    echo "Contenedor db ya existe, ejecutando docker-compose up -d"
    docker-compose up -d &
else
    # Si no existe, reconstruir e iniciar con --build
    echo "Contenedor db no existe, ejecutando docker-compose up --build"
    docker-compose up --build &
fi

# Volver al directorio raíz
cd ..

# Comprobar si el contenedor backend ya está en ejecución
if [ "$(docker ps -q -f name=backend)" ]; then
    # Si el contenedor está en ejecución, usamos up -d
    echo "Contenedor backend ya existe, ejecutando docker-compose up -d"
    docker-compose up -d &
else
    # Si no existe, reconstruir e iniciar con --build
    echo "Contenedor backend no existe, ejecutando docker-compose up --build"
    docker-compose up --build &
fi

# Esperar a que todos los procesos en segundo plano terminen
wait
