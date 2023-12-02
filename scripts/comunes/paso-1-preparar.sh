#!/bin/bash

echo
echo "------------------------------------------------------------------------------"
echo "  Ejecutando Paso 1"
echo "------------------------------------------------------------------------------"
echo

# Indica que se interrumpa ante cualquier error
set -e

source "$( dirname "${BASH_SOURCE[0]}" )/0-variables.sh"

rm -rf $rutabase/resources/ios
rm -rf $rutabase/ios
rm -rf $rutabase/resources/android/icon
rm -rf $rutabase/resources/android/splash
rm -rf $rutabase/android

echo
echo "------------------------------------------------------------------------------"
echo "  npm - add ios"
echo "------------------------------------------------------------------------------"
echo
sleep 1
npm run build
sleep 1
cd $rutabase || exit 1
npm run ios:add
sleep 3
npm run android:add
sleep 3
npm run res-generate
sleep 1

echo
echo "------------------------------------------------------------------------------"
echo "  Actualizando IPHONEOS_DEPLOYMENT and version to $version"
echo "------------------------------------------------------------------------------"
echo

# cat $rutabase/ios/App/Podfile | head -n -4 > $rutabase/ios/App/Podfile
sed -i '' -e '$ d' $rutabase/ios/App/Podfile
sed -i '' -e '$ d' $rutabase/ios/App/Podfile
sed -i '' -e '$ d' $rutabase/ios/App/Podfile

sed 's/MARKETING_VERSION = 1.0;/MARKETING_VERSION = '${version}';/g' $rutabase/ios/App/App.xcodeproj/project.pbxproj >  $rutabase/ios/App/aux,txt
mv $rutabase/ios/App/aux,txt $rutabase/ios/App/App.xcodeproj/project.pbxproj

cat << EOF >> $rutabase/ios/App/Podfile
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
      config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"
      config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"
    end
  end
end
EOF

cd "$rutabase"/ios/App || exit 1
pod repo update
pod install

echo
echo "Completado paso-1 !"
