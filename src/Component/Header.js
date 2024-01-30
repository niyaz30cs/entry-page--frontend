import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='both'>
            <Link className="headerLink" to="/user/register">Register</Link>
            <Link className="headerLink" to="/user/login">LogIn</Link>
        </div>
    )
}

export default Header
