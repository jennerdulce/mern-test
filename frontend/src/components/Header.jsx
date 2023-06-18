import React from 'react'

import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom' // When clicked bring you to route
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    const userNotLoggedIn = () => {
        return (
            <>
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
            </>
        )
    }

    const userLoggedIn = () => {
        return (
            <>
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </>
        )
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul>
                {user ? userLoggedIn() : userNotLoggedIn()}
            </ul>
        </header>
    )
}

export default Header