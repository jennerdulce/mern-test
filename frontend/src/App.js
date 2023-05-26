import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Import pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

// Import Components
import Header from './components/Header'

function App() {
  return (
    <>
        <Router>
            <div className="container">
              <Header />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Routes>
            </div>
        </Router>
    </>
  )
}

export default App
