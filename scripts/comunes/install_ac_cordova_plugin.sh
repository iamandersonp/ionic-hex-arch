#!/bin/bash

# Copyright © 2013-2014 MobileIron. All rights reserved.

# This script is used to install or update the AppConnect cordova plugin in a cordova project.
# It takes the plugin zip file, which is part of the SDK release, as input.
#
# It creates the iOS platform for the cordova project, if it does not exist and modify the
# main.m file of the iOS project to make it an AppConnect app.

function failed()
{
  echo "Failed: $@" >&2
  exit 1
}

function usage {
  echo ""
  echo "Usage: $(basename $0) -p <path to plugin zip file>"
  echo "       $(basename $0) -h"
  echo "This script MUST be run from the top level directory of a Cordova project."
  echo ""
  echo ""
}

unset plugin_zip

# evaluate args:
while getopts "p:h" ARGS;
do
  case $ARGS in
    p) plugin_zip=$OPTARG;;
    h) usage
      exit 0;;
    *) usage
      exit 1;;
  esac
done

if [ -z $plugin_zip ]; then
  echo "Path to plugin zip is missing"
  usage
  exit 1
fi

# Check if it is a cordova project
npx cordova info
if [ $? -eq 0 ]; then
  echo "Running from cordova project: OK"
else
  echo "Current directory is not a cordova project"
  usage
  exit 1
fi

# unzip the plugin zip
unzip -o "$plugin_zip"
if [ $? -ne 0 ]; then
  echo "Unzipping of plugin zip file failed. Please provide correct path to the plugin zip file"
  usage
  exit 1
fi

if [ ! -d "AppConnectPlugin" ]; then
  echo "Directory not found: AppConnectPlugin. Please provide correct path to the plugin zip file"
  usage
  exit 1
fi

APPCONNECT_PLUGIN_ROOT="$(pwd)/AppConnectPlugin"

npx cordova plugin remove com.mobileiron.cordova.appconnect
npx cordova plugin add AppConnectPlugin

# Create iOS project if one does not exist
npx cordova platform add ios

# Import AppConnect.h in main.m and rename principal UIApplication class name to kACUIApplicationClassName
pushd platforms/ios
mainfile=`find . -name main.m`
sed -i '' -e $'s/int main/\#import <AppConnect\/AppConnect\.h>\\\nint main/' "$mainfile"
if [ "$?" -ne "0" ]; then
  echo "Failed to update $mainfile. Refer to the documentation on how to update the main.m file of the iOS project."
  exit 1
fi

sed -i '' -e '/UIApplicationMain/s/\([^,]*\),\([^,]*\),\([^,]*\),\([^;]*;\)/\1,\2, kACUIApplicationClassName,\4/' "$mainfile"
if [ "$?" -ne "0" ]; then
  echo "Failed to update $mainfile. Refer to the documentation on how to update the main.m file of the iOS project."
  exit 1
fi

# cp "${APPCONNECT_PLUGIN_ROOT}/post_embed_actions.sh" .

popd

#rm -rf "${APPCONNECT_PLUGIN_ROOT}"

echo "AppConnect plugin has been installed successfully. Read the plugin documentation and implement necessary javascript functions."

