#!/bin/bash

echo
echo "------------------------------------------------------------------------------"
echo "  Ejecutando Paso 0"
echo "------------------------------------------------------------------------------"
echo

# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

echo
echo "------------------------------------------------------------------------------"
echo "  Configurando prerrequisitos previos a npm"
echo "------------------------------------------------------------------------------"
echo

# Permisos de los ficheros
cd $rutabase/scripts
chmod 777 $rutabase/scripts/*.sh
chmod 777 $rutabase/scripts/comunes/*.sh
dos2unix $rutabase/scripts/*
dos2unix $rutabase/scripts/comunes/*

# Aumentamos el numero de ficheros abiertos posibles
export mf="`sysctl kern.maxfiles`"
if [ "$mf" != 'kern.maxfiles: 200000'  ]
then
  echo Introduce la contraseña del usuario enterpriseapps para aumentar el numero de ficheros abiertos posibles
  sudo sysctl -w kern.maxfiles=200000
  sudo sysctl -w kern.maxfilesperproc=190000
fi

echo
echo "------------------------------------------------------------------------------"
echo "  Borrando directorios y renombrando ficheros"
echo "------------------------------------------------------------------------------"
echo
rm -rf $rutabase/node_modules
rm -rf $rutabase/plugins
rm -rf $rutabase/build
rm -rf $rutabase/resources/ios
rm -rf $rutabase/ios
rm -rf $rutabase/resources/android/icon
rm -rf $rutabase/resources/android/splash
rm -rf $rutabase/android
rm -rf $rutabase/documentation
rm -rf $rutabase/coverage
rm -rf $rutabase/www
mkdir $rutabase/www

find $rutabase -name harvest.sig -exec rm {} \;

echo
echo "Completado!"


echo "------------------------------------------------------------------------------"
echo "  Eliminando pluggin MobileIron"
echo "------------------------------------------------------------------------------"
echo

# Borramos la configuración anterior de MobileIron si la hubiera. Hay que hacerlo antes de npm i
# npm run appConnect:rm

echo
echo "------------------------------------------------------------------------------"
echo "  npm i "
echo "  npm audit fix "
echo "------------------------------------------------------------------------------"
echo

npm pkg set scripts.postinstall="npm run copy:enviroment && npm run setup:git-hooks"
sleep 1
cd $rutabase || exit 1
npm i
sleep 1
npm i -D native-run cordova-res cypress@13.4
sleep 1
# npm i -D spoxies/cordova-plugin-ionic-webview#webkit-ios-16.4-enable-inspection
#npm audit fix

echo
echo "------------------------------------------------------------------------------"
echo "  Generando Documentacion"
echo "------------------------------------------------------------------------------"
echo

npm run compodoc:build

echo
echo "------------------------------------------------------------------------------"
echo "  Ejectuando Test de Cobertura"
echo "------------------------------------------------------------------------------"
echo
npm run test:coverage | grep "All files"

echo
echo "Completado!"
