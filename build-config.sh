[ ! -f config.js ] && exit 0

git submodule init
git submodule update
cp config.js generator/
cd $_
npm i
node index.js > ../dist/config.json
