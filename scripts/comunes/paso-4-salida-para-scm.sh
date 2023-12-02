#!/bin/bash
echo
echo "------------------------------------------------------------------------------"
echo "  Ejecutando Paso 4"
echo "------------------------------------------------------------------------------"
echo

# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

echo
echo "------------------------------------------------------------------------------"
echo "  Eliminando Paquetes que no se necesitan en scm"
echo "------------------------------------------------------------------------------"
echo
npm rm native-run cordova-res cypress
sleep 1
npm pkg delete scripts.postinstall

echo
echo "------------------------------------------------------------------------------"
echo "  Copiando directorio"
echo "------------------------------------------------------------------------------"
echo
rm -rf $$rutascm/$proyecto 2> /dev/null
rsync -avz \
	--exclude .git \
	--exclude .angular \
	--exclude docs \
	--exclude documentation \
	--exclude node_modules \
	--exclude plugins \
	--exclude platforms \
	--exclude build \
	--exclude graphics \
	--exclude coverage \
	--exclude android \
	--exclude ios \
	--exclude www \
	--exclude .DS_Store \
	--exclude .xarchive \
	"$rutabase" "$outdir/$salida/"

echo
echo "------------------------------------------------------------------------------"
echo "  Seleccionando fichero enviroment.prod de entorno"
echo "------------------------------------------------------------------------------"
echo

export fm=$rutascm/$proyecto/src/environments/environment.prod
export extension=ts
echo "rm $fm-prev.$extension"
echo "rm $fm.$extension"
if [ -f $fm-prev.$extension  ]; then
  rm $fm-prev.$extension  2> /dev/null
fi
if [ -f $fm.$extension  ]; then
  rm $fm.$extension  2> /dev/null
fi

find $rutascm -name .DS_Store -exec rm {} \;

if [ $entorno == 'PROD' ]
then
    echo
    echo "------------------------------------------------------------------------------"
    echo "  Comprimiendo librerias de PROD"
    echo "------------------------------------------------------------------------------"
    echo
	[ -d ${rutascm}/${proyecto}_cache_librerias ] && rm -rf ${rutascm}/${proyecto}_cache_librerias
	mkdir ${rutascm}/${proyecto}_cache_librerias
    cd $rutabase
	zip -r -X -q ${rutascm}/${proyecto}_cache_librerias/node_modules_${entorno}.zip node_modules
	zip -r -X -q ${rutascm}/${proyecto}_cache_librerias/android_${entorno}.zip android
	zip -r -X -q ${rutascm}/${proyecto}_cache_librerias/ios_${entorno}.zip ios
	zip -r -X -q ${rutascm}/${proyecto}_cache_librerias/plugins_${entorno}.zip plugins
	zip -r -X -q ${rutascm}/${proyecto}_cache_librerias/documentation_${entorno}.zip documentation
  echo "  Creado zip en ${rutascm}/${proyecto}_cache_librerias/node_modules_${entorno}.zip"
  echo "  Creado zip en ${rutascm}/${proyecto}_cache_librerias/plugins_${entorno}.zip"
  echo "  Creado zip en ${rutascm}/${proyecto}_cache_librerias/documentation_${entorno}.zip"
  echo "  Creado zip en ${rutascm}/${proyecto}_cache_librerias/android_${entorno}.zip"
  echo "  Creado zip en ${rutascm}/${proyecto}_cache_librerias/ios_${entorno}.zip"
fi

echo
echo "------------------------------------------------------------------------------"
echo "  Adaptando package.json para que compile bien en la versión web"
echo "------------------------------------------------------------------------------"
echo
cd $rutabase

echo
echo "------------------------------------------------------------------------------"
echo "  Eliminando Android and IOS"
echo "------------------------------------------------------------------------------"
echo

sleep 1
npm run ios:rm
sleep 1
npm run android:rm
sleep 1

echo
echo "------------------------------------------------------------------------------"
echo "  Comprimiendo"
echo "------------------------------------------------------------------------------"
echo

cd $rutascm
sleep 1

if [ -f $outdir/$salida/${proyecto}{$entorno}.zip ]
then
  rm ${outdir}/${salida}/${proyecto}{$entorno}.zip 2> /dev/null
fi

zip -rqX9T ${proyecto}{$entorno}.zip $proyecto
echo "zip -rqX9T ${proyecto}{$entorno}.zip $proyecto"

rm -rf ${outdir}/${salida}/${proyecto} 2> /dev/null
echo "  Creado zip en $outdir/$salida/${proyecto}{${entorno}}.zip"

echo
echo "------------------------------------------------------------------------------"
echo "  Restaurando paquetes necesarios para compilar en local"
echo "------------------------------------------------------------------------------"
echo
cd $rutabase
sleep 1
npm i -D native-run cordova-res cypress@13.4
sleep 1
npm pkg set scripts.postinstall="npm run copy:enviroment && npm run setup:git-hooks"

echo
echo "Completado paso-4 !"
