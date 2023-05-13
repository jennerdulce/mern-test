# mern-test

## BEFORE PRODUCTION CREATE. env FOLDER

```js
// Change NODE_ENV between development or production.
// Restart server if changed
NODE_ENV = development
PORT = 3000
```

## Setting up backend
### Step 1 initialize npm

- create repo
- clone repo
- create folder named `backend`
- enter `source ~/.bash_profile` in terminal so that `npm init` works
- enter `npm init` while in root of folder
    - will create package.json
    - enter `server.js` as entry point
- install dependencies
    - in root folder enter command in terminal `npm i express dotenv mongoose colors`
    - express: server
    - dotenv: enables you to create environment variables
    - mongoose: database
- install DEV dependency 
    - in root folder enter command in terminal `npm i -D nodemon`
    - tool that constantly watches server js so that we do not have to keep and restarting
    - refreshes after changes

### Add scripts

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

### Add boilerplate for express

- in `server.js` add boilerplate for express
    - express is backend web framework we are using. is important for deploying
- bring in dotenv
    - allows us to create a `.dotenv` files to create environment variables
        - environment variables are variables that generally should be kept secret from being seen
- create `port` variable to create a port for the server to run on
- create `app` initialized express
- `app.listen(port, () => console.log('Server started on port ${port}'))`
- test with npm run server

### Create environment variables

- create `.env` file in root directory
- create environtment variables for `PORT` and `NODE_ENV`
- `NODE_ENV = development`
- `PORT = 3000`
- you access environment variables by using this command i.e. `process.env.PORT` 

### Check to see if working

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

### Create routes

#### Create routes folder

- create a `routes` folder in backend folder
    - this is imported into `server.js` and is used to organize routes rather than having all routes within server.js
- create a new `js` file for said routes: the name is created depending what the routes should return, in this case `goals`
- bring in express and router
- export these routes with `module.exports`
- import routes in `server.js`
    - `const varName = require("./routes/goalRoutes")`

#### Changing of get request

```js
// OLD
app.get('/api/goals', (req, res) => {
    res.json({message: 'Get goals'})
})

// NEW
app.use('/api/goals', goalRoutes)
// app.use is used instead of .get becuase it is using imported routes
// the routes that are imported have the utilize CRUD actions and are tied to the variable goalRoutes

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

#### Create other CRUD routes

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
- test out newly created routes

### Create controller for routes

- point of controllers is to clean up code and separate so that we can immediatly find problems for bugs
- create `contollers` folder in your `backend` folder
- create functions

```js
const getGoals = (req, res) => {
    res.status(200).json({message: 'Get goals'})
}
```

- export functions by putting in `module.exports` object

```js
module.exports = {
    getGoals
}
```

- import into correlating `routes` folder
    - `const {getGoals} = requrie('../controllers/goalController)`
- use the imported function

```js
// in routes file

// OLD
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get goals '})
})

// NEW
router.get('/', getGoals)
router.post('/', setGoal)

// OPTIONAL: you can further consolidate these like so
// router.route('/').get(getGoals).post(setGoal)

```

### Passing body data

- is sent through middleware
- accessed by using `req.body` within a controller method
- in `server.js` need to add two lines of code
    - `app.use(express.json())`
    - `app.use(express.urlencoded({extended: false}))`
- adding an error message would look something like this

```js
// Built in error handler
if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field') // this method requires a middleware
    }

// Other method
if(!req.body.text){
        res.status(400).json({ message: 'please add text property to body' })
    }
```

### Setting up error handler / middleware

- middlewares are functions that execute during the request response cycle
    - similar to callback functions
- following steps overrides error handler with one we create via middleware
- create new folder named `middleware` in `backend` folder
- create new file called `errorMiddleware`

```js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 // 500 status code is server errror
    res.status(statusCode)
    console.log(process.env.NODE_ENV)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}
// err overrides default error
// next jumps to the next middleware if there is one.
```
- export middleware and import into `server.js`

## Setting up database

- add `async` to all contoller methods
- typically we make requests to APIs which take time to retrieve
- `async` and `await` are keywords that halt the rest of the code from being ran until the process of retrieveing information has been completed

```js
// OLD
const getGoals = (req, res) => {
    res.status(200).json({ message: 'Get goals'})
}

// NEW
const getGoals = async(req, res) => {
    res.status(200).json({ message: 'Get goals'})
}
```

- we can utilize the package `express async handler` to handle async await calls OR utilize the `await` keyword before api calls

- if using `express async handler`
    - `npm i express-async-handler`
    - initialize into the controller
    - `const asyncHandler = require('express-async-handler')`
    - alter the async functions
```js
// OLD
const getGoals = async(req, res) => {
    res.status(200).json({ message: 'Get goals'})
}

// NEW
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get goals'})
})
```