# mern-test

- `npm run server` to run backend
- `npm run client` to run frontend

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
    - in root folder enter command in terminal `npm i express dotenv mongoose colors bcryptjs jsonwebtoken`
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

### Creating a new entry

- Ensure that you pass data into the request body

### Setting up MongoDB Atlas

- MongoDB is a document database
    - have collections of documents / data in the form of a json object
- relational database
    - tables, rows, columns
- Atlas is a cloud database
- Compass is a desktop GUI
- follow tutorial at [Traversy Media](https://youtu.be/-0exw-9YJBo?t=2211)
- How to connect cluster to application [Connect Atlas Cluster](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/#connect-to-your-atlas-cluster)
- obtain your url link
- create new URI in your `.env` file
- ensure you replace the password with the proper password
- create a `config` folder
- create a file name `db.js` in new `config` folder
- create function to connect to db upon server startup
- export function
- import function into `server.js`
- invoke connection to db function

### Adding models to our database

- create new folder called `model` within `backend` folder
- create new file called `goalModel.js` in `model` folder

#### Defining our schema

- creating the fields for a model i.e. Model for Car
    - Car
        - color
        - type
        - year
        - make

- in `goalModel.js`
- import mongoose
    - `const mongoose = requrie('mongoose')`
- create a schema

```js
const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value]
    }
}, {
    timestamps: true // creates a updated at and created at field
})

module.exports = mongoose.model('Goal', goalSchema) // creates a Goal model with our schema
```

- import newly created model into controller
- importing this model has built in methods that you can utilize to make requests to your API

```js
// Within controller
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

```

- add functionality to create method (post)

```js
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})
```

- add functionality to update method (put)

```js
const goal = await Goal.findById(req.params.id)
if(!goal){
    res.status(400)
    throw new Error('Goal not found')
}

const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
})
res.status(200).json(updatedGoal)
```

- add functionality to delete method (delete)
    - is very similar to update method


```js
const goal = await Goal.findById(req.params.id)
if(!goal){
    res.status(400)
    throw new Error('Goal not found')
}

await Goal.findByIdAndDelete(req.params.id)
res.status(200).json({ 
        message: 'Goal Deleted',
        id: req.params.id 
    })


```

### JWT

- install JWT to app
- npm i jsonwebtoken

#### Add user model

- create new file in models folder called `userModel.js`
- again bring in mongoose with `const mongoose = require('mongoose)`

```js
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name]
    },
    password: {
        type: String,
        required: [true, 'Please add a password]
    },
    email: {
        type: String,
        required: [true, 'Please add a email],
        unique: true
    },
    // name: {
    //     type: String,
    //     required: [true, 'Please add a name]
    // },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
```

#### Creating a relationship

- Each USER will create a goal
- goals are tied to users so we have to make that connection
- in the `goalModel.js`

```js
const goalSchema = mongoose.Schema({
    // Add user property
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'User' // Which MODEL this objectID in type refers to
    },
    text: {
        type: String,
        required: [true, 'Please add ad text value']
    }
})
```

#### Creating user routes

- With creating a new model, you need to also create new routes as well as a controller for that model
- create a new file called `userRoutes.js` in the `routes` folder

```js
const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/userController')

router.post('/', registerUser)

module.exports = router
```

- go into `server.js` import the newly created routes
    - `app.use('/api/users', requrie('./routes/userRoutes'))`

#### Create a controller

```js
const registerUser = (req, res) => {
    res.json({ message: 'register user '})
}

module.exports = {
    registerUser
}

```

#### Registering a user

- This step requires JSONWEBTOKEN
- To do this, we will be using jwt (JSONWEBTOKEN), bcrypt, and Mongoose
- import the following within the a controller that will utilize JWT
    - where some sort of login is

```js
const jwt = require('jsonwebtoken')

// bcrypt to hash our passwords
const bcrypt = requrie('bcryptjs')
const asyncHandler = require('express-async-handler')


// controller method with basic authentication checks as a user registers
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    // While registering a user, ensure that all 3 requirements are filled out
    if (!name || !email || !password) {
        res.status(400)
    }

    // Check to see if the user exists
    const userExists = await Uer.findOne( {email} )
    if (userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10) // how many time to salt
    const hashedPassword = await bcrypt.hash(password, salt) // password chosen and salt

    // create / register user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
       res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
       }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

```

#### login functionality

- create a controller method that will authenticate and login a user

```js

const loginUser = (req, res) => {

const { email, password } = req.body

// checks to find a user
const user = await User.findOne({email})

// use a bcrypt method to compare password with hashed password in the database
if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
       }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

}
```

#### utilizing jsonwebtoken

- created when user registers
- checked when user logs in
- create an environmental variable in `.env` file
    - `JWT_SECRET = asecret` 
- restart server
- within a controller

```js
// Generate JWT
const generateToken = (id) => {
    // This is how we pretty much create a property for the jwt token
    // we will attatch the users id to the token
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// add this new helper function to the controller method that registers a new user
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
    }

    const userExists = await User.findOne({ email })
    if ((userExists)) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // utilizes a user's id here
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
```

#### Create auth middleware to check token

- create new js file called `authMiddleware.js` in `middleware` directory
- you have an auth header that can be sent through http request, so thats what we want to check
```js
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // ['Bearer', 1231415134131451]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            // a user property is created in the reqest object here
            // IMPORTANT: this req.user can be used in any other controller method
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch(error) {
            console.log(error)

            // 401 - not authorized
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
```

-  import this protect auth middleware into routes folder wherever you want to user

```js
router.get('/me', protect, getMe)


// within the getMe controlle method
// REMEMBR: since a user property has been created in the request object, we now have access to that information on any other controller method

const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})
```

### Protecting specific user goals

#### protectg goals

- in `goalRoutes.js`
- all you have to do is add auth middle to all routes
```js
router.route('/', protect, getGoals)
```

#### creating goals while logged in as a user

- since we have linked the user model to one of the properties of the Goal schema, we can find goals by specific users

```js
// REMEMBER: the req.user is set from the 'protect' middleware
// req.user.id is safe to use if the middleware is being used on the same route / endpoint
const getGoals = asyncHandler(asynbc (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})


const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field') // Utilizes new error middleware created
    }

    // MongoDB request
    // all we are doing here is using the goal schema
    // the schema requires two properties text, and user
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id // Similarly, since protect middleware is obtaining user data from the token and setting req.user property
    })
    res.status(200).json(goal)

})
```

- Reference to goal schema

```js
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'Us er' // Which MODEL this objectID in type refers to
    },
    text: {
        type: String,
        required: [true, 'Please add text value']
    }
}
```

#### updating and deleting while logged in


```js
const updateGoal = asyncHandler(async( req, res) => {
    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id)

    // check to see if goal exists
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check to see if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // compare the userid that is attatched to the goal matches the current logged in user (verified via token)
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)

    // OLD
    // res.status(200).json({ message: 'Updated goal'})
})


// DELETE
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
        const user = await User.findById(req.user.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    } 

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // compare the userid that is attatched to the goal matches the current logged in user (verified via token)
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({ 
        message: 'Goal Deleted',
        id: req.params.id 
    })

    // OLD
    // res.status(200).json({ message: 'Deleted goal'})
})
```

### creating frontend

- in root directory of app
- enter command `npx create-react-app frontend --template redux`
    - `frontend` puts into a folder called `frontend`
    - `--template redux` installs redux toolkit and react redux package
- if not working enter `npx create-react-app@latest`
- notice that there an extra folder called features that has a counter created by installing redux
- delete app.css and logo.svg
- make `app.js` look like this
- install react icons with `npm i react-icons` while in the frontend directory

```js
function App() {
  return (
    <div className="App">
     <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

- your reducer store has already been created for you while adding redux to the command
- look in `src -> app -> store.js`

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

```

- to create state, all you have to do is create a slice and add the it to the store
- replaced contents of css from here [CSS for Index](https://github.com/bradtraversy/mern-tutorial/blob/main/frontend/src/index.css)
- done

#### create login, register, dashboard

- in `src` folder create folder called pages
- create following files in `pages`
    - `Register.jsx`
    - `Login.jsx`
    - `Dashboard.jsx`
- Create out contents by making them functional components by typing `rfce` to bring out boiler plates

#### creating routes

- you need to create routes in order for you to reach the pages
- these are different from api endpoints
- cd into your `frontend` folder
- enter command `npm i react-router-dom`
- in `app.js` bring in react router dom and create routes

```js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Import pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
        <Router>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Dashboard />}  /> // element is the jsx document you want to open when this route is hit
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                <Routes />
            </div>
        </Router>
    </>
  );
}

export default App;

```

#### Create basic navigation

- create a new folder called `components` in the `src` folder
- create `Header.jsx`
- make sure you have react-icons installed in frontend
- in header.jsx
```js
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom' // When clicked bring you to route

function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </ul>
        </header>
    )
}
```

- go into app.js and bring in Header.jsx component

#### creaing login and register forms

- import `useState` and `useEffect`
    - we will have component level state to be used and changed via input form

```jsx
import React from 'react'
import {useState, useEffect} from React
import {FaUser} from 'react-icons/fa'

function Register() {
    // const [formdata, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password2: ''
    // })

    // const {name, email, password, password2} = formData

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onChange = () => {
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
        <section className='heading'>
            <h1><FaUser />Register</h1>
            <p> Please create an account </p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type='text' className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type='email' className='form-control' id='email' email='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type='password' className='form-control' id='password' password='password' value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type='password' className='form-control' id='password2' password2='password2' value={password2} placeholder='Enter your password2' onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <div className='form-group'>
                    <button type="submit" className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
```

- Login looks similar

```jsx

  return (
    <>
      <section className='heading'>
          <h1><FaSignInAlt />  Login</h1>
          <p> Login and start setting goals! </p>
      </section>
      <section className="form">
          <form onSubmit={onSubmit}>
              <div className='form-group'>
                  <input type='email' className='form-control' id='email' email='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                  <input type='password' className='form-control' id='password' password='password' value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='form-group'>
                  <button type="submit" className='btn btn-block'>
                    Submit
                  </button>
              </div>
          </form>
      </section>
    </>
  )
```

### redux

#### creating slices

- create a folder in features
- create a file called `authSlice.js`

```js
// slice is a slice of state
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// when a user logs in, user data will be stored in localstorage
// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// state being managed that pertains to auth/authentication
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        } // allows to reset state to default values
    },
    extraReducers: () => {}
})

// actions my guess are reducer functions
export const { reset } = authSlice.actions

// how we export the reducer
export default authSlice.reducer
```
- now that this slice has been created, now we need to import that slice into the store
- in `store.js`

```js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

```

### connecting frontend to backend

#### registering a user

##### async thunk function


- in frontend directory enter command in termonal `npm i axios react-toastify`

```js
// in authService.js
// purpose of authService is strictly for making http request and sending back and sending data in local storage

import axios from 'axios'
const API_URL = 'api/users/'

// register user
// makes request to endpoint api/users/ and sends following data, userData
const register = async (userData) => {
    const registeredUser = await axios.post(API_URL, userData)

    // when making an axios request, returns an object with a property of 'data'
    if(registeredUser.data) {
        localStorage.setItem('user', JSON.stringify(registeredUser.data))
    }
}

const authService = {
    register
}

export default authService
```

- import to authSlice and use 

```js
// Create this in authSlice.js
import authService from './authService.js'
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
```

##### creating a proxy for api / endpoints

- in frontend package.json add proxy

```js
  "name": "frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:3001", // this
  "private": true,
```

##### account for pending, fulfilled, and rejected states of request

- add this to your slice
    - specifically in `extraReducers`

```js
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        } // allows to reset state to default values
    },
    extraReducers: (builder) => { // HERE:
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.user = null
                state.isLoading = false
                state.isError = true
                state.message = action.payload // message is sent though return thunkAPI.rejectWithValue(message) in authSlice.js
            })
    }
    
})
```

##### dispatch data from registration form