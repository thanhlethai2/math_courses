import React from 'react'
import { FaTimes } from 'react-icons/fa';

const Modal = ({isOpen, onClose}) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
            <div className='modal-container'>
                <div className='bg-cyan-700 p-5 h-96 lg:w-[500px] rounded shadow-md'>
                    <div className='text-right'>
                        <button onClick={() => onClose()} className='bg-cyan-700 hover:text-gray-400 text-white font-semibold py-2 px-2'>
                            <FaTimes />
                        </button>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl text-yellow-300 font-semibold mt-2 mb-8 uppercase'>Please Login Here!</h2>
                        <form className='px-4'>
                            <div className='mb-8'>
                                <input type="email" name="email" id="email" placeholder='Enter your email' className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6a64f1] focus:shadow-md' />
                            </div>
                            <div className='mb-8'>
                                <input type="password" name="password" id="password" placeholder='Enter your password' className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6a64f1] focus:shadow-md' />
                            </div>
                            <div>
                                <button className='hover:shadow-md rounded-md bg-orange-500 hover:bg-[#6a64f1] py-3 px-8 text-base font-semibold text-white outline-none'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal