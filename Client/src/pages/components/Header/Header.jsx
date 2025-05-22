import { Outlet, Link } from 'react-router-dom'
import './Header.css'
import logo from './logo.png'

const Header = () => {
  return (
    <>
        <header className="header">
            <Link to="/" className='logo'><img src={logo} alt="Company Logo" className="logo" /></Link>
            <nav>
                <span>
                    Welcome to PartifyUSA!
                </span>
            </nav>
        </header>
        <Outlet />
    </>
  )
}

export default Header