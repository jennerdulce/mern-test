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

- run  `npm run server` to see if it works

## Add boilerplate for express

- in `server.js` add boilerplate for express
    - express is backend web framework we are using. is important for deploying
- bring in dotenv
    - allows us to create a `.dotenv` files to create environment variables
        - environment variables are variables that generally should be kept secret from being seen
- create `port` variable to create a port for the server to run on
- create `app` initialized express
- `app.listen(port, () => console.log('Server started on port ${port}'))`
- test with npm run server

## Create environment variables

- create `.env` file in root directory
- create environtment variables for `PORT` and `NODE_ENV`
- `NODE_ENV = development`
- `PORT = 3000`
- you access environment variables by using this command i.e. `process.env.PORT` 

## Check to see if working

- use postman or swagger to see if local api is working
- create a get request that will return text
```js
    app.get('/api/goals', (req, res) => {
        res.json(message: 'get goals')
    })
```

- in postman / swagger enter the the local server along with the newly created endpoint
    - `http://localhost:3000/api/goals`
- should return a json object with created properties

## Create routes

### Create routes folder

- create a `routes` folder in backend folder
    - this is imported into `server.js` and is used to organize routes rather than having all routes within server.js
- create a new `js` file for said routes: the name is created depending what the routes should return, in this case `goals`
- bring in express and router
- export these routes with `module.exports`

### Changing of get request

```js
// OLD
app.get('/api/goals', (req, res) => {
    res.json({message: 'Get goals'})
})

// NEW
app.use('/api/goals', require('./routes/goalRoutes'))
// app.use is used instead of .get becuase it is using imported routes
// the routes that are imported have the utilize CRUD actions

// in goalRoutes.js
// OLD
router.get('/', (req, res) => {
    res.json({message: 'Get goals'})
})

// NEW
router.get('/', (req, res) => {
    res.status(200).json({message: 'Get goals'}) // sends a status code and json object
})
```
- in this example, when called `/` in the goalRoutes signifies the index/default of those routes

### Create other CRUD routes

- create post, put, and delete routes
- put and delete routes look like this:

```js
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update goal: ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete goal: ${req.params.id}`})
})
```
- they require an ID, this id is used to identify entries within the database to modify / delete
- the `/:id` portion called a `request parameter` and can be accessed by using `req.params.id`
