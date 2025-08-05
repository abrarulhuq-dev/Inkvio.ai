import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Facebook, GithubIcon, Heart, Instagram, LinkedinIcon, TwitterIcon } from 'lucide-react'

const Footer = () => {
  return (
    <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
        <div className='max-w-85'>
          <img src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9' />
          <p className='text-sm text-justify'>Inkvio.ai is your creative companion powered by AI. <br />Whether you're writing blog titles, generating images, removing backgrounds, or refining resumes, our tools are built to simplify your workflow. Save time, boost quality, and bring your ideas to life with a suite of intuitive features designed for modern creators.</p>
          <div className='flex items-center gap-3 mt-4 '>
            {/* Instagram */}
            <Instagram className='size-5 ' />
            {/* Facebook */}
            <Facebook className='size-5 fill-gray-500/80 stroke-0' />
            {/* Twitter */}
            <TwitterIcon className='size-5 fill-gray-500/80 stroke-0' />
            {/* LinkedIn */}
            <LinkedinIcon className='size-5 fill-gray-500/80 stroke-0' />
            {/* Github */}
            <GithubIcon className='size-5 fill-gray-500/80 stroke-0' />
          </div>
        </div>

        <div>
          <p className='text-lg text-gray-800'>COMPANY</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms & Privacy</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>

        <div>
          <p className='text-lg text-gray-800'>SUPPORT</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        <div className='max-w-80'>
          <p className='text-lg text-gray-800'>STAY UPDATED</p>
          <p className='mt-3 text-sm'>
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className='flex items-center mt-4'>
            <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
            <button className='flex items-center justify-center bg-primary h-9 w-9 aspect-square rounded-r'>
              {/* Arrow icon */}
              <ArrowRight className='size-5 text-white' />
            </button>
          </div>
        </div>
      </div>
      <hr className='border-gray-300 mt-8' />
      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
        <p>© {new Date().getFullYear()} Inkvio.ai. All rights reserved.</p>
        <p>Built with 💜 by Abu</p>
      </div>
    </div>
  )
}

export default Footer