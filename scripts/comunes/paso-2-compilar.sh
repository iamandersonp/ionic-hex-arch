#!/bin/bash

echo
echo "------------------------------------------------------------------------------"
echo "  Ejecutando Paso 2"
echo "------------------------------------------------------------------------------"
echo

# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

echo
echo "------------------------------------------------------------------------------"
echo "  Borrado directorios de salidas"
echo "------------------------------------------------------------------------------"
echo

rm -rf $rutabase/ios/$workspace.xcarchive
rm -rf $rutabase/../salida/${salida}/${proyecto}
mkdir -p $rutabase/../salida/${salida}/${proyecto}

echo
echo "------------------------------------------------------------------------------"
echo "  Cordova - prepare y build para iOS"
echo "------------------------------------------------------------------------------"
echo

# Nota cordova build = prepare + compile
cd "$rutabase" || exit 1

npm run ios:build_$entorno
npm run android:build_$entorno


npx ionic cap sync ios
xcodebuild -workspace \
  $rutabase"/ios/App/App.xcworkspace" \
  -scheme App clean archive \
  -configuration $RELEASE -destination generic/platform=iOS \
  -archivePath $rutabase/"ios/${workspace}.xcarchive" \
  build CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY="${IDENTITY}" \
  PROVISIONING_PROFILE=$PROFILE \
  developmentTeam=$TEAM

echo "----------------------------- Salida xcarchive en: $rutabase/ios/$workspace.xcarchive"

rm -rf $rutabase/../salida/${salida}/"$workspace"{$entorno}.xcarchive
cp -r $rutabase/ios/"$workspace".xcarchive $rutabase/../salida/${salida}/${proyecto}/"$workspace"{$entorno}.xcarchive
mv $rutabase/../salida/${salida}/${proyecto}/"$workspace"{$entorno}.xcarchive $rutabase/../salida/${salida}

echo
echo "Completado paso-2 !"
