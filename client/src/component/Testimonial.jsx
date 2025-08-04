import React from 'react'
import { assets, dummyTestimonialData } from '../assets/assets'

const Testimonial = () => {



    return (
        <div className='px-4 sm:px-20 xl:px-32 mt-20 pb-5'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Real feedback from creators, marketers, and professionals using Inkvio.ai to power their content.</p>
            </div>
           

            <div className="flex flex-wrap justify-center gap-5 mt-10">

                {dummyTestimonialData.map((Testimonial, index) => (
                    <div className="text-sm w-80 border border-gray-200 pb-6 mt-13 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                        <div key={index} className="flex flex-col items-center px-5 py-4 relative">

                            <img className="h-24 w-24 absolute -top-14 rounded-full" src={Testimonial.image} alt="userImage1" />
                            <div className="pt-8 text-center">
                                <h1 className="text-lg font-medium text-gray-800">{Testimonial.name}</h1>
                                <p className="text-gray-800/80">{Testimonial.title}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 px-6 text-center">{Testimonial.content}</p>
                        <div className="flex justify-center pt-4">
                            <div className="flex gap-0.5">
                                {Array(5).fill(0).map((_, index) => (
                                    <img key={index} src={index < Testimonial.rating ? assets.star_icon : assets.star_dull_icon} alt="star" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>

    )

}

export default Testimonial
