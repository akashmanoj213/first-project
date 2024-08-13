<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- Note: Any particular project can be run by passing in the name of the service along with the command. By default the "root" project mentioned in nest-cli.json is used.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Added functionality

- Husky has been added to enable git hooks to perform code linting, commit message linting and run tests before pushing commits from local to remote.
- commitlint has been added to perform ensure commit message adhere to standards. As of now, the commits have to follow [conventional commit format](https://conventionalcommits.org/).

- Specmatic has also been added to perform test-coverage (stubs needs to be explored as it requires standardisation of spec files). to run test, run "npm run contract". As of now, the script runs specmatic tests for first-project against api-spec.yaml file.
  A script has been added to main.ts to automatically create the spec file named auto-api-spec.yaml. If the spec file generated is accurate, it can be renamed to apic-spec.yaml and will be used whenever specmatic test is run.

- Class Validations are performed at the time of controller method invocation using nest js - class validator and class trasformer. It enables decorator based validations and is enable at the application level.

- Any new library that needs to be added can be added using the following:
  nest g library common-services/library-name
  Note: From the created structure, move service, module, etc. files from src/common-services into src/ folder. NestJS creates a redundant common-services folder inside src when using the nest g command. Update the paths in index.ts file inside src to export module and service properly.

- A docker-compose file has been created for each application that contains a production service and a dev service (marked by <service-name>-dev). The dev service can be setup with all required containers which will enable local development. Currently first-project app has been set up with pubsub-emulator and postgres comtainers added to its dependencies.
  The pubsub-emulator enables all pub-sub related commands using node js client. It is hosted on localhost:8085.
  The postgres container enables all db operations and is hosted on localhost:5033. Port 5033 has been chose to avoid any conflict with local postgres version that maybe running on 5032. All data is persisted using volume postgres-data.

The main.ts file includes a script that set-up topics and subscriptions for pub-sub and is run if the project is run on developmeent environment. Any new topics and subscriptions that the project might require can be added to the "topicsRequired" and "topicSubscriptions" list.

- Any new project that needs to be added to the monorepo needs to be added using "nest g app <project-name>"
