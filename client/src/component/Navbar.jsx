import React from 'react'
import { ArrowRight, CircleAlertIcon, } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const notify = () => {
    toast.custom(() => (
        <div className= 'max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex'>
            <div className="flex-1 w-0 p-4 items-center">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <CircleAlertIcon className="size-10 rounded-full text-red-500 text-center" />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            This project is currently under development.
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Stay tuned! — we’ll be announcing the launch date soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ))
}

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()


    return (
        <div className='fixed z-5 w-full flex justify-between items-center py-3 px-4 sm:px-15 xl:px-20'>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />

            {/* {
            user ? <UserButton /> 
            : 
            (<button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5  '> Get started <ArrowRight className='w-4 h-4' /></button>
            )
            } */}
            <button onClick={notify} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5  '> Get started <ArrowRight className='w-4 h-4' /></button>

        </div>
    )
}

export default Navbar
