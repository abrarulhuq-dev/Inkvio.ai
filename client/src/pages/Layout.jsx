import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../component/sidebar'

const Layout = () => {

    const navigate = useNavigate()
    const [sidebar, setsidebar] = useState();


    return (
        <div className='flex flex-col items-start justify-start h-screen'>
            <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
                <img src={assets.logo} alt="logo" onClick={()=>navigate('/')} />
                {
                    sidebar ? <X onClick={() => setsidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' /> : <Menu onClick={() => setsidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
                }
            </nav>
            <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
                <Sidebar sidebar={sidebar} setsidebar={setsidebar} />
                <div className='flex-1 bg-[#f4f7fb]'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Layout
