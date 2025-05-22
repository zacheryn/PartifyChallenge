import React from 'react'
import './Header.css'
import logo from './logo.png'

const Header = () => {
  return (
    <header className="header">
        <a href='/' className='logo'><img src={logo} alt="Company Logo" className="logo" /></a>
        <nav>
            <span>
                Welcome to PartifyUSA!
            </span>
        </nav>
    </header>
  )
}

export default Header