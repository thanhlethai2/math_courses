import { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';
import AdminLoginContext from '../AdminLoginContext'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        { path: "/", link: "Home" },
        { path: "/about", link: "About" },
        { path: "/contact", link: "Contact" },
    ]

    const openModal = () => {
        if (isAdminLogin) { //-- Log out
            setIsAdminLogin(false)
            navigate('/')
        } else {
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <header className='bg-gray-900 text-cyan-500 fixed top-0 left-0 right-0'>
            <nav className='px-4 py-4 max-w-7xl mx-0 mx-auto flex justify-between items-center'>
                <a href='/' className='text-xl font-bold flex'>
                    <span className='text-orange-500'>Math</span>
                    <span className='text-white'>-</span>
                    <span className='text-cyan-500'>Courses</span>
                </a>
                {/* Navitems for lg devices */}
                <ul className='md:flex gap-12 text-lg hidden'>
                    {
                        navItems.map(({path, link}) => 
                        <li key={path}>
                            <NavLink className={({isActive}) => isActive ? "active" : ""} to={path}>{link}</NavLink>
                        </li>)
                    }
                </ul>

                <div className="lg:flex gap-4 items-center hidden">
                    <button onClick={openModal} className='bg-orange-500 text-white px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all ease-in'>{isAdminLogin ? 'Log out' : 'Log in'}</button>
                </div>
                {/* modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal} />

                {/* mobile menu btn, display mobile screen */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='cursor-pointer'>
                        {
                            isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className='w-5 h-5' />
                        }
                    </button>
                </div>
            </nav>
            {/* menu items for mobile */}
            <div>
                <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"}`}>
                {
                    navItems.map(({path, link}) => <li className='text-black' key={path}>
                        <NavLink onClick={toggleMenu} to={path}>{link}</NavLink>
                    </li>)
                }
                </ul>
            </div>
        </header>
    )
}

export default Navbar