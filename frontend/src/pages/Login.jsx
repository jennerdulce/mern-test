import React from 'react'

import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
    // const [formdata, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password2: ''
    // })

    // const {name, email, password, password2} = formData

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChange = () => {
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

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
}

export default Login