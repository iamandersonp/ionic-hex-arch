
cd `dirname $0`/..

export entorno=$1

set -e

if [ ' '$entorno  == ' ' ]
then
  echo 'Pase como parametro el entorno: DESA, TEST, ANTE o PROD'
  exit 1
fi

if [ $entorno == 'DESA' ] || [ $entorno == 'TEST' ] || [ $entorno == 'ANTE' ] || [ $entorno == 'PROD' ]
then
  ./scripts/paso-0-preparar.sh  $entorno
  ./scripts/paso-1-entorno.sh  $entorno
  ./scripts/paso-1-preparar.sh  $entorno
fi
