# mern-test

## Step 1 initialize npm

- create repo
- clone repo
- create backend folder
- enter `source ~/.bash_profile` in terminal so that `npm init` works
- enter `npm init` while in root of folder
    - will create package.json
    - enter `server.js` as entry point
- install dependencies
    - in root folder enter command in terminal `npm i express dotenv mongoose colors`
    - express: server
    - dotenv: hide variables
    - mongoose: database
- install DEV dependency 
    - in root folder enter command in terminal `npm i -D nodemon`
    - tool that constantly watches server js so that we do not have to keep and restarting

## Add scripts

- in `package.json` and add a `start` and `server` script
    - scripts created are `npm run start` and `npm run server`

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
  }
```