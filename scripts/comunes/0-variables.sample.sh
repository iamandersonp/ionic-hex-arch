
#!/bin/bash
#
# Parametros recibidos
#

export entorno=$1
export sufijo='_'$entorno
proyecto="ionic-hex-arch"
export version="1.0.0"

cd `dirname $0`/../..
export rutabase=`pwd`
export outdir=$rutabase/../salida

if [ $entorno == 'TEST' ]
then
  export salida=development
  export plist='exportPlist_TEST.plist'
  workspace="Tareas BE"
  export PROFILE="0fd6f140-bbdb-48cb-a9af-9c0e3775d59c" \
  export TEAM="7G5CZN4295"
  export IDENTITY="iPhone Developer: Antonio Pérez Ocete (5T5S2PZWF3)"
  export RELEASE="debug"
fi
if [ $entorno == 'ANTE' ]
then
  # Es enterprise ya que va a distribuirse en MobileIron
  export salida=enterprise
  export plist='exportPlist_ANTE.plist'
  workspace="Tareas BE ANTE"
  export PROFILE="50b11eb9-d917-4e60-8919-e94bd5e51f7d" \
  export TEAM="7G5CZN4295"
  export IDENTITY="iPhone Developer: Antonio Pérez Ocete (5T5S2PZWF3)"
  export RELEASE="debug"
fi
if [ $entorno == 'PROD' ]
then
  export salida=enterprise
  export plist='exportPlist_PROD.plist'
  workspace="Tareas BE"
  export PROFILE="6b213277-57f4-462f-af79-b52e5c6d24ee" \
  export TEAM="7G5CZN4295"
  export IDENTITY="iPhone Distribution: Banco de Espana"
  export RELEASE="release"
fi

export rutascm=$outdir/$salida
