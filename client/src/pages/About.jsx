import React, { useContext } from 'react'
import AdminLoginContext from '../AdminLoginContext'

const About = () => {

    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)

    setIsAdminLogin(false)

    return (
        <div>
            <div className='py-40 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-bold mt-5'>About Page</h2>
            </div>
            <div>
            </div>
        </div>
    )
}

export default About