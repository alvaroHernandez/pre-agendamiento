#!/usr/bin/env bash



#leer la variable de entorno en la que se esta ejecutando este docker

#$STAGE_ENV = qa



#crear un archivo .env dependiendo de esa variable de entorno
echo "moving .env.$STAGE_ENV to .env"
mv .env.$STAGE_ENV .env


yarn build (esto va a tomar las variables de entorno)



