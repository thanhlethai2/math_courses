import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import AdminLoginContext from '../AdminLoginContext'

const Modal = ({isOpen, onClose}) => {

    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)

    const handleClose = () => {
        setPassword(''); 
        onClose();
    };

    const create = (e) => {

        e.preventDefault()

        const date = new Date()
        const pass = '22' + date.getDate() + '04' + `${date.getMonth()+1}` + 'Ltt' + date.getFullYear()
        
        // '220461Ltt' + date.toLocaleDateString()

        if (password === pass) {
            setIsAdminLogin(true)
            handleClose()
            navigate('/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs')
        } else {
            alert('Please enter the correct password')
        }

    }

    return (
        <div id='create-modal' className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
            <div className='modal-container'>
                <div className='bg-cyan-700 p-5 h-72 lg:w-[500px] rounded shadow-md'>
                    <div className='text-right'>
                        <button onClick={() => handleClose()} className='bg-cyan-700 hover:text-gray-400 text-white font-semibold py-2 px-2'>
                            <FaTimes />
                        </button>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl text-yellow-300 font-semibold mt-2 mb-8 uppercase'>Please Enter Password!</h2>
                        <form className='px-4' onSubmit={create}>
                            <div className='mb-8'>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder='Enter password' 
                                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6a64f1] focus:shadow-md' 
                                />
                            </div>
                            <div>
                                <button 
                                    type='submit'
                                    className='hover:shadow-md rounded-md bg-orange-500 hover:bg-[#6a64f1] py-3 px-8 text-base font-semibold text-white outline-none'
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal