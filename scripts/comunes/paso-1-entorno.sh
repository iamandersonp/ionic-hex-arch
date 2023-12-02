#!/bin/bash
#
# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

echo
echo "------------------------------------------------------------------------------"
echo "  Seleccionando fichero enviroment.prod de entorno"
echo "------------------------------------------------------------------------------"
echo

export fm=$rutabase/src/environments/environment.prod
export extension=ts
echo "cp $fm{$entorno}.$extension $fm.$extension"
if [ -f $fm.$extension ]; then
  # Recuperamos el fichero del entorno correcto
  cp $fm.$extension $fm-prev.$extension
fi
if [ -f $fm{$entorno}.$extension ]; then
  # Recuperamos el fichero del entorno correcto
  cp $fm{$entorno}.$extension $fm.$extension
fi

echo
echo "Completado!"

echo
echo "Completado paso-0 !"
