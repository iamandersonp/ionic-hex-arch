#!/bin/bash

echo
echo "------------------------------------------------------------------------------"
echo "  Ejecutando Paso 3"
echo "------------------------------------------------------------------------------"
echo

# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

echo
echo "------------------------------------------------------------------------------"
echo "  Firmado para ${salida}"
echo "------------------------------------------------------------------------------"
echo
cd $rutabase || exit 1
xcodebuild -exportArchive \
  -archivePath $rutabase"/ios/${workspace}.xcarchive" \
  -exportPath $rutabase/../salida/${salida}/${proyecto}  \
  -exportOptionsPlist $rutabase/scripts/comunes/${plist}

rm -rf $rutabase/../salida/${salida}/"$workspace"{$entorno}.ipa
rm -r $rutabase/ios/"$workspace".xcarchive
mv $rutabase/../salida/${salida}/${proyecto}/App.ipa $rutabase/../salida/${salida}/${proyecto}/"$workspace"{$entorno}.ipa
mv $rutabase/../salida/${salida}/${proyecto}/"$workspace"{$entorno}.ipa $rutabase/../salida/${salida}

echo
echo "Completado paso-3 !"
