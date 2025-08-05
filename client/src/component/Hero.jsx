import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'


const Hero = () => {


    const navigate = useNavigate()
   
    

    return (

        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/background-1.svg)] bg-center bg-cover bg-no-repeat min-h-screen'>
           

            <div className='text-center mb-6'>
              
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold m-auto leading-[1.2]'>Supercharge your creativity <br />with<span className='text-secondary'> AI tools.</span> </h1>
               
                <p className='mt-4 max-w-xs sm:max-w-xl 2xl:max-w-2xl m-auto max-sm:text-sm text-white/60'>Transform ideas into impact. From blog posts to visuals, Inkvio.ai empowers creators with next-gen AI tools that spark creativity.</p>
                
            </div>

            <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
                <button onClick={() => navigate('/ai') } className='bg-primary text-white py-3 px-10 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start Create</button>
                <button className='bg-secondary text-back font-medium py-3 px-10 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Try demo</button>
            </div>


            <div className="flex items-center mt-8 justify-center-safe ml-3 divide-x divide-gray-200">
                <div className="flex -space-x-3.5 pr-2 ">
                    <img src={assets.user1} alt="image" className="size-10 border-3 border-white rounded-full hover:-translate-y-1.5 transition z-1" />
                    <img src={assets.user2} alt="image" className="size-10 border-3 border-white rounded-full hover:-translate-y-1.5 transition z-[2]" />
                    <img src={assets.user3} alt="image" className="size-10 border-3 border-white rounded-full hover:-translate-y-1.5 transition z-[3]" />
                    <img src={assets.user4} alt="image" className="size-10 border-3 border-white rounded-full hover:-translate-y-1.5 transition z-[4]" />
                    <img src={assets.user5} alt="image" className="size-10 border-3 border-white rounded-full hover:-translate-y-1.5 transition z-[4]" />
                </div>
                <div className='pl-2' >
                     <p className='flex items-center gap-1.5'><img src={assets.stars} alt="" /> <span className='text-primary'>5.0</span></p>
                    
                    <p className="text-sm text-gray-600">Used by <span className='text-primary'>1,000+</span> people</p>
                </div>
            </div>



        </div>
    )
}

export default Hero
