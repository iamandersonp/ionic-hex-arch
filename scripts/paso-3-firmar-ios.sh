#!/bin/bash

cd `dirname $0`/..

export entorno=$1

set -e

if [ ' '$entorno  == ' ' ]
then
  echo 'Pase como parametro el entorno: DESA, TEST, ANTE o PROD'
  exit 1
fi

if [ $entorno == 'DESA' ] || [ $entorno == 'TEST' ] || [ $entorno == 'ANTE' ]
then
  ./scripts/comunes/paso-3-firmar-ios.sh $entorno
fi
if [ $entorno == 'PROD' ]
then
  #En producción lo ejecutamos dos veces, una para desarrollo y otra para enterprise
    ./scripts/comunes/paso-3-firmar-ios.sh TEST
    ./scripts/comunes/paso-3-firmar-ios.sh PROD
fi
