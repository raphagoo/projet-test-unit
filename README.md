# Projet-test-unit
[![Node.js CI](https://github.com/raphagoo/projet-test-unit/actions/workflows/node.js.yml/badge.svg)](https://github.com/raphagoo/projet-test-unit/actions/workflows/node.js.yml) ![nycrc config on GitHub](https://img.shields.io/nycrc/raphagoo/projet-test-unit?config=api%2F.nycrc)


## Installation (Through Docker)

```sh
docker-compose build
```

```sh
docker-compose up -d
```

FO will listen on 127.0.0.1:8080 and API on 127.0.0.1:9000

## Installation (manually)

### API

```sh
cd api
```

```sh
npm i
```

```sh
node ./fixtures/products_.js
```

```sh
npm start
```

### FO

```sh
cd fo
```

```sh
yarn install
```

```sh
npm start
```

## Test
### Back (Mocha)
```sh
npm test
```

### Front (Cypress)

Les tests avec Cypress contient les tests fonctionnel des composants. A cause des problèmes rencontrés avec Vue.js

```sh
npm run cypress:open
```

