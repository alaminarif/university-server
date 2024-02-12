## Backend project setup:

### Install command:

```shell
npm init
tsc --init
```

Dev Dependencies:

```shell
yarn add -D typescript @types/express ts-node-dev @types/cors
```

Dependencies:

```shell

yarn add express mongoose dotenv cors
```

#### Added pakage.json > script

```json
"start": "ts-node-dev --respawn --transpile-only src/server.ts"
```

**Added .env file**

```js

NODE_ENV = production

PORT = 5000
DATABASE_URL =
```

**Added Config>index.ts file**

```js
import dotenv from 'dotenv'

import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
```

### Setup Typescript Prettier Eslint:

**Typescript Prettier Eslint**
tsconfig.json file second line

```json
"include": ["src"],
"exclude": ["node_modules"],
```

Install plugins:

```shell
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

Add .eslintrc file
<br>
Package.json file added

#### Added pakage.json > script

```json
"lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
```

#### Added pakage.json > script

```json
"lint:fix": "eslint --fix",
```

Added .eslintignore file

```js
node_modules
dist
```

---

### setup prettier

```shell
yarn add -D prettier
```

#### Added .prettierrc file

#### Added pakage.json > script

```json
"prettier:check": "yarn prettier --write .",
```

#### Replace script>

```json
 "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
```

### Avoiding conflicts

```shell
yarn add -D eslint-config-prettier
```

#### replace .eslintrc

---

### Husky:

```shell
yarn add husky –dev

yarn husky install
```

### precommit file > “npm test” replace yarn lint:check

#### Added pakage.json > script

```json
"lint-prettier": " yarn lint:check && yarn prettier:check"

```

### Lint staged

### Install lint-staged

```shell

Yarn add -D lint-staged
```

#### Added pakage.json > script

```json
"lint-staged": {
"src/**/*.ts": "yarn lint-prettier"
},
```

### precommit file > “yarn lint:check” replace

```js
yarn lint-staged
```

### .eslintrc > rules replace:

```json
"rules": {
"no-unused-vars": "error",
"no-console":"error",
"no-undef":"error",
"no-unused-expressions":"error",
"no-unreachable":"error",
"@typescript-eslint/consistent-type-definitions": ["error", "type"]
},
```

---

### Logger:

#### Instals logger

```shell
yarn add winston
```

### Added src>share>logger.ts

```ts
import winston from 'winston'
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'right meow!' }), timestamp(), prettyPrint()),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
export default logger
```

### custom logger

#### added function logger > new transpoet.file

```ts
new transports.File({
  filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
  level: 'info',
})
```

#### added function errorLogger > new transpoet.file

```ts
new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
```

#### added myFormat function logger

```ts
// import
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})
```

#### time beutify

```ts
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hours}: ${minutes}: ${second} [${label}] ${level}: ${message}`
})
```

---

## manage winston logs

#### winstone rotate logs

```shell
yarn add winston-daily-rotate-file

```

```ts
// import
import DailyRotateFile from 'winston-daily-rotate-file'
```

### replace new transports.File

#### Succes logger

```ts

new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'umi-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),

```

#### error logger

```ts
new DailyRotateFile({
filename: path.join(
process.cwd(),
'logs',
'winston',
'errors',
'umi-%DATE%-error.log'
),
datePattern: 'YYYY-DD-MM-HH',
zippedArchive: true,
maxSize: '20m',
maxFiles: '14d',
}),
```

---

### .vscode > setting.json> :

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```
