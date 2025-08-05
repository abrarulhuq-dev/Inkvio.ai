import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plans = () => {
  return (
    <div className='max-w-5xl mx-auto z-20 my-30'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Pricing for Creator</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Choose a plan that fits your creative workflow. Start with free, upgrade as you grow.</p>
      </div>

      <div className='mt-14 max-sm:mx-8'>
        <PricingTable />
      </div>
    </div>
  )
}

export default Plans