import React from 'react'

import {useState, useEffect} from 'react'
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